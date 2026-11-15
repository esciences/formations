/* =========================================================
   LEVEL UP — moteur du support
   - Deck.module({...}) déclare un module (M0…M7, BOX)
   - Deck.slide({...}) déclare une slide (id "M4-03")
   Les slides sont triées par module puis par identifiant :
   on peut donc les créer dans n'importe quel ordre.
   ========================================================= */
(function(){
  const modules = {}, slides = [];
  let order = [], idx = 0, started = false;
  const store = {
    get(k, d){ try{ const v = localStorage.getItem('lvlup:'+k); return v===null ? d : JSON.parse(v);}catch(e){ return d; } },
    set(k, v){ try{ localStorage.setItem('lvlup:'+k, JSON.stringify(v)); }catch(e){} }
  };
  const visited = new Set(store.get('visited', []));
  const badges  = new Set(store.get('badges', []));
  const $ = s => document.querySelector(s);

  // Un module peut être déclaré plusieurs fois (programme dans M0, détails dans son propre fichier) : on fusionne.
  function module(m){ modules[m.id] = Object.assign(modules[m.id] || {slides:[]}, m); }
  function slide(s){ slides.push(s); }

  /* ---------- Construction ---------- */
  function build(){
    const vp = $('#viewport');
    slides.sort((a,b)=>{
      const ma = modules[a.id.split('-')[0]], mb = modules[b.id.split('-')[0]];
      return (ma.order-mb.order) || a.id.localeCompare(b.id, 'fr', {numeric:true});
    });
    slides.forEach(s=>{
      const m = modules[s.id.split('-')[0]];
      m.slides.push(s);
      const el = document.createElement('section');
      el.className = 'slide theme-' + (m.theme||'base') + (s.cls ? ' '+s.cls : '');
      el.id = s.id;
      el.innerHTML = `
        ${m.decor ? `<div class="decor" aria-hidden="true">${m.decor}</div>` : ''}
        ${s.bare ? '' : `<div class="s-top"><span class="chip">${m.label}</span>${s.kicker?`<span class="chip ghost">${s.kicker}</span>`:''}</div>`}
        <div class="s-body">${s.html}</div>
        <div class="s-foot"><span class="brand"><img class="brand-logo" src="assets/esciences/logo.svg" alt="eSCIENCES"><span>· Tommy Berben</span></span><span class="s-id">${s.id}</span></div>`;
      vp.appendChild(el);
      s.el = el;
    });
    order = slides.map(s=>s.id);
    slides.forEach(s=>{ sober(s.el); wire(s.el); });
  }

  /* ---------- Sobriété : on retire les émojis des titres et des textes courants ----------
     Les émojis restent uniquement dans les « jetons » d'icône (.big, .hx-big, .m6-mi…). */
  const EMO = /[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}]\uFE0F?(\u200D[\p{Extended_Pictographic}]\uFE0F?)*\s*/gu;
  const SOBER = 'h1,h2,h3,.lead,.callout,.tp-goal,.tp-rule,.tp-done,.tp-qs li,.tp-watch p,.hx-mission-goal,.hx-rule,.hx-done,.hx-qs li,.hx-watch p,.tabs button,.field label,.card p,.card li,ul.clean li,.pp-question,.m2-ex,.quiz-opts button,.hx-id-mini span,.pp-controls span,.m6-pick,.m6-act-line';
  function sober(root){
    root.querySelectorAll(SOBER).forEach(el=>{
      const w=document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const nodes=[]; while(w.nextNode()) nodes.push(w.currentNode);
      nodes.forEach(n=>{ if(n.parentElement.closest('.big,.hx-big,.m6-mi,.tp-ico,.hx-tl-ico,.m6-letter')) return; n.nodeValue=n.nodeValue.replace(EMO,''); });
    });
  }

  /* ---------- Composants génériques ---------- */
  function wire(root){
    // Onglets : <div data-tabs> <div class="tabs"><button data-tab="a">…</button></div> <div class="tab-panel" data-panel="a">…</div>
    root.querySelectorAll('[data-tabs]').forEach(box=>{
      const btns = box.querySelectorAll(':scope > .tabs button');
      const show = k=>{ btns.forEach(b=>b.classList.toggle('on', b.dataset.tab===k));
        box.querySelectorAll(':scope > .tab-panel').forEach(p=>p.classList.toggle('on', p.dataset.panel===k)); };
      btns.forEach(b=>b.addEventListener('click', ()=>show(b.dataset.tab)));
      if(btns[0]) show(btns[0].dataset.tab);
    });
    // Cartes à retourner
    root.querySelectorAll('.flip').forEach(f=>f.addEventListener('click', ()=>f.classList.toggle('on')));
    // Minuteurs : <div class="timer" data-min="20"></div>
    root.querySelectorAll('.timer[data-min]').forEach(makeTimer);
    // Compteurs : <div class="counter" data-key="obs-plan"><span class="lbl">…</span></div>
    root.querySelectorAll('.counter[data-key]').forEach(c=>{
      const k = 'cnt:'+c.dataset.key; let n = store.get(k,0);
      c.insertAdjacentHTML('beforeend', `<button class="minus" aria-label="moins">−</button><span class="n">${n}</span><button class="plus" aria-label="plus">+</button>`);
      const out = c.querySelector('.n');
      c.querySelector('.plus').onclick = ()=>{ n++; out.textContent=n; store.set(k,n); };
      c.querySelector('.minus').onclick = ()=>{ n=Math.max(0,n-1); out.textContent=n; store.set(k,n); };
    });
    // Champs mémorisés : <textarea data-store="cle">
    root.querySelectorAll('[data-store]').forEach(t=>{
      t.value = store.get('txt:'+t.dataset.store, '');
      t.addEventListener('input', ()=>store.set('txt:'+t.dataset.store, t.value));
      t.addEventListener('keydown', e=>e.stopPropagation());
    });
    // Quiz : <div data-quiz> <div class="q" data-answer="x"> … <div class="quiz-opts"><button data-v="x">
    root.querySelectorAll('[data-quiz] .q').forEach(q=>{
      const fb = q.querySelector('.quiz-fb');
      q.querySelectorAll('.quiz-opts button').forEach(b=>b.addEventListener('click', ()=>{
        if(b.classList.contains('ok')||b.classList.contains('ko')){ // second clic : on désélectionne
          if(b.classList.contains('ok')) q.classList.remove('solved');
          b.classList.remove('ok','ko'); if(fb && !q.querySelector('.quiz-opts .ok,.quiz-opts .ko')) fb.innerHTML=''; return; }
        if(q.classList.contains('solved')) return;
        if(b.dataset.v === q.dataset.answer){ b.classList.add('ok'); q.classList.add('solved'); if(fb) fb.innerHTML = q.dataset.ok || '✅ Bien vu !'; addXP(); }
        else { b.classList.add('ko'); if(fb) fb.innerHTML = q.dataset.ko || '🔁 Pas tout à fait, retente ta chance.'; }
      }));
    });
    // Impression d'une fiche
    root.querySelectorAll('[data-print]').forEach(b=>b.addEventListener('click', ()=>window.print()));
    // Réinitialisation d'une zone
    root.querySelectorAll('[data-reset]').forEach(b=>b.addEventListener('click', ()=>{
      const pref = b.dataset.reset;
      try{ Object.keys(localStorage).filter(k=>k.startsWith('lvlup:'+pref)).forEach(k=>localStorage.removeItem(k)); }catch(e){}
      root.querySelectorAll('[data-store]').forEach(t=>{ if(('txt:'+t.dataset.store).startsWith(pref)) t.value=''; });
      root.querySelectorAll('.counter[data-key]').forEach(c=>{ if(('cnt:'+c.dataset.key).startsWith(pref)) c.querySelector('.n').textContent='0'; });
    }));
  }

  function makeTimer(box){
    let total = Math.round(parseFloat(box.dataset.min)*60), left = total, h = null;
    box.innerHTML = `<span class="t"></span><button class="go">▶</button><button class="rs">↺</button>`;
    const t = box.querySelector('.t'), go = box.querySelector('.go');
    const draw = ()=>{ t.textContent = String(Math.floor(left/60)).padStart(2,'0')+':'+String(left%60).padStart(2,'0'); };
    go.onclick = e=>{ e.stopPropagation();
      if(h){ clearInterval(h); h=null; go.textContent='▶'; return; }
      box.classList.remove('done'); go.textContent='⏸';
      h = setInterval(()=>{ left--; draw(); if(left<=0){ clearInterval(h); h=null; go.textContent='▶'; box.classList.add('done'); } },1000);
    };
    box.querySelector('.rs').onclick = e=>{ e.stopPropagation(); clearInterval(h); h=null; left=total; go.textContent='▶'; box.classList.remove('done'); draw(); };
    draw();
  }

  /* ---------- Navigation ---------- */
  function go(i, fromHash){
    i = Math.max(0, Math.min(order.length-1, i));
    const prev = slides[idx];
    if(prev && prev.el) prev.el.classList.remove('active');
    idx = i; const s = slides[idx];
    s.el.classList.add('active');
    if(s.onEnter && !s._entered){ s.onEnter(s.el, api); s._entered = true; }
    if(s.onShow) s.onShow(s.el, api);
    if(!fromHash) history.replaceState(null,'','#'+s.id);
    const m = modules[s.id.split('-')[0]];
    document.body.dataset.theme = m.theme || 'base';
    $('#navModule').textContent = m.label + ' · ' + m.title;
    $('#navCount').textContent = (m.slides.indexOf(s)+1) + ' / ' + m.slides.length;
    visit(s, m);
    renderPresenter(s, m);
  }
  function stepOrNext(dir){
    const s = slides[idx];
    if(dir>0){
      const hidden = s.el.querySelector('[data-step]:not(.shown)');
      if(hidden){ hidden.classList.add('shown'); return; }
    }
    go(idx+dir);
  }

  /* ---------- Progression : XP & badges ---------- */
  let bonus = store.get('bonus',0);
  function addXP(n=5){ bonus+=n; store.set('bonus',bonus); renderXP(); }
  function visit(s, m){
    if(!visited.has(s.id)){ visited.add(s.id); store.set('visited',[...visited]); }
    if(m.badge && !badges.has(m.id) && m.slides.every(x=>visited.has(x.id))){
      badges.add(m.id); store.set('badges',[...badges]);
      toast(`${m.badge.icon} Badge débloqué : <b>${m.badge.name}</b>`);
    }
    renderXP();
  }
  function renderXP(){
    const xp = visited.size*10 + bonus;
    const max = slides.length*10;
    $('#xpFill').style.width = Math.min(100, visited.size/slides.length*100)+'%';
    $('#xpText').textContent = xp+' XP';
    $('#xpLevel').textContent = 'NIV. '+badges.size;
    $('#hudBadges').innerHTML = Object.values(modules).filter(m=>m.badge).sort((a,b)=>a.order-b.order)
      .map(m=>`<span class="b" title="${m.badge.name}" style="${badges.has(m.id)?'':'filter:grayscale(1);opacity:.35'}">${m.badge.icon}</span>`).join('');
  }
  function toast(html){ const t=$('#toast'); t.innerHTML=html; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),3200); }

  /* ---------- Carte des modules ---------- */
  function renderMap(){
    $('#mapGrid').innerHTML = Object.values(modules).sort((a,b)=>a.order-b.order).map(m=>{
      const n = m.slides.length, locked = n===0;
      return `<button class="map-node ${locked?'locked':''} ${badges.has(m.id)?'done':''}" style="--c:${m.color||'#ffb547'}" data-go="${locked?'':m.slides[0].id}">
        <span class="badge">${m.badge?m.badge.icon:'⬡'}</span>
        <span class="lv">${m.label}${m.duration?' · '+m.duration:''}</span>
        <h3>${m.title}</h3>
        <span class="meta">${locked?'🔒 En construction':n+' slide'+(n>1?'s':'')}</span></button>`;
    }).join('');
    $('#mapGrid').querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{ if(!b.dataset.go) return; toggleMap(false); go(order.indexOf(b.dataset.go)); });
  }
  function armReset(btn, label, action){
    let armed=false, t=null;
    btn.onclick=()=>{
      if(!armed){ armed=true; btn.classList.add('armed'); btn.textContent='⚠ Cliquer encore pour confirmer'; t=setTimeout(()=>{armed=false; btn.classList.remove('armed'); btn.textContent=label;},3500); return; }
      clearTimeout(t); action(); };
  }
  function resetProgress(all){
    visited.clear(); badges.clear(); bonus=0;
    try{ Object.keys(localStorage).filter(k=>k.startsWith('lvlup:') && (all || /^lvlup:(visited|badges|bonus)$/.test(k))).forEach(k=>localStorage.removeItem(k)); }catch(e){}
    location.hash = order[0]; location.reload();
  }
  function toggleMap(force){ const m=$('#map'); const show = force ?? m.hidden; if(show) renderMap(); m.hidden=!show; }

  /* ---------- Mode animateur ---------- */
  let run=0, runH=null;
  function renderPresenter(s, m){
    $('#presenterNotes').innerHTML = s.notes || '<em>Pas de notes pour cette slide.</em>';
    $('#presenterBudget').innerHTML = `${m.label} · ${m.title}${m.duration?' — budget : <b>'+m.duration+'</b>':''}`;
    const nx = slides[idx+1];
    $('#presenterNext').textContent = nx ? 'Ensuite → '+nx.id+' · '+(nx.title||'') : 'Fin du support';
  }
  function togglePresenter(){
    const p=$('#presenter'); p.hidden=!p.hidden;
    document.body.classList.toggle('presenting', !p.hidden);
    $('#btnPresenter').classList.toggle('on', !p.hidden); fit();
  }
  setInterval(()=>{ const d=new Date(); $('#clockNow').textContent=d.toLocaleTimeString('fr-BE',{hour:'2-digit',minute:'2-digit'}); },1000);
  function drawRun(){ $('#clockRun').textContent=String(Math.floor(run/60)).padStart(2,'0')+':'+String(run%60).padStart(2,'0'); }

  /* ---------- Mise à l'échelle ---------- */
  function fit(){
    const st=$('#stage').getBoundingClientRect();
    const k=Math.min((st.width-24)/1280,(st.height-16)/720);
    $('#viewport').style.transform=`translate(-50%,-50%) scale(${k})`;
  }

  const api = { go:id=>go(order.indexOf(id)), toast, addXP, store };

  function start(){
    if(started) return; started=true;
    let i=0; Object.values(modules).forEach(m=>{ if(m.order===undefined) m.order=i++; });
    build(); renderXP();
    window.addEventListener('resize', fit); fit();
    $('#prev').onclick=()=>go(idx-1); $('#next').onclick=()=>stepOrNext(1);
    $('#btnMap').onclick=()=>toggleMap(); $('#mapClose').onclick=()=>toggleMap(false);
    armReset($('#resetXP'), $('#resetXP').textContent, ()=>resetProgress(false));
    armReset($('#btnResetXP'), $('#btnResetXP').textContent, ()=>resetProgress(false));
    // Agrandir une image : <img class="zoomable">
    document.addEventListener('click', e=>{ const im=e.target.closest('img.zoomable'); if(!im) return; e.stopPropagation();
      const lb=$('#lightbox'); lb.querySelector('img').src=im.src; lb.hidden=false; }, true);
    $('#lightbox').onclick=()=>{ $('#lightbox').hidden=true; };
    armReset($('#resetAll'), $('#resetAll').textContent, ()=>resetProgress(true));
    $('#btnPresenter').onclick=togglePresenter;
    $('#btnFull').onclick=()=>{ try{ document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen(); }catch(e){} };
    $('#clockToggle').onclick=()=>{ if(runH){clearInterval(runH);runH=null;$('#clockToggle').textContent='▶';} else {runH=setInterval(()=>{run++;drawRun();},1000);$('#clockToggle').textContent='⏸';} };
    $('#clockReset').onclick=()=>{ run=0; drawRun(); };
    document.addEventListener('keydown', e=>{
      if(e.target.matches('textarea,input')) return;
      if(['ArrowRight','PageDown',' '].includes(e.key)){ e.preventDefault(); stepOrNext(1); }
      else if(['ArrowLeft','PageUp'].includes(e.key)){ e.preventDefault(); go(idx-1); }
      else if(e.key==='m'||e.key==='M') toggleMap();
      else if(e.key==='p'||e.key==='P') togglePresenter();
      else if(e.key==='f'||e.key==='F') $('#btnFull').click();
      else if(e.key==='Escape'){ toggleMap(false); $('#lightbox').hidden=true; }
      else if(e.key==='Home') go(0);
    });
    // Glisser sur tablette
    let x0=null; document.getElementById('stage').addEventListener('touchstart',e=>x0=e.touches[0].clientX,{passive:true});
    document.getElementById('stage').addEventListener('touchend',e=>{ if(x0===null) return; const dx=e.changedTouches[0].clientX-x0; if(Math.abs(dx)>60) dx<0?stepOrNext(1):go(idx-1); x0=null; });
    window.addEventListener('hashchange',()=>{ const j=order.indexOf(location.hash.slice(1)); if(j>=0&&j!==idx) go(j,true); });
    const j=order.indexOf(location.hash.slice(1));
    go(j>=0?j:0, true);
  }

  window.Deck = { module, slide, start };
})();
