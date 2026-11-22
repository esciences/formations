/* ==========================================================
   Composants interactifs réutilisables
   Chaque composant se déclare en HTML par un attribut data-*.
   Aucune donnée n'est envoyée : tout reste dans le navigateur.
   ========================================================== */
(function () {
  "use strict";

  /* ---------- Onglets accessibles : [role=tablist] ---------- */
  document.querySelectorAll('[role="tablist"]').forEach(function (list) {
    var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.hidden = !on;
      });
      if (focus) tab.focus();
    }
    tabs.forEach(function (t, k) {
      t.addEventListener("click", function () { select(t); });
      t.addEventListener("keydown", function (e) {
        var j = null;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") j = (k + 1) % tabs.length;
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") j = (k - 1 + tabs.length) % tabs.length;
        if (e.key === "Home") j = 0;
        if (e.key === "End") j = tabs.length - 1;
        if (j !== null) { e.preventDefault(); e.stopPropagation(); select(tabs[j], true); }
      });
    });
    var initial = tabs.filter(function (t) { return t.getAttribute("aria-selected") === "true"; })[0] || tabs[0];
    select(initial);
  });

  /* ---------- Révélation : <button data-reveal="id"> ---------- */
  document.querySelectorAll("[data-reveal]").forEach(function (btn) {
    var target = document.getElementById(btn.getAttribute("data-reveal"));
    if (!target) return;
    btn.setAttribute("aria-controls", target.id);
    btn.setAttribute("aria-expanded", target.hidden ? "false" : "true");
    var labelOpen = btn.getAttribute("data-label-open") || btn.textContent;
    var labelClose = btn.getAttribute("data-label-close");
    btn.addEventListener("click", function () {
      target.hidden = !target.hidden;
      btn.setAttribute("aria-expanded", target.hidden ? "false" : "true");
      if (labelClose) btn.querySelector(".lbl").textContent = target.hidden ? labelOpen : labelClose;
    });
  });

  /* ---------- Bouton bascule (vote, priorité) : [data-toggle] ---------- */
  document.querySelectorAll("[data-toggle]").forEach(function (b) {
    b.setAttribute("aria-pressed", "false");
    b.addEventListener("click", function () {
      b.setAttribute("aria-pressed", b.getAttribute("aria-pressed") === "true" ? "false" : "true");
    });
  });

  /* ---------- Copier un texte : [data-copy="texte"] ou [data-copy-from="id"] ---------- */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy") ? resolve() : reject(); } catch (e) { reject(e); }
      ta.remove();
    });
  }
  document.querySelectorAll("[data-copy], [data-copy-from]").forEach(function (b) {
    var original = b.innerHTML;
    b.addEventListener("click", function () {
      var src = b.getAttribute("data-copy-from");
      var el = src ? document.getElementById(src) : null;
      var text = el ? ((el.value !== undefined && el.tagName === "INPUT" ? el.value : el.innerText) || "").trim() : b.getAttribute("data-copy");
      copyText(text).then(function () {
        b.classList.add("is-done"); b.textContent = "Copié !";
      }, function () {
        b.textContent = "Copie impossible";
      }).then(function () {
        setTimeout(function () { b.classList.remove("is-done"); b.innerHTML = original; }, 1800);
      });
    });
  });

  /* ---------- Chronomètre facultatif : <div class="timer" data-minutes="8"> ---------- */
  var ICON_PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5l12 7-12 7z"/></svg>';
  var ICON_PAUSE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg>';
  var ICON_RESET = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 3-6.2"/><path d="M4 4v5h5"/></svg>';
  function fmt(s) { return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0"); }
  document.querySelectorAll(".timer[data-minutes]").forEach(function (el) {
    var total = Math.round(parseFloat(el.getAttribute("data-minutes")) * 60);
    var left = total, tick = null, end = 0;
    el.setAttribute("role", "timer");
    el.innerHTML =
      '<span class="t-display" aria-live="off">' + fmt(total) + "</span>" +
      '<button type="button" class="t-play" aria-label="Démarrer le chronomètre">' + ICON_PLAY + "</button>" +
      '<button type="button" class="t-plus" aria-label="Ajouter une minute">+1</button>' +
      '<button type="button" class="t-reset" aria-label="Remettre le chronomètre à zéro">' + ICON_RESET + "</button>";
    var disp = el.querySelector(".t-display"), play = el.querySelector(".t-play");
    function render() { disp.textContent = fmt(Math.max(0, left)); }
    function stop() { clearInterval(tick); tick = null; el.classList.remove("is-running"); play.innerHTML = ICON_PLAY; play.setAttribute("aria-label", "Démarrer le chronomètre"); }
    function start() {
      if (left <= 0) left = total;
      el.classList.remove("is-done");
      end = Date.now() + left * 1000;
      el.classList.add("is-running"); play.innerHTML = ICON_PAUSE; play.setAttribute("aria-label", "Mettre en pause");
      tick = setInterval(function () {
        left = Math.round((end - Date.now()) / 1000);
        render();
        if (left <= 0) { stop(); el.classList.add("is-done"); disp.textContent = "Fini !"; }
      }, 250);
    }
    play.addEventListener("click", function () { tick ? stop() : start(); });
    el.querySelector(".t-plus").addEventListener("click", function () { left += 60; end += 60000; el.classList.remove("is-done"); render(); });
    el.querySelector(".t-reset").addEventListener("click", function () { stop(); left = total; el.classList.remove("is-done"); render(); });
  });

  /* ---------- Classement avec feedback : .sortgame ---------- */
  document.querySelectorAll(".sortgame").forEach(function (game) {
    var cards = Array.prototype.slice.call(game.querySelectorAll(".sortcard"));
    var scoreEl = game.querySelector(".score");
    var labels = {};
    game.querySelectorAll(".choices button").forEach(function (b) { labels[b.getAttribute("data-choice")] = b.textContent.trim(); });
    function update() {
      var answered = cards.filter(function (c) { return c.classList.contains("right") || c.classList.contains("wrong"); });
      var right = answered.filter(function (c) { return c.classList.contains("right"); });
      if (scoreEl) scoreEl.textContent = answered.length ? right.length + " sur " + answered.length + " choix en accord avec la réponse proposée" : "";
    }
    cards.forEach(function (card) {
      var answer = card.getAttribute("data-answer");
      var verdict = card.querySelector(".verdict");
      var badge = card.querySelector(".badge");
      card.querySelectorAll(".choices button").forEach(function (b) {
        b.setAttribute("aria-pressed", "false");
        b.addEventListener("click", function () {
          card.querySelectorAll(".choices button").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
          var ok = b.getAttribute("data-choice") === answer;
          card.classList.add("is-answered");
          card.classList.toggle("right", ok);
          card.classList.toggle("wrong", !ok);
          if (badge) badge.textContent = ok ? "Bien vu" : "À discuter";
          verdict.querySelector("b").textContent = "Proposition : " + labels[answer];
          update();
        });
      });
    });
    var reset = game.querySelector("[data-sort-reset]");
    if (reset) reset.addEventListener("click", function () {
      cards.forEach(function (c) {
        c.classList.remove("is-answered", "right", "wrong");
        c.querySelectorAll(".choices button").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
      });
      update();
    });
    var all = game.querySelector("[data-sort-all]");
    if (all) all.addEventListener("click", function () {
      cards.forEach(function (c) {
        c.classList.add("is-answered");
        c.querySelector(".verdict b").textContent = "Proposition : " + labels[c.getAttribute("data-answer")];
      });
    });
  });

  /* ---------- Carte à retourner : [data-flip] ---------- */
  document.querySelectorAll("[data-flip]").forEach(function (b) {
    b.setAttribute("aria-pressed", "false");
    b.addEventListener("click", function () {
      b.setAttribute("aria-pressed", b.getAttribute("aria-pressed") === "true" ? "false" : "true");
    });
  });

  /* ---------- Surlignage : <button data-highlight="id"> ---------- */
  document.querySelectorAll("[data-highlight]").forEach(function (b) {
    var target = document.getElementById(b.getAttribute("data-highlight"));
    if (!target) return;
    b.setAttribute("aria-pressed", "false");
    b.addEventListener("click", function () {
      var on = !target.classList.contains("show-marks");
      target.classList.toggle("show-marks", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  });

  /* ---------- Fenêtre modale : <button data-dialog="id"> ---------- */
  document.querySelectorAll("[data-dialog]").forEach(function (b) {
    var dlg = document.getElementById(b.getAttribute("data-dialog"));
    if (!dlg || typeof dlg.showModal !== "function") return;
    b.addEventListener("click", function () { dlg.showModal(); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg || e.target.closest("[data-dialog-close]")) dlg.close(); });
  });

  /* ---------- Question à choix, réponse expliquée : .guess[data-answer] ---------- */
  document.querySelectorAll(".guess[data-answer]").forEach(function (g) {
    var ans = g.querySelector(".answer");
    var verdict = g.querySelector(".answer .v");
    g.querySelectorAll(".choices button").forEach(function (b) {
      b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", function () {
        g.querySelectorAll(".choices button").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        if (verdict) verdict.textContent = b.getAttribute("data-choice") === g.getAttribute("data-answer") ? "Bien vu ! " : "Pas tout à fait. ";
        ans.hidden = false;
      });
    });
  });
  /* ---------- Champ modifiable mémorisé : <input data-store="clé" data-default="…"> ----------
     Priorité : paramètre d'URL (?fse=…) > valeur mémorisée dans ce navigateur > valeur par défaut. */
  document.querySelectorAll("input[data-store]").forEach(function (inp) {
    var key = inp.getAttribute("data-store");
    var param = inp.getAttribute("data-param") || key;
    var def = inp.getAttribute("data-default") || "";
    function sync() {
      var changed = inp.value.trim() !== def;
      document.querySelectorAll('[data-show-if-default="' + inp.id + '"]').forEach(function (el) { el.hidden = changed; });
      document.querySelectorAll('[data-show-if-changed="' + inp.id + '"]').forEach(function (el) { el.hidden = !changed; });
      document.querySelectorAll('[data-for="' + inp.id + '"]').forEach(function (a) {
        a.href = changed ? a.getAttribute("data-href-changed") : a.getAttribute("data-href-default");
      });
    }
    var fromUrl = null, saved = null;
    try { fromUrl = new URLSearchParams(location.search).get(param); } catch (e) {}
    try { saved = localStorage.getItem(key); } catch (e) {}
    inp.value = fromUrl || saved || def || inp.value;
    sync();
    ["keydown", "keyup", "keypress"].forEach(function (ev) { inp.addEventListener(ev, function (e) { e.stopPropagation(); if (ev === "keydown" && (e.key === "Enter" || e.key === "Escape")) inp.blur(); }); });
    inp.addEventListener("input", function () {
      try { localStorage.setItem(key, inp.value.trim()); } catch (e) {}
      sync();
    });
  });
  /* ---------- Vidéo YouTube chargée au clic : <div class="yt" data-yt="ID"> ----------
     Aucune requête vers YouTube avant le clic (youtube-nocookie). */
  document.querySelectorAll(".yt[data-yt]").forEach(function (box) {
    var btn = box.querySelector(".yt-facade");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(box.getAttribute("data-yt")) + "?autoplay=1&rel=0";
      f.title = box.getAttribute("data-title") || "Vidéo YouTube";
      f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      f.setAttribute("allowfullscreen", "");
      f.referrerPolicy = "strict-origin-when-cross-origin";
      box.innerHTML = ""; box.appendChild(f); box.classList.add("is-on");
    });
  });
})();
