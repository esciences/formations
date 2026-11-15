/* =========================================================
   Modèles de slides réutilisables par tous les modules
   Approche : présenter peu → tester par étapes → débriefer.
   - Tpl.mission({...}) : consigne d'étape courte et directe
   - Tpl.flash({...})   : débrief flash (questions, puis révélation →)
   - Tpl.title({...})   : ouverture de module
   ========================================================= */
window.Tpl = (function(){
  function mission(o){
    return `
    <div class="tp-mission">
      <div>
        <span class="pixel tp-kicker">${o.step}</span>
        <h2>${o.title}</h2>
        <p class="tp-goal">🎯 ${o.goal}</p>
        <ol class="tp-steps">${o.todo.map(t=>`<li>${t}</li>`).join('')}</ol>
        ${o.rule ? `<div class="tp-rule">${o.rule}</div>` : ''}
      </div>
      <div class="tp-side">
        ${o.visual || ''}
        <div class="card tp-watch"><span class="tag">PENDANT LE JEU, OBSERVEZ</span>${o.watch.map(w=>`<p>👀 ${w}</p>`).join('')}</div>
        ${o.done ? `<div class="tp-done">${o.doneRaw ? o.done : `⚡ <b>Fini avant le temps ?</b> ${o.done}`}</div>` : ''}
        ${o.min ? `<div class="timer" data-min="${o.min}"></div>` : ''}
      </div>
    </div>`;
  }
  function flash(o){
    return `
    <div class="tp-flash">
      <div>
        <span class="pixel tp-kicker">${o.step}</span>
        <h2>${o.title}</h2>
        <ul class="tp-qs">${o.questions.map(q=>`<li>💬 ${q}</li>`).join('')}</ul>
      </div>
      <div class="tp-reveal" data-step>
        <span class="tag">${o.revealTag || 'CE QUE VOUS VENEZ DE VIVRE'}</span>
        ${o.reveal}
      </div>
    </div>
    <p class="reveal-hint no-print">→ après la discussion, pour révéler</p>`;
  }
  function title(o){
    return `
    <div class="tp-title">
      <span class="pixel tp-kicker">${o.kicker}</span>
      <h1>${o.title}</h1>
      <p class="lead">${o.lead}</p>
      ${o.steps ? `<div class="tp-timeline">${o.steps.map(([t,n,i])=>`<div><span class="tp-ico">${i}</span><b>${n}</b></div>`).join('')}</div>` : ''}
      ${o.callout ? `<div class="callout">${o.callout}</div>` : ''}
    </div>`;
  }
  return { mission, flash, title };
})();
