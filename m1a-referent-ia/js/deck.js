/* ==========================================================
   Moteur de présentation M1A — sans dépendance externe
   - navigation boutons / clavier / lien direct (#/12)
   - révélation progressive (.fragment)
   - sommaire, plein écran, écran noir
   - mode formateur : notes, vue présentateur synchronisée
   ========================================================== */
(function () {
  "use strict";

  var W = 1600, H = 900;
  var params = new URLSearchParams(location.search);
  var isPresenter = params.has("presenter");
  var stage = document.getElementById("stage");
  var slides = Array.prototype.slice.call(stage.querySelectorAll(".slide"));
  var state = { i: 0, f: 0 };
  var presenterWin = null;
  var channel = null;
  try { channel = new BroadcastChannel("m1a-deck"); } catch (e) { channel = null; }

  function $(sel, root) { return (root || document).querySelector(sel); }
  function store(key, val) {
    try { if (val === undefined) return localStorage.getItem(key); localStorage.setItem(key, val); } catch (e) { return null; }
  }

  /* ---------- Préparation des diapositives ---------- */
  slides.forEach(function (s, n) {
    var part = s.closest(".part");
    s.dataset.index = n;
    s.setAttribute("role", "group");
    s.setAttribute("aria-roledescription", "diapositive");
    s.setAttribute("aria-label", (n + 1) + " sur " + slides.length + " : " + (s.dataset.title || ""));
    s._part = part;
    s._frags = Array.prototype.slice.call(s.querySelectorAll(".fragment"));
  });

  /* ---------- Mise à l'échelle ---------- */
  function fit() {
    var box = isPresenter ? $(".pv-current") : $("#viewport");
    if (!box) return;
    var r = box.getBoundingClientRect();
    var s = Math.min(r.width / W, r.height / H);
    stage.style.transform = "translate(-50%, -50%) scale(" + s + ")";
    if (isPresenter) fitPreview();
  }

  /* ---------- Navigation ---------- */
  function applyFragments(slide, count) {
    slide._frags.forEach(function (el, k) { el.classList.toggle("is-visible", k < count); });
  }

  function go(i, f, opts) {
    opts = opts || {};
    i = Math.max(0, Math.min(slides.length - 1, i));
    var slide = slides[i];
    if (f === "all") f = slide._frags.length;
    f = Math.max(0, Math.min(slide._frags.length, f || 0));
    var changed = i !== state.i || !slide.classList.contains("is-current");
    slides.forEach(function (s, n) {
      var cur = n === i;
      s.classList.toggle("is-current", cur);
      s.setAttribute("aria-hidden", cur ? "false" : "true");
      if ("inert" in s) s.inert = !cur;
    });
    state.i = i; state.f = f;
    applyFragments(slide, f);
    updateChrome(changed);
    if (!opts.silent) broadcast();
    if (changed) document.dispatchEvent(new CustomEvent("slidechange", { detail: { index: i, slide: slide } }));
  }

  function next() {
    var s = slides[state.i];
    if (state.f < s._frags.length) go(state.i, state.f + 1);
    else if (state.i < slides.length - 1) go(state.i + 1, 0);
  }
  function prev() {
    if (state.f > 0) go(state.i, state.f - 1);
    else if (state.i > 0) go(state.i - 1, "all");
  }

  function readHash() {
    var m = location.hash.match(/^#\/(\d+)/);
    return m ? parseInt(m[1], 10) - 1 : 0;
  }

  /* ---------- Interface ---------- */
  function updateChrome(changed) {
    var slide = slides[state.i];
    var counter = $("#counter");
    if (counter) counter.textContent = (state.i + 1) + " / " + slides.length;
    var bar = $("#progress > span");
    if (bar) bar.style.width = ((state.i + 1) / slides.length * 100) + "%";
    var lbl = $("#partlabel");
    if (lbl && slide._part) lbl.textContent = slide._part.dataset.label || "";
    try { history.replaceState(null, "", "#/" + (state.i + 1)); } catch (e) { /* file:// sur certains navigateurs */ }
    if (changed) {
      var live = $("#live");
      if (live) live.textContent = "Diapositive " + (state.i + 1) + " : " + (slide.dataset.title || "");
      document.title = (slide.dataset.title ? slide.dataset.title + " · " : "") + "M1A · L'IA dans son contexte professionnel";
    }
    document.querySelectorAll("#toc li button").forEach(function (b) {
      b.setAttribute("aria-current", +b.dataset.go === state.i ? "true" : "false");
    });
    renderNotes();
  }

  /* ---------- Sommaire ---------- */
  function buildToc() {
    var toc = $("#toc");
    if (!toc) return;
    var parts = Array.prototype.slice.call(stage.querySelectorAll(".part"));
    var html = "";
    parts.forEach(function (p) {
      var items = Array.prototype.slice.call(p.querySelectorAll(".slide"));
      var first = +items[0].dataset.index;
      html += '<div class="toc-part"><button type="button" data-go="' + first + '"><span class="num">' + (p.dataset.num || "•") + "</span>" + p.dataset.label + "</button><ol>";
      items.forEach(function (s) {
        var n = +s.dataset.index;
        html += '<li><button type="button" data-go="' + n + '"><span class="n">' + (n + 1) + "</span><span>" + (s.dataset.title || "") + "</span>" +
          (s.dataset.active ? '<span class="act">● actif</span>' : "") + "</button></li>";
      });
      html += "</ol></div>";
    });
    (window.DECK_PLAN || []).forEach(function (p) {
      if (p.status === "upcoming") {
        html += '<div class="toc-part is-upcoming"><button type="button" disabled><span class="num">' + p.num + "</span>" + p.label + '<span class="soon">à venir</span></button></div>';
      }
    });
    toc.innerHTML = html;
    toc.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-go]");
      if (!b) return;
      go(+b.dataset.go, 0);
      togglePanel("#panel-toc", false);
    });
  }

  function togglePanel(sel, force) {
    var p = $(sel);
    if (!p) return;
    var open = force === undefined ? !p.classList.contains("is-open") : force;
    p.classList.toggle("is-open", open);
    p.setAttribute("aria-hidden", open ? "false" : "true");
    if ("inert" in p) p.inert = !open;
    var btn = document.querySelector('[aria-controls="' + p.id + '"]');
    if (btn) btn.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) { var f = p.querySelector("button, a, input"); if (f) f.focus(); }
    else if (btn && p.contains(document.activeElement)) btn.focus();
  }

  /* ---------- Mode formateur et notes ---------- */
  function setTrainer(on) {
    document.body.classList.toggle("trainer", on);
    store("m1a-trainer", on ? "1" : "0");
    var sw = $("#trainer-switch");
    if (sw) sw.checked = on;
    if (!on) toggleNotes(false);
  }

  function notesHtml(i) {
    var n = slides[i] && slides[i].querySelector(":scope > .notes");
    return n ? n.innerHTML : '<p class="notes-empty">Pas de note pour cette diapositive.</p>';
  }
  function renderNotes() {
    var body = $("#notes-body");
    if (body) body.innerHTML = notesHtml(state.i);
    var t = $("#notes-title");
    if (t) t.textContent = (state.i + 1) + ". " + (slides[state.i].dataset.title || "");
    if (isPresenter) renderPresenter();
  }
  function toggleNotes(force) {
    var d = $("#notes-drawer");
    if (!d) return;
    var open = force === undefined ? !d.classList.contains("is-open") : force;
    d.classList.toggle("is-open", open);
    if ("inert" in d) d.inert = !open;
    var b = $("#btn-notes");
    if (b) b.setAttribute("aria-pressed", open ? "true" : "false");
  }

  /* ---------- Vue présentateur ---------- */
  function openPresenter() {
    var url = location.pathname + "?presenter" + "#/" + (state.i + 1);
    presenterWin = window.open(url, "m1a-presenter", "width=1280,height=800");
    if (!presenterWin) alertInline("Le navigateur a bloqué la fenêtre. Autorise les fenêtres surgissantes pour ce fichier.");
  }
  function broadcast() {
    var msg = { m1a: "goto", i: state.i, f: state.f };
    try { if (presenterWin && !presenterWin.closed) presenterWin.postMessage(msg, "*"); } catch (e) {}
    try { if (isPresenter && window.opener && !window.opener.closed) window.opener.postMessage(msg, "*"); } catch (e) {}
    try { if (channel) channel.postMessage(msg); } catch (e) {}
  }
  function onRemote(d) {
    if (!d || d.m1a !== "goto") return;
    if (d.i === state.i && d.f === state.f) return;
    go(d.i, d.f, { silent: true });
  }
  window.addEventListener("message", function (e) { onRemote(e.data); });
  if (channel) channel.onmessage = function (e) { onRemote(e.data); };

  var previewStage = null;
  function setupPresenter() {
    document.body.classList.add("presenter", "trainer");
    var grid = document.createElement("div");
    grid.className = "presenter-grid";
    grid.innerHTML =
      '<div><div class="pv-label">Diapositive projetée</div><div class="pv-current" style="height:calc(100% - 70px)"></div>' +
      '<div class="pv-bar"><button type="button" id="pv-prev">◀ Précédent</button><button type="button" id="pv-next">Suivant ▶</button>' +
      '<span id="pv-count"></span><span class="pv-clock" id="pv-clock">00:00</span></div></div>' +
      '<div><div class="pv-label">Suivante</div><div class="pv-next" style="height:calc(100% - 70px)"></div>' +
      '<div class="pv-bar"><button type="button" id="pv-reset">Remettre le chrono à zéro</button><span id="pv-time"></span></div></div>' +
      '<div class="pv-notes" id="pv-notes"></div>';
    document.body.appendChild(grid);
    $(".pv-current").appendChild(stage);
    $("#viewport").style.display = "none";
    ["#toolbar", "#progress", "#partlabel"].forEach(function (s) { var el = $(s); if (el) el.style.display = "none"; });
    $("#pv-prev").onclick = prev;
    $("#pv-next").onclick = next;
    var t0 = Date.now();
    $("#pv-reset").onclick = function () { t0 = Date.now(); };
    setInterval(function () {
      var s = Math.floor((Date.now() - t0) / 1000);
      $("#pv-clock").textContent = String(Math.floor(s / 3600)).padStart(1, "0") + ":" + String(Math.floor(s / 60) % 60).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
      var d = new Date();
      $("#pv-time").textContent = "Heure : " + d.toLocaleTimeString("fr-BE", { hour: "2-digit", minute: "2-digit" });
    }, 1000);
  }
  function renderPresenter() {
    var n = $("#pv-notes");
    if (!n) return;
    n.innerHTML = '<div class="notes-body">' + notesHtml(state.i) + "</div>";
    $("#pv-count").textContent = (state.i + 1) + " / " + slides.length + (slides[state.i]._frags.length ? "  · étape " + state.f + "/" + slides[state.i]._frags.length : "");
    var box = $(".pv-next");
    box.innerHTML = "";
    var nx = slides[state.i + 1];
    if (!nx) { box.innerHTML = '<p style="color:#fff;padding:20px">Fin de la partie réalisée.</p>'; return; }
    previewStage = document.createElement("div");
    previewStage.style.cssText = "position:absolute;left:50%;top:50%;width:1600px;height:900px;transform-origin:center;pointer-events:none";
    var clone = nx.cloneNode(true);
    clone.removeAttribute("id");
    clone.querySelectorAll("[id]").forEach(function (el) { el.removeAttribute("id"); });
    clone.classList.add("is-current");
    clone.style.animation = "none";
    clone.querySelectorAll(".fragment").forEach(function (el) { el.classList.add("is-visible"); });
    previewStage.appendChild(clone);
    box.appendChild(previewStage);
    fitPreview();
  }
  function fitPreview() {
    var box = $(".pv-next");
    if (!box || !previewStage) return;
    var r = box.getBoundingClientRect();
    previewStage.style.transform = "translate(-50%, -50%) scale(" + Math.min(r.width / W, r.height / H) + ")";
  }

  /* ---------- Plein écran, écran noir ---------- */
  function toggleFullscreen() {
    var d = document, el = d.documentElement;
    if (d.fullscreenElement || d.webkitFullscreenElement) (d.exitFullscreen || d.webkitExitFullscreen).call(d);
    else if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  }
  function updateFsButton() {
    var b = $("#btn-fs");
    if (b) b.setAttribute("aria-pressed", document.fullscreenElement || document.webkitFullscreenElement ? "true" : "false");
  }
  document.addEventListener("fullscreenchange", function () { updateFsButton(); setTimeout(fit, 60); });
  document.addEventListener("webkitfullscreenchange", function () { updateFsButton(); setTimeout(fit, 60); });

  function alertInline(msg) {
    var live = $("#live");
    if (live) live.textContent = msg;
    var t = document.createElement("div");
    t.textContent = msg;
    t.style.cssText = "position:fixed;left:50%;top:20px;transform:translateX(-50%);z-index:60;background:#1f3440;color:#fff;padding:12px 18px;border-radius:12px;font:700 16px Nunito,sans-serif";
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 4000);
  }

  /* ---------- Clavier ---------- */
  function isTyping(el) {
    return el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
  }
  document.addEventListener("keydown", function (e) {
    if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;
    if (document.querySelector("dialog[open]")) return;
    var t = e.target;
    if (isTyping(t)) { if (e.key === "Escape") t.blur(); return; }
    var onControl = t && t.closest && t.closest("button, a, [role='tab']");
    var inPanel = t && t.closest && t.closest(".panel, #notes-drawer");
    switch (e.key) {
      case "ArrowRight": case "PageDown":
        if (inPanel || (t.closest && t.closest("[role='tablist']"))) return;
        e.preventDefault(); next(); break;
      case "ArrowLeft": case "PageUp":
        if (inPanel || (t.closest && t.closest("[role='tablist']"))) return;
        e.preventDefault(); prev(); break;
      case " ":
        if (onControl) return;
        e.preventDefault(); e.shiftKey ? prev() : next(); break;
      case "Home": if (inPanel) return; e.preventDefault(); go(0, 0); break;
      case "End": if (inPanel) return; e.preventDefault(); go(slides.length - 1, 0); break;
      case "f": case "F": toggleFullscreen(); break;
      case "s": case "S": case "m": case "M": togglePanel("#panel-toc"); break;
      case "?": case "h": case "H": togglePanel("#panel-help"); break;
      case "b": case "B": case ".": document.body.classList.toggle("blackout"); break;
      case "n": case "N": if (document.body.classList.contains("trainer")) toggleNotes(); break;
      case "p": case "P": if (document.body.classList.contains("trainer") && !isPresenter) openPresenter(); break;
      case "Escape":
        document.body.classList.remove("blackout");
        togglePanel("#panel-toc", false); togglePanel("#panel-help", false); toggleNotes(false); break;
    }
  });

  /* Balayage tactile (tablette) */
  var tx = null, ty = null;
  stage.addEventListener("touchstart", function (e) { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
  stage.addEventListener("touchend", function (e) {
    if (tx === null) return;
    var dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5 && !e.target.closest("button, a, input, textarea")) { dx < 0 ? next() : prev(); }
    tx = null;
  });

  /* Masquage de la barre d'outils après inactivité */
  var idleTimer;
  function wake() {
    document.body.classList.remove("idle");
    clearTimeout(idleTimer);
    idleTimer = setTimeout(function () { document.body.classList.add("idle"); }, 3500);
  }
  ["mousemove", "touchstart", "keydown"].forEach(function (ev) { document.addEventListener(ev, wake, { passive: true }); });

  /* ---------- Boutons ---------- */
  function on(id, fn) { var el = document.getElementById(id); if (el) el.addEventListener("click", fn); }
  on("btn-prev", prev);
  on("btn-next", next);
  on("btn-toc", function () { togglePanel("#panel-toc"); });
  on("btn-help", function () { togglePanel("#panel-help"); });
  on("btn-fs", toggleFullscreen);
  on("btn-notes", function () { toggleNotes(); });
  on("btn-presenter", openPresenter);
  on("btn-blackout", function () { document.body.classList.toggle("blackout"); });
  on("blackout", function () { document.body.classList.remove("blackout"); });
  document.querySelectorAll("[data-close]").forEach(function (b) {
    b.addEventListener("click", function () {
      var sel = b.getAttribute("data-close");
      if (sel === "#notes-drawer") toggleNotes(false); else togglePanel(sel, false);
    });
  });
  var sw = $("#trainer-switch");
  if (sw) sw.addEventListener("change", function () { setTrainer(sw.checked); });

  /* Liens internes vers une diapositive : <a href="#/12"> ou data-goto="id-de-diapo" */
  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-goto]");
    if (!a) return;
    e.preventDefault();
    var target = document.getElementById(a.getAttribute("data-goto"));
    if (target && target.classList.contains("slide")) go(+target.dataset.index, 0);
  });
  window.addEventListener("hashchange", function () {
    var i = readHash();
    if (i !== state.i) go(i, 0);
  });

  /* ---------- Démarrage ---------- */
  ["#panel-toc", "#panel-help"].forEach(function (s) { var p = $(s); if (p && "inert" in p) p.inert = true; });
  var nd = $("#notes-drawer"); if (nd && "inert" in nd) nd.inert = true;
  buildToc();
  if (isPresenter) setupPresenter();
  setTrainer(params.has("formateur") || store("m1a-trainer") === "1" || isPresenter);
  window.addEventListener("resize", fit);
  state.i = -1;
  go(readHash(), 0, { silent: true });
  fit();
  wake();

  window.M1ADeck = { go: go, next: next, prev: prev, slides: slides, state: state };
})();
