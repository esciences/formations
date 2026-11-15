/* =========================================================
   M2 — Jouer, gamifier, ludifier : on démêle (≈ 45 min)
   Après l'escape game : mettre des mots sur ce qu'on vient de vivre.
   Sources : Cahier du LLL n°8 (UCLouvain, 2020), Manuel de pédagogie
   vidéoludique (FOr'J / educajeux, 2022), Video Games Europe Key Facts 2025.
   ========================================================= */
(function(){
const decor = `<svg class="m2-decor" viewBox="0 0 200 200" aria-hidden="true">
  <path d="M40 40h40v12a12 12 0 1 0 24 0V40h40v40h-12a12 12 0 1 0 0 24h12v40H104v-12a12 12 0 1 0-24 0v12H40v-40h12a12 12 0 1 0 0-24H40z"/></svg>`;
Deck.module({ id:'M2', theme:'m2', decor });

/* ---------- M2-01 ---------- */
Deck.slide({
  id:'M2-01', title:'Mettre des mots sur le jeu', time:'1 min', cls:'dark',
  html: Tpl.title({
    kicker:'NIVEAU 2 · DÉCODER LES MÉCANIQUES',
    title:'Jouer, gamifier, ludifier :<br>on démêle',
    lead:'Vous venez de jouer. Maintenant, mettons des mots (justes) sur ce que vous avez vécu.',
    steps:[['4′','Les chiffres','📊'],['6′','Vrai ou mythe ?','🧐'],['10′','Les mots','📖'],['10′','Ce qui motive','🔥'],['10′','La valse à 3 temps','🎼']],
    callout:'L’objectif est de savoir <b>de quoi on parle</b>… pour savoir <b>ce qu’on fait</b> dans son EPN.'
  }),
  notes:`<p>Ce niveau suit l’escape game : s’appuyer en permanence sur ce que les participants viennent de vivre (« Ce matin, quand… »).</p>`
});

/* ---------- M2-02 : les chiffres ---------- */
const STATS = [['34 ans','L’âge moyen d’un·e joueur·se en Europe','Quel âge a le « joueur moyen » ?'],
  ['46 %','des joueurs européens sont des joueuses','Quelle part de femmes parmi les joueurs ?'],
  ['77 %','des joueurs ont 18 ans ou plus','Quelle part d’adultes ?'],
  ['± 9 h','de jeu par semaine en moyenne','Combien d’heures par semaine ?']];
Deck.slide({
  id:'M2-02', title:'Les chiffres qui bousculent', kicker:'Devinez !', time:'4 min',
  html:`
  <h2>Le joueur moyen ? Devinez…</h2>
  <div class="grid g4 m2-stats">
    ${STATS.map(([v,l,q])=>`<button class="flip m2-stat"><div class="flip-in">
      <div class="flip-face m2-stat-q"><span class="big">❓</span><p>${q}</p><span class="pixel">CLIQUER</span></div>
      <div class="flip-face flip-back m2-stat-a"><b>${v}</b><p>${l}</p></div></div></button>`).join('')}
  </div>
  <div class="callout" style="margin-top:18px">🎮 Le jeu vidéo n’est pas une sous-culture d’ados, <b>c’est une culture commune</b>, et 82 % des joueurs jouent sur smartphone ou tablette.</div>
  <p class="small muted" style="margin-top:8px">Source, Video Games Europe & EGDF, <i>All About Video Games – European Key Facts 2025</i> (16 pays, joueurs de 6 à 75 ans).</p>`,
  notes:`<h4>Animation</h4><p>Faire deviner à main levée avant de retourner chaque carte. Les écarts entre les estimations et la réalité sont le sujet.</p>
  <h4>Pour vos publics EPN</h4><p>Vos seniors qui font des mots fléchés sur tablette, ou Candy Crush dans le bus, <b>sont</b> des joueurs. Le jeu est un terrain commun, pas une barrière.</p>`
});

/* ---------- M2-03 : vrai ou mythe ---------- */
const MYTHES = [
  ['Apprendre par le jeu, c’est une idée nouvelle.','mythe','Érasme le proposait déjà en 1529. Les serious games, eux, se répandent au début des années 2000.'],
  ['Pour rendre une activité ludique, il suffit d’ajouter des points et des badges.','mythe','Des points sans enjeu, c’est un vernis. Le joueur le remarque vite… et décroche.'],
  ['Ce qui est un jeu pour l’animateur l’est forcément pour les participants.','mythe','Le jeu, c’est aussi une attitude (le « play »), et on ne peut pas l’imposer.'],
  ['Le jeu n’est pas naturellement éducatif.','vrai','On joue pour le plaisir. L’apprentissage vient du dispositif construit autour (G. Brougère).'],
  ['Il faut être joueur·se pour animer avec le jeu.','mythe','Il faut surtout connaître le jeu choisi… et savoir débriefer.'],
  ['Dans un jeu, l’erreur a moins de conséquences, et c’est un atout.','vrai','Le droit à l’erreur dédramatise et encourage l’essai. Précieux avec des publics qui ont peur de « casser l’ordinateur ».']
];
Deck.slide({
  id:'M2-03', title:'Vrai ou mythe ?', kicker:'Ludomythes', time:'6 min',
  html:`
  <h2>Vrai ou mythe ?</h2>
  <div data-quiz class="m2-mythes">
    ${MYTHES.map(([t,a,w],i)=>`<div class="q card" data-answer="${a}" data-ok="✅ ${w}" data-ko="🔁 Pas tout à fait… ${w}">
      <p><b>${i+1}.</b> ${t}</p>
      <div class="quiz-opts"><button data-v="vrai">👍 Vrai</button><button data-v="mythe">🙅 Mythe</button></div><div class="quiz-fb"></div></div>`).join('')}
  </div>
  <p class="small muted" style="margin-top:8px">D’après les « Ludomythes » de M. Romero & É. Sanchez (2019), adaptés par le Louvain Learning Lab.</p>`,
  notes:`<p>À faire voter le groupe (debout/assis, ou cartons vert/rouge) avant de cliquer. Une erreur affiche aussi l’explication : on ne pénalise pas.</p>
  <p>Mythe n°3 : distinction <b>game</b> (les règles, l’objet) / <b>play</b> (l’attitude ludique de la personne). On peut fournir le game, pas imposer le play.</p>`
});

/* ---------- M2-04 : qu'est-ce qu'un jeu ---------- */
const CAILLOIS = [['🕊️','Libre','On choisit d’y entrer.','En formation, on est souvent invité… voire obligé.'],
  ['⏱️','Hors du quotidien','Il se joue dans un lieu et un temps délimités, à part.','En formation, on garde ce cadre à part. C’est une force.'],
  ['🎲','Incertain','On ne connaît pas l’issue.','En formation, on vise un objectif précis.'],
  ['🎈','Sans production','Il ne crée ni biens ni richesses. On peut pourtant y apprendre beaucoup !','En formation, on attend un résultat précis, un apprentissage.'],
  ['📏','Réglé','Des règles qui suspendent celles du quotidien.','En formation aussi, c’est le cœur du dispositif.'],
  ['🎭','Fictif','On sait que « c’est pour de faux ».','En formation, la fiction protège et permet d’oser.']];
Deck.slide({
  id:'M2-04', title:'Qu’est-ce qu’un jeu ?', kicker:'Définir', time:'4 min',
  html:`
  <h2>Qu’est-ce qu’un jeu ? Six critères</h2>
  <div class="grid g3 m2-caillois">
    ${CAILLOIS.map(([i,t,d,f])=>`<button class="flip m2-cc"><div class="flip-in">
      <div class="flip-face m2-cc-f"><span class="big">${i}</span><b>${t}</b><span>${d}</span></div>
      <div class="flip-face flip-back m2-cc-b"><span class="tag">ET EN FORMATION ?</span><p>${f}</p></div></div></button>`).join('')}
  </div>
  <div class="callout" style="margin-top:14px">Un jeu en formation n’est plus tout à fait libre, incertain ni « sans production ». <b>C’est toute la tension du jeu sérieux.</b></div>
  <p class="small muted" style="margin-top:6px">D’après Roger Caillois (1958) et M. Vermeulen (2018).</p>`,
  notes:`<p>Caillois parle de jeu « séparé » (limité dans l’espace et le temps) et « improductif » (il ne crée ni biens ni richesses, la partie finit comme elle a commencé). Ça ne veut pas dire qu’on n’y apprend rien !</p><p>Retourner les cartes « Libre », « Incertain » et « Sans production », ce sont celles que la formation met à mal. D’où l’importance de préserver le plaisir et le droit de ne pas jouer.</p>`
});

/* ---------- M2-05 : les mots ---------- */
const MOTS = [
  ['sg','Serious game','Conçu pour ça','Un jeu pensé dès le départ avec un objectif autre que le divertissement (apprendre, sensibiliser, aider la recherche…).','Sea Hero Quest (aider la recherche sur la démence), le Phishing Quiz de Google, DragonBox (les maths par le jeu)'],
  ['sgg','Serious gaming','Détourné pour ça','Un jeu conçu pour divertir, utilisé à des fins sérieuses grâce au dispositif construit autour.','Minecraft pour reconstruire son quartier, Just Dance en éducation physique, Les Sims pour parler budget'],
  ['gam','Gamification','Des éléments de jeu','On ajoute des mécaniques de jeu (points, défis, niveaux, histoire…) à une activité qui n’est pas un jeu.','Les séries de jours de Duolingo, les badges de Strava, les points de Waze, les cartes de fidélité'],
  ['seg','Escape game pédagogique','Un problème, une équipe, un chrono','Une situation problème à résoudre en équipe et en temps limité, puis reliée aux objectifs.','Les escape games à cartes d’Escape Cards, ceux réalisés avec Genially, ou en bibliothèque']
];
Deck.slide({
  id:'M2-05', title:'On démêle les mots', kicker:'Vocabulaire', time:'4 min',
  html:`
  <h2>On démêle les mots</h2>
  <div data-tabs>
    <div class="tabs">${MOTS.map(([k,n])=>`<button data-tab="${k}">${n}</button>`).join('')}</div>
    ${MOTS.map(([k,n,s,d,e])=>`<div class="tab-panel" data-panel="${k}"><div class="card m2-mot"><span class="tag">${s.toUpperCase()}</span><h3>${n}</h3><p>${d}</p><p class="m2-ex"><b>Exemples</b><br>${e}</p></div></div>`).join('')}
  </div>
  <div class="callout small">📚 <b>Ludification</b> est souvent utilisé comme traduction de gamification, mais il peut désigner plus largement <b>tout usage du jeu</b> à des fins sérieuses. Dans le doute, précisez ce que vous faites concrètement.</div>`,
  notes:`<p>Définitions d’après D. Michael & S. Chen (serious game, 2005), D. Djaouti (serious gaming, 2012), T. Philippette – UCLouvain (gamification, ludification), P. Vangrunderbeek & I. Motte – LLL (escape game pédagogique).</p>
  <p>Le point clé, <b>serious game</b> = conçu pour, <b>serious gaming</b> = détourné pour.</p>`
});

/* ---------- M2-06 : tri ---------- */
/* Pictogrammes dessinés (style plateau) */
const ICO = {
  bateau:`<svg viewBox="0 0 64 64"><path d="M8 40h48l-8 12H16z" fill="var(--acc)" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/><path d="M32 8v32M32 10l16 24H32" fill="#fff" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/><path d="M4 58c6-4 10-4 16 0s10 4 16 0 10-4 16 0 6 2 8 0" fill="none" stroke="var(--ink)" stroke-width="3"/></svg>`,
  flamme:`<svg viewBox="0 0 64 64"><path d="M32 6c4 10 16 16 16 30a16 16 0 0 1-32 0c0-8 4-12 8-16 0 6 2 9 5 10-1-10 1-17 3-24z" fill="#f2b33d" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/><text x="32" y="48" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-weight="700" font-size="16" fill="var(--ink)">7</text></svg>`,
  danse:`<svg viewBox="0 0 64 64"><circle cx="34" cy="12" r="6" fill="var(--acc)" stroke="var(--ink)" stroke-width="3"/><path d="M34 18l-4 18 10 8 4 14M30 36l-10 10M33 24l14-8M33 24L18 18" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/><path d="M50 30v12M50 30l8-2v12" fill="none" stroke="var(--ink)" stroke-width="3"/><circle cx="48" cy="43" r="3" fill="var(--ink)"/><circle cx="56" cy="41" r="3" fill="var(--ink)"/></svg>`,
  pin:`<svg viewBox="0 0 64 64"><path d="M32 58S14 38 14 24a18 18 0 0 1 36 0c0 14-18 34-18 34z" fill="#4cc3ff" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/><circle cx="32" cy="24" r="7" fill="#fff" stroke="var(--ink)" stroke-width="3"/><path d="M44 50l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z" fill="#f2b33d" stroke="var(--ink)" stroke-width="2" transform="translate(4 -10) scale(.8)"/></svg>`,
  cube:`<svg viewBox="0 0 64 64"><path d="M32 6l22 12v26L32 58 10 44V18z" fill="#7cc56d" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/><path d="M10 18l22 12 22-12M32 30v28" fill="none" stroke="var(--ink)" stroke-width="3"/><path d="M10 18l22 12 22-12-22-12z" fill="#8bd17c" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/><path d="M32 30v28L10 44V18z" fill="#a0784e" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round" opacity=".9"/></svg>`,
  hamecon:`<svg viewBox="0 0 64 64"><rect x="8" y="14" width="40" height="28" rx="3" fill="#fff" stroke="var(--ink)" stroke-width="3"/><path d="M8 16l20 14 20-14" fill="none" stroke="var(--ink)" stroke-width="3"/><path d="M50 6v30a8 8 0 0 1-16 0v-4l-4 4" fill="none" stroke="var(--acc)" stroke-width="4" stroke-linecap="round"/></svg>`
};
const TRI = [
  ['bateau','Sea Hero Quest','Piloter un bateau sur son téléphone pour aider la recherche sur la démence','sg','Conçu dès le départ pour la recherche, chaque partie fournit des données aux scientifiques.'],
  ['flamme','Duolingo','La série de jours consécutifs qui pousse à revenir chaque jour','gam','Une mécanique de jeu (la série) ajoutée à une appli qui n’est pas un jeu.'],
  ['danse','Just Dance','Utilisé en cours d’éducation physique','sgg','Un jeu commercial de divertissement, détourné par le dispositif.'],
  ['pin','Waze','Des points et des niveaux pour les conducteurs qui signalent les bouchons','gam','Des points et des niveaux pour encourager la participation.'],
  ['cube','Minecraft','Reconstruire son quartier en blocs pour imaginer son aménagement','sgg','Un jeu de construction détourné pour un projet citoyen ou pédagogique.'],
  ['hamecon','Phishing Quiz (Google)','Un quiz pour apprendre à repérer les e-mails frauduleux','sg','Conçu pour sensibiliser à l’hameçonnage, le jeu, c’est le message.']
];
Deck.slide({
  id:'M2-06', title:'À vous de trier', kicker:'Mini-défi', time:'5 min',
  html:`
  <h2>À vous de trier !</h2>
  <div data-quiz class="m2-tri">
    ${TRI.map(([ic,n,t,a,w])=>`<div class="q card m2-tq" data-answer="${a}" data-ok="✅ ${w}" data-ko="🔁 Conçu pour, détourné pour, ou simplement des éléments de jeu ajoutés ?">
      <div class="m2-ti">${ICO[ic]}</div><div><p><b>${n}</b><br><span class="small">${t}</span></p><div class="quiz-opts"><button data-v="sg">Serious game</button><button data-v="sgg">Serious gaming</button><button data-v="gam">Gamification</button></div><div class="quiz-fb"></div></div></div>`).join('')}
  </div>`,
  notes:`<p>En binômes sur un poste, ou collectivement. Les frontières sont parfois floues. Un désaccord argumenté vaut mieux qu’une bonne réponse au hasard.</p>`
});

/* ---------- M2-07 : les pièges ---------- */
Deck.slide({
  id:'M2-07', title:'Le brocoli au chocolat', kicker:'Les pièges', time:'4 min',
  html:`
  <div class="split" style="grid-template-columns:.85fr 1.15fr;align-items:start">
    <div>
      <h2>Le brocoli enrobé de chocolat 🥦🍫</h2>
      <p>Recouvrir une activité ennuyeuse d’un vernis de jeu ne la rend pas plus appétissante. Le participant <b>recrache le brocoli</b>… et ne fait plus confiance au cuisinier.</p>
      <div class="card acc"><p style="margin:0"><b>Une question pour vous.</b> La Timeline de ce matin vous a-t-elle plus motivé qu’une présentation des mêmes dates, une par une, à l’écran ?</p></div>
    </div>
    <div class="grid" style="gap:12px">
      <div class="card" data-step><span class="tag">PIÈGE 1</span><h3>Points, badges, classements… et c’est tout</h3><p class="small">Une motivation <b>extérieure</b>, qui s’éteint quand la récompense disparaît. Le classement démotive souvent les derniers.</p></div>
      <div class="card" data-step><span class="tag">PIÈGE 2</span><h3>Tout miser sur la compétition</h3><p class="small">Tout le monde n’aime pas gagner contre les autres. Certains veulent coopérer, explorer, comprendre.</p></div>
      <div class="card" data-step><span class="tag">PIÈGE 3</span><h3>Manipuler plutôt que motiver</h3><p class="small">Mal utilisée, la gamification devient une technique pour <b>faire faire</b>. Il y a un enjeu éthique.</p></div>
    </div>
  </div>`,
  notes:`<p>Image du brocoli au chocolat tirée du Manuel de pédagogie vidéoludique (FOr’J). Enjeu éthique soulevé par T. Philippette (UCLouvain), dans le Cahier du LLL n°8.</p>
  <p>Ouvrir le débat avec la question sur la Timeline. Qu’est-ce qui a fait la différence ? Manipuler, discuter, se tromper, partager des souvenirs… C’est le jeu qui sert le contenu, pas un vernis posé dessus.</p>`
});

/* ---------- M2-08 : ce qui motive ---------- */
Deck.slide({
  id:'M2-08', title:'Ce qui motive vraiment', kicker:'Motivation', time:'5 min',
  html:`
  <h2>Ce qui motive vraiment</h2>
  <div class="split" style="grid-template-columns:1fr 1fr;align-items:start">
    <div class="grid" style="gap:12px">
      <div class="card"><h3>🧭 Autonomie</h3><p class="small">J’ai des choix à faire, mon avis compte.</p></div>
      <div class="card"><h3>💪 Compétence</h3><p class="small">Je progresse et je le vois. Le défi est à ma hauteur.</p></div>
      <div class="card"><h3>🤝 Appartenance</h3><p class="small">Je fais partie d’un groupe, on avance ensemble.</p></div>
      <p class="small muted">Les trois besoins de la théorie de l’autodétermination (Deci & Ryan).</p>
    </div>
    <div class="card acc m2-flow">
      <h3>L’état de « flow »</h3>
      <p class="small" style="margin:0 0 6px">Ce moment où l’on est tellement absorbé par une activité qu’on ne voit plus le temps passer. Il apparaît quand le défi est à la hauteur de nos compétences.</p>
      <label>Difficulté du défi <input type="range" min="0" max="10" value="5" class="fDef"></label>
      <label>Compétence du participant <input type="range" min="0" max="10" value="5" class="fComp"></label>
      <div class="m2-flow-out"><span class="big fIco">🌊</span><b class="fName">Flow (absorption)</b><span class="small fTxt"></span></div>
    </div>
  </div>`,
  onEnter(root){
    const d=root.querySelector('.fDef'), c=root.querySelector('.fComp');
    const draw=()=>{ const x=+d.value-(+c.value); let r;
      if(+d.value<3 && +c.value<3) r=['😶','Apathie','Défi trop facile et compétences faibles, il ne se passe rien.'];
      else if(x>=3) r=['😰','Anxiété','Le défi dépasse les compétences. Stress, abandon… Simplifier ou accompagner.'];
      else if(x<=-3) r=['🥱','Ennui','Trop facile, on décroche. Ajouter une contrainte ou un niveau.'];
      else r=['🌊','Flow (absorption)','Défi et compétences sont équilibrés, on oublie le temps.'];
      root.querySelector('.fIco').textContent=r[0]; root.querySelector('.fName').textContent=r[1]; root.querySelector('.fTxt').textContent=r[2]; };
    [d,c].forEach(i=>{ i.addEventListener('input',draw); i.addEventListener('keydown',e=>e.stopPropagation()); }); draw();
  },
  notes:`<p>Le <b>flow</b> (M. Csíkszentmihályi), c’est l’état d’absorption quand le défi est juste à la hauteur des compétences. C’est ce que réussissent les bons jeux, avec leur progression par niveaux.</p>
  <p>En EPN, le bon réflexe est d’<b>ajuster la difficulté</b> à chaque personne (contrainte en plus pour les rapides, coup de pouce pour les autres).</p>`
});

/* ---------- M2-09 : profils de joueurs ---------- */
const JOUEURS = [['compet','⚔️','Compétition','J’aime me mesurer aux autres et gagner.'],
  ['strat','♟️','Stratégie','J’aime planifier, optimiser, prendre des décisions.'],
  ['immer','🌌','Immersion','J’aime me plonger dans un univers et une histoire.'],
  ['social','🎉','Amusement social','J’aime surtout passer un bon moment ensemble.']];
Deck.slide({
  id:'M2-09', title:'On ne joue pas tous pour les mêmes raisons', kicker:'Profils', time:'4 min',
  html:`
  <h2>Et vous, vous jouez pour quoi ?</h2>
  <div class="grid g4 m2-prof">
    ${JOUEURS.map(([k,i,n,d])=>`<div class="card m2-pc"><span class="big">${i}</span><b>${n}</b><span class="small muted">${d}</span><div class="counter" data-key="m2:prof:${k}"></div></div>`).join('')}
  </div>
  <div class="callout" style="margin-top:18px">🎯 Un atelier 100 % compétitif plaît à un profil… et en perd trois. <b>Variez les mécaniques</b> et proposez toujours un rôle d’<b>observateur</b> à ceux qui ne veulent pas jouer.</div>
  <p class="small muted" style="margin-top:6px">D’après R. Bartle (1996) et N. Yee (2006), cités par le Louvain Learning Lab.</p>`,
  notes:`<p>Chacun·e indique son profil dominant, je compte avec + et −. Faire le lien avec le tour de table du matin (Timeline).</p>
  <p>L’astuce du rôle d’observateur avec carnet vient de l’UCLouvain : les moins joueurs y trouvent une autre forme d’engagement. On l’utilisera dans Pico Park et Hexagonia.</p>`
});

/* ---------- M2-10 : la valse à trois temps ---------- */
Deck.slide({
  id:'M2-10', title:'La valse à trois temps', kicker:'Méthode', time:'5 min',
  html:`
  <h2>La valse à trois temps 🎼</h2>
  <div class="m2-valse">
    <div class="card"><span class="m2-n">1</span><h3>Introduire</h3><p class="small">Mettre en situation, donner envie, expliquer <b>juste ce qu’il faut</b>.</p></div>
    <span class="m2-arr">➜</span>
    <div class="card"><span class="m2-n">2</span><h3>Jouer</h3><p class="small">Animer, observer, laisser chercher… et se tromper.</p></div>
    <span class="m2-arr">➜</span>
    <div class="card acc"><span class="m2-n">3</span><h3>Débriefer</h3><p class="small">Revenir sur les temps forts et <b>les relier</b> aux objectifs.</p></div>
  </div>
  <blockquote class="m2-quote" data-step>Ce n’est pas le jeu qui apprend,<br><span class="hl">c’est le débriefing.</span></blockquote>
  <div class="grid g2" data-step style="margin-top:6px">
    <div class="card"><p class="small" style="margin:0">⚖️ <b>Trop de jeu</b> → on perd l’objectif. Prévoir un retour réflexif.</p></div>
    <div class="card"><p class="small" style="margin:0">⚖️ <b>Trop de pédagogie</b> → on perd la motivation. Garder le plaisir.</p></div>
  </div>`,
  notes:`<p>Les trois temps : N. Tremblay (2007), repris par le LLL. L’équilibre ludique/sérieux : J. Alvarez, D. Djaouti & O. Rampnoux.</p>
  <p>Faire remarquer que c’est la structure de toute la journée : chaque jeu est introduit brièvement, joué par étapes, puis débriefé.</p>`
});

/* ---------- M2-11 : checkpoint ---------- */
Deck.slide({
  id:'M2-11', title:'Checkpoint', kicker:'Vers le niveau 3', time:'1 min', cls:'dark',
  html: Tpl.title({
    kicker:'CHECKPOINT · SAUVEGARDE EFFECTUÉE',
    title:'Assez parlé. On joue ?',
    lead:'Prochain niveau, un jeu tout simple, sans aucune visée éducative… et pourtant redoutable pour faire coopérer un groupe.',
    callout:'Direction <b>Pico Park</b>. Gardez en tête le <b>serious gaming</b>, le <b>flow</b> et les <b>profils de joueurs</b>.'
  }) + `<div class="pp-parade" aria-hidden="true">${['casquette','chat','chapeau','explorateur','bonnet'].map((k,i)=>`<img src="assets/pico/perso-${k}.webp" style="--d:${i*0.55}s">`).join('')}</div>`,
  notes:`<p>Transition directe vers Pico Park : les manettes sont prêtes, les groupes se forment pendant cette slide.</p>`
});
})();
