/* =========================================================
   M3 — Pico Park : coopérer ou périr (≈ 60 min)
   Démarche reprise du carnet d'observation eSCIENCES (usage en classe),
   transposée à une animation avec des jeunes en EPN :
   présentation globale → 4-5 joueurs + observateurs → partie →
   débrief → (2e partie, rôles inversés) → on décortique le jeu →
   qu'est-ce que ça apporte à un groupe en EPN ?
   Activité construite avec Ludovic Riga (LudoviaBE, octobre 2026).
   ========================================================= */
(function(){
const P = 'assets/pico/';
const perso = k => `<img class="pp-px" src="${P}perso-${k}.webp" alt="">`;
const decor = `<div class="pp-decor">${['chat','casquette','chapeau'].map(perso).join('')}</div>`;
Deck.module({ id:'M3', theme:'pico', decor });

/* ---------- M3-01 ---------- */
Deck.slide({
  id:'M3-01', title:'Coopérer ou périr', time:'1 min', cls:'dark',
  html: Tpl.title({
    kicker:'NIVEAU 3 · MODE COOPÉRATIF',
    title:'Pico Park :<br>coopérer ou périr',
    lead:'Un jeu tout simple, en pixel art, sans aucune ambition éducative… et pourtant.',
    steps:[['3′','Le jeu','🎮'],['5′','Les rôles','🔍'],['12′','La partie','🕹️'],['8′','Débrief','💬'],['8′','Décortiquer','🧩'],['17′','Et en EPN ?','🔁']],
    callout:'Une seule question pour tout le monde. <b>qu’est-ce qui fait qu’un groupe avance… ou qu’il coince ?</b>'
  }) + `<p class="small" style="margin-top:14px;opacity:.75">Activité construite avec Ludovic Riga pour LudoviaBE (octobre 2026).</p>`,
  notes:`<h4>Intention</h4><p>Pico Park illustre le <b>serious gaming</b> : rien d’éducatif dans le jeu, tout est dans le dispositif (rôles, observation, débriefing).</p>
  <h4>Démarche</h4><p>C’est la démarche que j’utilise en classe avec le carnet d’observation, transposée ici à une animation avec des jeunes en EPN. Les participants la vivent comme le feraient leurs jeunes.</p>`
});

/* ---------- M3-02 : le jeu en 30 secondes ---------- */
Deck.slide({
  id:'M3-02', title:'Le jeu en 30 secondes', kicker:'Présentation globale', time:'3 min',
  html:`
  <div class="split" style="grid-template-columns:1fr 1fr;align-items:start">
    <div>
      <h2>Le jeu en 30 secondes</h2>
      <div class="grid" style="gap:12px">
        <div class="card"><h3>Le principe</h3><p style="margin:0">Attraper la <b>clé</b>, ouvrir la <b>porte</b>, atteindre la sortie. Niveau après niveau.</p></div>
        <div class="card"><h3>🟰 Tous égaux</h3><p style="margin:0">Chaque personnage a <b>les mêmes capacités</b>. Pas de héros, pas de rôle spécial.</p></div>
        <div class="card acc"><h3>🤝 Une seule règle</h3><p style="margin:0"><b>Tout le monde passe la porte, ou personne.</b></p></div>
      </div>
    </div>
    <div class="pp-hero">
      <img class="pp-team-img" src="${P}equipe.webp" alt="Les personnages de Pico Park devant la porte">
      <div class="pp-controls"><span>⬅️ ➡️ se déplacer</span><span>⬆️ sauter</span></div>
      <p class="muted" style="margin-top:12px">Le reste ? À découvrir. Ensemble.</p>
    </div>
  </div>`,
  notes:`<p>Présentation globale, rien de plus : ni comment ouvrir la porte, ni ce qu’on peut faire avec les autres personnages. La découverte collective <b>est</b> l’activité.</p>
  <p>Le site officiel décrit le principe en trois temps : récupérer la clé, ouvrir la porte, atteindre la sortie.</p>`
});

/* ---------- M3-03 : deux rôles ---------- */
Deck.slide({
  id:'M3-03', title:'Deux rôles, une même question', kicker:'Les rôles', time:'3 min',
  html:`
  <h2>Deux rôles, une même question</h2>
  <div class="grid g2 pp-roles">
    <div class="card"><div class="pp-role-ico">${perso('casquette')}${perso('chat')}${perso('chapeau')}${perso('explorateur')}${perso('bonnet')}</div>
      <h3>🕹️ 4 ou 5 joueur·ses</h3><p>Vous incarnez l’équipe et tentez de passer un maximum de niveaux.</p></div>
    <div class="card acc"><div class="pp-role-ico"><span class="big">🔍</span></div>
      <h3>👀 Tous les autres sont observateur·rices</h3><p>Vous ne jouez pas. Vous suivez l’équipe de près pour repérer <b>comment elle s’organise</b>.</p></div>
  </div>
  <div class="pp-question">❓ Qu’est-ce qui fait qu’un groupe <b>avance</b>… ou qu’il <b>coince</b> ?</div>`,
  notes:`<p>Désigner les joueurs sur base volontaire. Les plus réticents à la manette sont souvent d’excellents observateurs : c’est une autre forme d’engagement, pas un lot de consolation.</p>
  <p>Un écran (ou projecteur) visible par tous les observateurs.</p>`
});

/* ---------- M3-04 : le rôle d'observateur ---------- */
Deck.slide({
  id:'M3-04', title:'Observer, pas juger', kicker:'Pour les observateurs', time:'2 min',
  html:`
  <h2>Observer, ce n’est pas juger</h2>
  <p class="lead">Ton travail est de repérer ce que <b>fait</b> le groupe, pas de juger les personnes. Tu reçois une grille d’observation papier.</p>
  <div class="pp-bubbles">
    <div class="pp-bubble ko"><span class="pp-mark">✗</span><p class="pixel">Il ne sait pas se servir d’une manette.</p><span class="small">Un jugement sur une personne.</span></div>
    <div class="pp-bubble ok"><img src="${P}check.webp" class="pp-mark-img" alt="✓"><p class="pixel">Elle donne beaucoup de consignes, les autres proposent moins d’idées.</p><span class="small">Un comportement observable, et son effet sur le groupe.</span></div>
  </div>
  <div class="callout" style="margin-top:20px">Note des <b>comportements</b>, pas des noms.</div>`,
  notes:`<p>Exemple tiré du carnet d’observation. Le faire lire à voix haute et demander : « Quelle est la différence entre les deux ? »</p>
  <p>Ce cadrage protège les joueurs : personne n’est mis en difficulté au débriefing.</p>`
});

/* ---------- M3-05 : grille d'observation ---------- */
const GRILLE = ['Les joueurs expliquent ce qu’ils font','Les instructions sont claires','Plusieurs personnes proposent des idées','Une idée proposée est reprise par le groupe',
  'Quelqu’un aide un·e coéquipier·e bloqué·e','Le groupe attend une personne en difficulté','Après un échec, le groupe change de méthode','Le groupe reste calme et recommence'];
const FREQ = ['Rarement','Parfois','Souvent'];
Deck.slide({
  id:'M3-06', title:'La grille d’observation', kicker:'Après la partie', time:'3 min',
  html:`
  <div class="split" style="grid-template-columns:1.35fr .65fr;align-items:start">
    <div>
      <h2>Ce que les observateurs ont vu</h2>
      <div class="pp-grid">
        <div class="pp-gh"><span>Comportement observé</span>${FREQ.map(f=>`<span>${f}</span>`).join('')}</div>
        ${GRILLE.map((g,i)=>`<div class="pp-gr" data-i="${i}"><span>${g}</span>${FREQ.map((f,j)=>`<button data-v="${j}" aria-label="${f}"></button>`).join('')}</div>`).join('')}
      </div>
    </div>
    <div class="grid" style="gap:12px">
      <div class="card"><h3>L’ambiance, en un coup d’œil</h3><div class="pp-mood">${[['tendue','😣','Tendue'],['correcte','🙂','Correcte'],['joyeuse','😄','Joyeuse']].map(([k,e,n])=>`<button data-m="${k}"><span>${e}</span>${n}</button>`).join('')}</div></div>
      <div class="field"><label>Ce qui a aidé le groupe (une action, pas une personne)</label><textarea rows="3" data-store="m3:aide"></textarea></div>
      <div class="field"><label>Ce que le groupe pourrait tester la prochaine fois</label><textarea rows="3" data-store="m3:tester"></textarea></div>
      <div class="hx-btnrow no-print"><a class="btn alt" href="assets/fiches/grille-pico-park.pdf" download>📄 Fiche PDF</a><button class="btn alt" id="ppReset">↺ Vider</button></div>
    </div>
  </div>`,
  onEnter(root, api){
    let g=api.store.get('m3:grille',{}), mood=api.store.get('m3:mood','');
    const draw=()=>{ root.querySelectorAll('.pp-gr').forEach(r=>r.querySelectorAll('button').forEach(b=>b.classList.toggle('on', String(g[r.dataset.i])===b.dataset.v)));
      root.querySelectorAll('.pp-mood button').forEach(b=>b.classList.toggle('on', b.dataset.m===mood)); };
    root.querySelectorAll('.pp-gr button').forEach(b=>b.addEventListener('click',e=>{ e.stopPropagation(); const i=b.closest('.pp-gr').dataset.i; if(g[i]===+b.dataset.v) delete g[i]; else g[i]=+b.dataset.v; api.store.set('m3:grille',g); draw(); }));
    root.querySelectorAll('.pp-mood button').forEach(b=>b.addEventListener('click',e=>{ e.stopPropagation(); mood = mood===b.dataset.m ? '' : b.dataset.m; api.store.set('m3:mood',mood); draw(); }));
    root.querySelector('#ppReset').addEventListener('click',e=>{ e.stopPropagation(); g={}; mood=''; api.store.set('m3:grille',g); api.store.set('m3:mood',''); root.querySelectorAll('textarea').forEach(t=>{t.value=''; api.store.set('txt:'+t.dataset.store,'');}); draw(); });
    draw();
  },
  notes:`<p>Pendant la partie, les observateurs remplissent la grille <b>papier</b> (bouton « Fiche PDF », une fiche A4 par observateur). Après la partie, on reporte ici une synthèse collective, qui sert d’appui au débrief.</p>`
});

/* ---------- M3-06 : la partie ---------- */
Deck.slide({
  id:'M3-05', title:'La partie', kicker:'Jouer', time:'12 min',
  html: Tpl.mission({
    step:'PARTIE 1 · 4 OU 5 JOUEUR·SES',
    title:'À vous de jouer !',
    goal:'Passer un maximum de niveaux. Ensemble.',
    todo:['Chaque joueur·se prend une manette (ou son smartphone).','Choisissez votre couleur.','Lancez le <b>premier monde</b> et trouvez comment sortir… <b>à plusieurs</b>.','Enchaînez les niveaux suivants.'],
    rule:'🚪 Tout le monde passe la porte, ou personne.',
    visual:`<img class="pp-team-img" src="${P}equipe.webp" alt="">`,
    watch:['<b>Observateurs</b>, remplissez votre grille papier.','Qui parle ? Qui propose ? Que se passe-t-il après un échec ?'],
    min:12
  }),
  notes:`<h4>Posture</h4><p>Ne donner aucune solution. Si l’équipe bloque longtemps : « Qu’est-ce que vous n’avez pas encore essayé ? »</p>
  <h4>Ce qu’on observe souvent</h4><p>Un début chaotique (chacun teste seul), puis quelqu’un qui prend la main, puis une organisation plus fine… ou des tensions. Tout est bon à débriefer.</p>`
});

/* ---------- M3-07 : débrief ---------- */
Deck.slide({
  id:'M3-07', title:'Le débrief', kicker:'Débriefer', time:'8 min',
  html: Tpl.flash({
    step:'DÉBRIEF · JOUEURS D’ABORD, OBSERVATEURS ENSUITE',
    title:'Qu’est-ce qui a fait avancer le groupe ?',
    questions:['<b>Joueurs</b>, qu’est-ce qui a été le plus dur ? Comment vous êtes-vous sentis ?','<b>Observateurs</b>, qu’est-ce qui a aidé le groupe à réussir ? Des actions, pas des noms.','<b>Tous</b>, qu’est-ce que le groupe pourrait essayer différemment ?'],
    revealTag:'CE QUE LE JEU OBLIGE À FAIRE',
    reveal:`<div class="pp-reveal"><img src="${P}tour.webp" alt="Les personnages montent les uns sur les autres pour attraper la clé"><div class="tp-table">
      <div><b>🤝 Coopérer</b><span>Impossible d’avancer sans tous les membres.</span></div>
      <div><b>🗣️ Communiquer</b><span>Des consignes claires, des idées partagées.</span></div>
      <div><b>🧘 Gérer ses émotions</b><span>Frustration, erreurs, échecs… les siens et ceux des autres.</span></div>
      <div><b>🧩 Résoudre ensemble</b><span>Tester, échouer, changer de méthode.</span></div>
      <div><b>👂 Patience et écoute</b><span>Attendre celui ou celle qui a besoin de plus de temps.</span></div>
    </div></div>`
  }),
  notes:`<p>L’ordre compte : les joueurs vident leur sac d’abord, puis les observateurs apportent des faits. Garder les formulations du carnet : « une action, pas une personne » et « ce que le groupe pourrait tester » plutôt que « ce qui ne va pas ».</p>`
});

/* ---------- M3-08 : partie 2 (optionnelle) ---------- */
const CONTRAINTES = [['🎼','Chef d’orchestre','Une seule personne a le droit de donner des consignes.'],['🔤','Trois mots maximum','Chaque consigne tient en trois mots, pas un de plus.'],['🤫','Le muet tournant','À chaque niveau, un joueur différent n’a pas le droit de parler.']];
Deck.slide({
  id:'M3-08', title:'Partie 2, on inverse', kicker:'Optionnel', time:'10 min',
  html: Tpl.mission({
    step:'PARTIE 2 (OPTIONNELLE) · RÔLES INVERSÉS',
    title:'On inverse… avec une contrainte',
    goal:'Les observateurs deviennent joueurs, et inversement.',
    todo:['Échangez les rôles.','Piochez une <b>carte contrainte</b>.','Reprenez la partie là où elle s’était arrêtée.','Les nouveaux observateurs remplissent la grille.'],
    rule:'<span id="ppOut" class="tp-draw"><button class="btn" id="ppDraw">🃏 Piocher une carte contrainte</button></span>',
    visual:`<div class="grid" style="gap:8px">${CONTRAINTES.map(([i,n,d])=>`<div class="tp-mini"><span>${i}</span><div><b>${n}</b><br><span class="small">${d}</span></div></div>`).join('')}</div>`,
    watch:['Les nouveaux joueurs font-ils mieux grâce à ce qu’ils ont observé ?','La contrainte ralentit-elle le groupe… ou l’organise-t-elle ?'],
    min:10
  }),
  onEnter(root){
    const box=root.querySelector('#ppOut');
    const draw=e=>{ e.stopPropagation(); const d=CONTRAINTES[Math.floor(Math.random()*CONTRAINTES.length)];
      box.innerHTML=`<span class="tp-card pop"><span class="big">${d[0]}</span><span><b>${d[1]}</b><br>${d[2]}</span><button class="tp-redraw" title="Repiocher">↻</button></span>`;
      box.querySelector('.tp-redraw').addEventListener('click',draw); };
    root.querySelector('#ppDraw').addEventListener('click',draw);
  },
  notes:`<p>Partie 2 : seulement si l’horaire le permet (+10 min, à prendre sur la pause de midi ou le temps de transposition). Sinon, sauter cette slide et passer directement à « Décortiquer le jeu ».</p>
  <p>La contrainte est de la <b>gamification par les règles</b> : on ne touche pas au jeu, on change la façon d’y jouer.</p>`
});

/* ---------- M3-09 : décortiquer le jeu ---------- */
const MECA = [
  ['🟰','Tous les personnages sont identiques','Personne n’est meilleur « par nature ». C’est l’organisation qui fait la différence.'],
  ['🚪','Victoire commune obligatoire','Impossible de gagner seul. On attend, on aide, on porte.'],
  ['🔑','Une règle simple (clé ➜ porte)','Aucune notice à lire, on peut jouer en 30 secondes, même sans être « gamer ».'],
  ['👥','Des niveaux qui s’adaptent au nombre de joueurs','La difficulté dépend du groupe, chaque joueur compte.'],
  ['🔁','Échouer ne coûte rien','On recommence aussitôt, l’erreur devient un essai, pas une faute.'],
  ['😂','Du chaos et de l’humour','On rit ensemble avant d’apprendre ensemble, la tension retombe.']
];
Deck.slide({
  id:'M3-09', title:'Décortiquer le jeu', kicker:'Analyser', time:'8 min',
  html:`
  <h2>Pourquoi ça marche ? On décortique</h2>
  <div class="pp-meca">
    <div class="pp-meca-h"><span>Ce que le jeu impose</span><span>Ce que ça provoque dans le groupe</span></div>
    ${MECA.map(([i,m,e])=>`<div class="pp-meca-r"><b>${i} ${m}</b><span data-step>${e}</span></div>`).join('')}
  </div>
  <p class="reveal-hint no-print">→ pour révéler l’effet de chaque mécanique</p>`,
  notes:`<p>Pour chaque ligne, demander d’abord au groupe : « Qu’est-ce que ça provoque, selon vous ? » avant de révéler.</p>
  <p>Le site officiel précise que les niveaux s’adaptent au nombre de joueurs (2, 4 ou 8) : chaque joueur supplémentaire change vraiment le problème.</p>`
});

/* ---------- M3-10 : apports en EPN ---------- */
const USAGES = [
  ['jeunes','🧒 Groupe de jeunes',['Un support pour parler <b>coopération</b> et <b>gestion de la frustration</b>, sans faire la morale.','Le rôle d’observateur valorise ceux qui ne veulent pas jouer… ou qui veulent toujours gagner.','Prolonger : chacun dessine un niveau sur papier que le groupe doit résoudre.']],
  ['brise','🧊 Brise-glace',['10 minutes en début de session pour <b>créer le groupe</b>.','Idéal quand les participants ne se connaissent pas encore.','On rit ensemble avant d’apprendre ensemble.']],
  ['cohesion','🤝 Groupe régulier',['Revenir à Pico Park quand la dynamique s’essouffle.','Varier les contraintes pour travailler un point précis (écoute, leadership…).','Comparer les grilles d’observation d’une séance à l’autre.']],
  ['interg','👵🧒 Intergénérationnel',['Jeunes et adultes sont <b>tous égaux devant le jeu</b>.','Les jeunes apprennent à expliquer, les adultes osent essayer.','Pas de compétition, la réussite est forcément commune.']],
  ['debut','🐣 Débutant·es',['Une prise en main de la manette ou du smartphone <b>sans enjeu</b>.','Commencer à deux joueurs, puis augmenter.','Valoriser chaque niveau franchi.']]
];
Deck.slide({
  id:'M3-10', title:'Et dans un groupe en EPN ?', kicker:'Transposer', time:'8 min',
  html:`
  <h2>Qu’est-ce que ça peut apporter à un groupe en EPN ?</h2>
  <div data-tabs>
    <div class="tabs">${USAGES.map(([k,n])=>`<button data-tab="${k}">${n}</button>`).join('')}</div>
    ${USAGES.map(([k,n,l])=>`<div class="tab-panel" data-panel="${k}"><div class="card pp-usage"><ul class="clean">${l.map(x=>`<li>${x}</li>`).join('')}</ul></div></div>`).join('')}
  </div>
  <div class="field" style="margin-top:12px"><label>💡 Mon idée avec Pico Park</label><textarea rows="2" data-store="m3:idee" placeholder="Avec mon groupe du mercredi, je pourrais…"></textarea></div>`,
  notes:`<p>Commencer par la question ouverte, sans afficher les onglets : « Qu’est-ce que ce jeu pourrait apporter à un de vos groupes ? » Puis compléter avec les onglets.</p>`
});

/* ---------- M3-11 : de la classe à l'EPN ---------- */
const TRANS = [['Le public','Une classe de 20 à 25 élèves','Un groupe de 6 à 12 jeunes, souvent d’âges mélangés'],
  ['La participation','Activité imposée','Activité proposée, on peut choisir d’observer'],
  ['L’observation','Carnet papier individuel','Carnet papier, ou grille sur tablette, ou observation à l’oral'],
  ['Le débriefing','Lien avec les travaux de groupe en classe','Lien avec la vie du groupe à l’EPN et ses projets'],
  ['Le matériel','Manettes de l’école, projecteur','Manettes… ou les smartphones des jeunes comme manettes']];
Deck.slide({
  id:'M3-11', title:'De la classe à l’EPN', kicker:'La démarche', time:'3 min',
  html:`
  <h2>Une démarche de classe… transposée à l’EPN</h2>
  <div class="pp-trans">
    <div class="pp-trans-h"><span></span><span>🏫 En classe</span><span>💻 En EPN (jeunes)</span></div>
    ${TRANS.map(([a,b,c])=>`<div class="pp-trans-r"><b>${a}</b><span>${b}</span><span>${c}</span></div>`).join('')}
  </div>
  <div class="callout small" style="margin-top:12px">Ce qui ne change pas, c’est <b>présenter peu, jouer, observer, débriefer</b>… et la question « qu’est-ce qui fait qu’un groupe avance ? ».</div>`,
  notes:`<p>Le carnet d’observation eSCIENCES (version classe) peut être remis aux participants : il s’utilise tel quel avec des jeunes en EPN.</p>`
});

/* ---------- M3-12 : fiche technique ---------- */
const PAD = `<svg viewBox="0 0 96 64"><path d="M22 12h52c10 0 16 10 18 22s0 26-10 26c-8 0-12-10-18-10H32c-6 0-10 10-18 10C4 60 2 46 4 34S12 12 22 12z" fill="#fff" stroke="var(--ink)" stroke-width="3.5"/><path d="M22 28v14M15 35h14" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/><circle cx="68" cy="30" r="4" fill="#e86a92" stroke="var(--ink)" stroke-width="2"/><circle cx="77" cy="38" r="4" fill="#4cc3ff" stroke="var(--ink)" stroke-width="2"/><circle cx="59" cy="38" r="4" fill="#ffd23f" stroke="var(--ink)" stroke-width="2"/><circle cx="68" cy="46" r="4" fill="#7be07b" stroke="var(--ink)" stroke-width="2"/></svg>`;
const PHONE = `<svg viewBox="0 0 64 96"><rect x="8" y="4" width="48" height="88" rx="8" fill="#fff" stroke="var(--ink)" stroke-width="3.5"/><rect x="14" y="14" width="36" height="64" rx="3" fill="#fde4ec" stroke="var(--ink)" stroke-width="2"/><path d="M24 40v12M18 46h12" stroke="var(--ink)" stroke-width="3.5" stroke-linecap="round"/><circle cx="42" cy="42" r="4" fill="#e86a92" stroke="var(--ink)" stroke-width="2"/><circle cx="42" cy="54" r="4" fill="#4cc3ff" stroke="var(--ink)" stroke-width="2"/><circle cx="32" cy="85" r="2.5" fill="var(--ink)"/></svg>`;
Deck.slide({
  id:'M3-12', title:'Comment l’obtenir et y jouer', kicker:'Mettre en place', time:'3 min',
  html:`
  <h2>Comment l’obtenir et y jouer ?</h2>
  <div class="grid g3 pp-tech">
    <div class="card"><div class="pp-tech-ill"><img src="${P}equipe.webp" alt=""></div><h3>Trois versions</h3><ul class="clean small hx-tight">
      <li><b>Classic Edition</b>, gratuite sur Steam, jusqu’à 10 joueurs. Son retrait est annoncé, ajoutez-la vite à votre bibliothèque.</li>
      <li><b>PICO PARK</b>, sur Steam et Switch. 48 niveaux, de 2 à 8 joueurs.</li>
      <li><b>PICO PARK 2</b>, la suite, celle du carnet.</li></ul></div>
    <div class="card"><div class="pp-tech-ill pp-tech-ico">${PAD}${PHONE}</div><h3>Des manettes… ou des téléphones</h3><ul class="clean small hx-tight">
      <li>Une manette par joueur, ou plusieurs joueurs sur un clavier.</li>
      <li>L’appli gratuite <b>TecoGamePad</b> transforme un smartphone en manette (même réseau que le PC).</li>
      <li>Au-delà de 5 manettes Xbox sur Steam, activer « Xbox Extended Feature Support ».</li></ul></div>
    <div class="card acc"><div class="pp-tech-ill pp-tech-persos">${['casquette','chat','chapeau','explorateur'].map(perso).join('')}</div><h3>Avant l’animation</h3><ul class="clean small hx-tight">
      <li>Tester <b>la veille</b> les manettes, le son et le grand écran.</li>
      <li>Un écran visible par <b>tous les observateurs</b>.</li>
      <li>Vérifier les conditions d’usage pour une animation publique.</li></ul></div>
  </div>
  <p class="small muted" style="margin-top:10px">Infos tirées de <a href="https://picoparkgame.com/en/pp1/" target="_blank" rel="noopener">picoparkgame.com</a> (novembre 2026).</p>`,
  notes:`<p>Le site officiel indique que PICO PARK (2019) existe sur Switch et Steam, avec 48 niveaux et de 2 à 8 joueurs, en local ou en ligne. La Classic Edition (Steam) a moins de niveaux, pas de jeu en ligne, et accepte jusqu’à 10 joueurs. L’appli TecoGamePad fonctionne avec les versions Steam et Classic.</p>
  <p>TecoGamePad est un vrai atout en EPN, les jeunes jouent avec leur propre téléphone, sans acheter de manettes.</p>`
});

/* ---------- M3-13 : pour toi ---------- */
Deck.slide({
  id:'M3-13', title:'Pour toi, qu’est-ce que tu retiens ?', kicker:'Retenir', time:'3 min',
  html:`
  <h2>Pour toi, qu’est-ce que tu retiens ?</h2>
  <div class="grid g3">
    <div class="field"><label>🚀 Qu’est-ce qui aide le plus un groupe à réussir ?</label><textarea rows="6" data-store="m3:r1"></textarea></div>
    <div class="field"><label>🧱 Qu’est-ce qui peut freiner un groupe ?</label><textarea rows="6" data-store="m3:r2"></textarea></div>
    <div class="field"><label>✨ Quel comportement observé aujourd’hui aimerais-tu réutiliser dans ton animation ?</label><textarea rows="6" data-store="m3:r3"></textarea></div>
  </div>`,
  notes:`<p>Les trois questions de la dernière page du carnet, adressées ici aux animateurs. 2 minutes en silence, puis un tour rapide sur la 3e question.</p>`
});

/* ---------- M3-14 : transition ---------- */
Deck.slide({
  id:'M3-14', title:'Niveau terminé', kicker:'Vers le niveau 4', time:'1 min', cls:'dark',
  html: Tpl.title({
    kicker:'NIVEAU 3 TERMINÉ · PAUSE DE MIDI DÉBLOQUÉE 🍽️',
    title:'Coopérer, c’est fait.<br>Et planifier ?',
    lead:'Dans Pico Park, tout le monde est égal et on coopère dans l’instant. Cet après-midi, un jeu où chacun a ses forces… et où il faut penser avant d’agir.',
    callout:'Après le repas, place à <b>Hexagonia</b>.'
  }),
  notes:`<p>Bon appétit ! Pendant la pause, installer Hexagonia sur les postes.</p>`
});
})();
