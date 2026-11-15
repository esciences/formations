/* =========================================================
   Hexagonia — éléments communs aux modules M4 et M5
   (décor, modèles de slides « consigne d'étape » et « débrief flash »)
   Logique pédagogique : présenter le strict nécessaire → tester
   par étapes (groupes de zones) → débriefer et révéler les mécaniques.
   ========================================================= */
window.HX = (function(){
  const A = 'assets/hexagonia/';
  const hexes = `<svg class="hx-hexes" viewBox="0 0 300 260"><g>
    ${[[60,40],[112,70],[164,40],[112,130],[164,100],[216,70],[216,130],[268,100],[164,160]].map(([x,y],i)=>
      `<polygon points="${[0,1,2,3,4,5].map(k=>{const a=Math.PI/3*k+Math.PI/6;return (x+30*Math.cos(a)).toFixed(1)+','+(y+30*Math.sin(a)).toFixed(1)}).join(' ')}" class="h${i%3}"/>`).join('')}
  </g></svg>`;
  const decor = hexes + `<img class="hx-ship" src="${A}vaisseau.webp" alt="">`;
  const el = (k, name) => `<img src="${A}elements/${k}.webp" alt="${name}" title="${name}">`;
  const zone = n => `<figure class="hx-zthumb"><img src="${A}niveaux/n${String(n-1).padStart(2,'0')}.webp" alt="Zone ${String(n).padStart(2,'0')}"><figcaption class="pixel">ZONE ${String(n).padStart(2,'0')}</figcaption></figure>`;

  /* Slide « consigne d'étape » : courte, directe, sans dévoiler les mécaniques */
  function mission(o){
    return `
    <div class="hx-mission">
      <div class="hx-mission-main">
        <span class="pixel hx-level">${o.step}</span>
        <h2>${o.title}</h2>
        <p class="hx-mission-goal">🎯 ${o.goal}</p>
        <ol class="hx-steps">${o.todo.map(t=>`<li>${t}</li>`).join('')}</ol>
        ${o.rule ? `<div class="hx-rule">📣 ${o.rule}</div>` : ''}
      </div>
      <div class="hx-mission-side">
        <div class="hx-zones-row">${o.zones.map(zone).join('')}</div>
        <div class="card hx-watch"><span class="tag">PENDANT LE JEU, OBSERVEZ…</span>${o.watch.map(w=>`<p>👀 ${w}</p>`).join('')}</div>
        ${o.done ? `<div class="hx-done">⚡ <b>Fini avant le temps ?</b> ${o.done}</div>` : ''}
        <div class="timer" data-min="${o.min}"></div>
      </div>
    </div>`;
  }

  /* Slide « débrief flash » : questions d'abord, révélation ensuite (→) */
  function flash(o){
    return `
    <div class="hx-flash">
      <div class="hx-flash-q">
        <span class="pixel hx-level">${o.step}</span>
        <h2>${o.title}</h2>
        <ul class="hx-qs">${o.questions.map(q=>`<li>💬 ${q}</li>`).join('')}</ul>
      </div>
      <div class="hx-flash-r" data-step>
        <span class="tag">${o.revealTag || 'CE QUE VOUS VENEZ DE DÉCOUVRIR'}</span>
        ${o.reveal}
      </div>
    </div>
    <p class="reveal-hint no-print">→ après la discussion, pour révéler</p>`;
  }

  Deck.module({ id:'M4', theme:'hexagonia', decor });
  Deck.module({ id:'M5', theme:'hexagonia', decor });

  return { A, decor, el, zone, mission, flash };
})();
