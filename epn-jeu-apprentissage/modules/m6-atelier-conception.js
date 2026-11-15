/* =========================================================
   M6 — Atelier : gamifier une activité EPN (≈ 60 min)
   Les participants deviennent concepteurs : une activité EPN
   « classique » → une activité gamifiée, testée par une autre équipe.
   Livrable : la fiche d'activité gamifiée (promise dans l'offre).
   Méthode « JE JOUE » : Cahier du LLL n°8 (UCLouvain, 2020).
   ========================================================= */
(function(){
const decor = `<div class="m6-decor" aria-hidden="true">🛠️</div>`;
Deck.module({ id:'M6', theme:'m6', decor });

/* ---------- M6-01 ---------- */
Deck.slide({
  id:'M6-01', title:'Game designers d’un jour', time:'1 min', cls:'dark',
  html: Tpl.title({
    kicker:'NIVEAU 6 · MODE CRÉATION',
    title:'À vous de jouer…<br>les game designers',
    lead:'Vous avez joué à trois jeux aujourd’hui. Maintenant, vous imaginez comment le jeu peut servir une activité de votre EPN.',
    steps:[['','Quel jeu pour quel sujet ?','🎯'],['','Méthode & mécaniques','🧰'],['','Concevoir','✏️'],['','Tour de table','🗣️'],['','Relire','✅']],
    callout:'À la fin, vous repartez avec <b>votre fiche d’activité gamifiée</b>, prête à tester dans votre EPN.'
  }),
  notes:`<p>Équipes de 2 ou 3, idéalement de publics EPN proches. Un poste par équipe (le canevas se remplit dans ce support, les réponses restent sur le poste).</p>`
});

/* ---------- M6-02 : le défi ---------- */
const ACTIVITES = [
  ['📧','Créer et gérer une adresse e-mail'],['🗂️','Classer ses fichiers et dossiers'],['🎣','Repérer un e-mail d’hameçonnage'],
  ['🔐','Créer un mot de passe solide'],['📱','Prendre en main une tablette'],['🏛️','Faire une démarche administrative en ligne'],
  ['🔎','Vérifier une information trouvée en ligne'],['📷','Retoucher et partager une photo'],['🎥','Faire un appel vidéo avec ses proches'],
  ['🕵️','Protéger sa vie privée sur les réseaux sociaux']
];
const PISTES = [['🔐','Un escape game','Des énigmes à résoudre en équipe (Genially, Escape Cards…).'],
  ['🎮','Un jeu vidéo existant','Un jeu que vous connaissez déjà, utilisé autrement (Minecraft, Pico Park, Hexagonia…).'],
  ['🃏','Un jeu de société détourné','Timeline, Dixit, Loup-garou… avec vos propres cartes.'],
  ['❓','Un quiz ou un défi','Un Kahoot, un jeu de piste, une course contre la montre…']];
Deck.slide({
  id:'M6-02', title:'Quel jeu pour quel sujet ?', kicker:'Imaginer', time:'',
  html:`
  <div class="split" style="grid-template-columns:.95fr 1.05fr;align-items:start">
    <div>
      <h2>Quel jeu pour ce sujet ?</h2>
      <p>On ne conçoit rien pour l’instant. Prenez un sujet de votre EPN et <b>imaginez un jeu qui pourrait le servir</b>.</p>
      <div class="m6-acts m6-acts-s">${ACTIVITES.map(([i,n])=>`<button class="m6-act" data-n="${n}"><span>${i}</span>${n}</button>`).join('')}</div>
      <button class="btn alt" id="actDraw" style="margin-top:10px">🎲 Piocher un sujet</button>
    </div>
    <div class="grid" style="gap:10px">
      <div class="m6-pick" id="actOut"><span class="muted">Choisissez un sujet à gauche… ou écrivez le vôtre.</span></div>
      <div class="field"><label>Notre sujet</label><textarea rows="1" data-store="m6:activite" placeholder="Ex. : Repérer un e-mail d’hameçonnage"></textarea></div>
      <div class="m6-pistes">${PISTES.map(([i,t,d])=>`<div class="m6-piste"><span class="m6-mi">${i}</span><div><b>${t}</b><span class="small">${d}</span></div></div>`).join('')}</div>
      <div class="field"><label>Le jeu qu’on pourrait utiliser, et pourquoi</label><textarea rows="2" data-store="m6:jeu" placeholder="Ex. : un escape game où chaque énigme est un indice d’arnaque"></textarea></div>
    </div>
  </div>`,
  onEnter(root, api){
    const ta=root.querySelector('[data-store="m6:activite"]'), out=root.querySelector('#actOut');
    const set=n=>{ ta.value=n; api.store.set('txt:m6:activite',n); out.innerHTML=n?`<b>✅ ${n}</b>`:'<span class="muted">Choisissez un sujet à gauche… ou écrivez le vôtre.</span>';
      root.querySelectorAll('.m6-act').forEach(b=>b.classList.toggle('on',b.dataset.n===n)); };
    root.querySelectorAll('.m6-act').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation(); set(b.classList.contains('on')?'':b.dataset.n);}));
    root.querySelector('#actDraw').addEventListener('click',e=>{e.stopPropagation(); set(ACTIVITES[Math.floor(Math.random()*ACTIVITES.length)][1]);});
  },
  notes:`<p>Courte réflexion en équipe (5 minutes), sans entrer dans la conception. On cherche juste <b>comment le jeu peut s’intégrer</b> au sujet. Un escape game ? Un jeu vidéo déjà connu, détourné ? Un jeu de société adapté ?</p>
  <p>Faire partager deux ou trois idées à voix haute avant de passer à la méthode. La réponse « quel jeu » sera reprise comme fil conducteur dans le canevas.</p>`
});

/* ---------- M6-03 : la méthode JE JOUE ---------- */
const JEJOUE = [['J','Je situe l’activité','Dans quel parcours, à quel moment ? Pour qui ?'],
  ['E','En précisant l’objectif','« À la fin, les participants sauront… »'],
  ['J','Joueurs : quels profils ?','Compétition, stratégie, immersion, convivialité… et les non-joueurs ?'],
  ['O','Obstacles et contraintes','Temps, salle, matériel, connexion, niveau du groupe.'],
  ['U','Utiliser un jeu pertinent','Existant, détourné, modifié… ou à créer ?'],
  ['E','Élaborer en 3 temps','Introduire, jouer, débriefer.']];
Deck.slide({
  id:'M6-03', title:'La méthode JE JOUE', kicker:'Méthode', time:'4 min',
  html:`
  <h2>La méthode « JE JOUE »</h2>
  <div class="m6-jejoue">${JEJOUE.map(([l,t,d])=>`<div class="m6-jj" data-step><span class="m6-letter">${l}</span><div><b>${t}</b><p class="small">${d}</p></div></div>`).join('')}</div>
  <div class="callout small" style="margin-top:12px">💡 Pour une première fois, le Louvain Learning Lab conseille de <b>détourner un jeu existant</b> plutôt que d’en créer un.</div>`,
  notes:`<p>Six principes du Cahier du Louvain Learning Lab n°8 (2020). Les dérouler rapidement : le canevas qui suit reprend exactement ces questions.</p>`
});

/* ---------- M6-04 : la boîte à mécaniques ---------- */
const MECAS = [
  ['mission','🎯','Une mission','Donner un but et un rôle fictifs.','Rester court : 3 phrases.'],
  ['niveaux','🧗','Des niveaux','Une difficulté qui monte pas à pas.','Une nouveauté à la fois.'],
  ['temps','⏳','Un chrono','Créer de l’élan.','Stressant pour les débutants.'],
  ['enigme','🔐','Énigmes & cadenas','Chercher, déduire, débloquer.','Prévoir des indices.'],
  ['cartes','🃏','Cartes défi','Varier les règles, pimenter.','Une carte = une règle claire.'],
  ['hasard','🎲','Le hasard','Dés, pioche : rebattre les cartes.','Pas pour l’essentiel.'],
  ['coop','🤝','Réussite commune','Tout le monde gagne, ou personne.','Surveiller qui décide.'],
  ['roles','🎭','Des rôles','Pilote, stratège, observateur…','Faire tourner les rôles.'],
  ['feedback','📊','Feedback visible','Une jauge, une carte qui se remplit.','Montrer le progrès, pas l’échec.'],
  ['badge','🏅','Récompense','Badge, tampon, diplôme.','Jamais seule (brocoli !).'],
  ['explo','🗺️','Exploration','Chasse au trésor, découverte libre.','Cadre et temps clairs.'],
  ['compet','⚔️','Compétition','Équipes contre équipes.','Ne plaît pas à tous.']
];
Deck.slide({
  id:'M6-04', title:'La boîte à mécaniques', kicker:'Outils', time:'5 min',
  html:`
  <h2>La boîte à mécaniques <span class="small muted" style="font-family:var(--f-body);font-weight:400">(choisissez-en 2 à 4)</span></h2>
  <div class="m6-mecas">${MECAS.map(([k,i,n,d,w])=>`<button class="m6-meca" data-k="${k}"><span class="m6-mi">${i}</span><b>${n}</b><span class="small">${d}</span><span class="m6-warn">⚠️ ${w}</span></button>`).join('')}</div>
  <p class="small" id="mecaCount" style="margin-top:8px"></p>`,
  onEnter(root, api){
    let sel=new Set(api.store.get('m6:meca',[]));
    const draw=()=>{ root.querySelectorAll('.m6-meca').forEach(b=>b.classList.toggle('on',sel.has(b.dataset.k)));
      const n=sel.size; root.querySelector('#mecaCount').innerHTML = n===0?'👆 Cliquez sur les mécaniques que vous voulez utiliser.': n>4?`⚠️ ${n} mécaniques : c’est beaucoup ! Gardez l’essentiel.`:`✅ ${n} mécanique${n>1?'s':''} choisie${n>1?'s':''}.`; };
    root.querySelectorAll('.m6-meca').forEach(b=>b.addEventListener('click',e=>{ e.stopPropagation(); sel.has(b.dataset.k)?sel.delete(b.dataset.k):sel.add(b.dataset.k); api.store.set('m6:meca',[...sel]); draw(); }));
    draw();
  },
  notes:`<p>Rappeler les jeux du jour : l’escape game (énigmes, chrono, coopération), Pico Park (réussite commune, cartes contraintes), Hexagonia (niveaux, feedback, rôles).</p>
  <p>Inspiré des « mécanicartes » mentionnées par le LLL : on assemble des briques plutôt que d’inventer un jeu de zéro.</p>`
});

/* ---------- M6-05 / 06 : le canevas ---------- */
const F1 = [['titre','Le nom de l’activité','Ex. : Opération Hameçon',1],['public','Pour qui ? Combien ?','Ex. : 8 seniors débutants',1],
  ['jeu','Quel jeu ? (le fil conducteur et l’outil d’apprentissage)','Ex. : SimCity, Pictionary, Taboo, un Cluedo version cyberattaque…',2],
  ['objectif','Objectif : à la fin, ils sauront…','Ex. : reconnaître 3 indices d’un e-mail frauduleux',2],
  ['mission','La mission (l’histoire en 3 phrases)','Ex. : Vous êtes agents de la brigade anti-arnaques…',3],
  ['etapes','Les étapes ou niveaux','Niveau 1 : … · Niveau 2 : … · Niveau 3 : …',3]];
const F2 = [['feedback','Comment voient-ils qu’ils progressent ?','Ex. : une carte « dossier » se remplit de tampons',2],
  ['roles','Rôles et coopération','Ex. : un lecteur, un détective, un greffier',2],
  ['briefing','Mon briefing (ce que je dis au départ)','3 phrases maximum',2],
  ['debrief','Mon débriefing : 3 questions','1. Qu’avez-vous remarqué ? 2. … 3. …',3],
  ['materiel','Matériel et durée','Ex. : 4 PC, cartes imprimées, 45 min',1],
  ['adapt','Adaptations possibles','Plus facile : … · Plus difficile : …',2]];
const field = ([k,l,p,r]) => `<div class="field"><label>${l}</label><textarea rows="${r}" data-store="m6:${k}" placeholder="${p}"></textarea></div>`;
const chips = api => { const sel=api.store.get('m6:meca',[]); return sel.length ? sel.map(k=>{const m=MECAS.find(x=>x[0]===k); return m?`<span class="m6-chip">${m[1]} ${m[2]}</span>`:'';}).join('') : '<span class="muted small">Aucune mécanique choisie (voir M6-04).</span>'; };

Deck.slide({
  id:'M6-05', title:'Canevas 1/2 : le cœur du jeu', kicker:'Concevoir', time:'25 min (avec 2/2)',
  html:`
  <div class="m6-canvas">
    <div class="m6-canvas-head"><h2>Canevas 1/2 : le cœur du jeu</h2><div class="m6-head-r no-print"><a class="btn alt" href="assets/fiches/canevas-conception.pdf" download>📄 Fiche PDF</a><div class="timer" data-min="25"></div></div></div>
    <div class="m6-act-line">Sujet <b class="m6-act-name"></b> &nbsp;·&nbsp; Mécaniques <span class="m6-chips"></span></div>
    <div class="grid g2" style="gap:12px">
      <div class="grid" style="gap:10px">${F1.slice(0,4).map(field).join('')}</div>
      <div class="grid" style="gap:10px">${F1.slice(4).map(field).join('')}</div>
    </div>
  </div>`,
  onShow(root, api){
    root.querySelector('.m6-act-name').textContent = api.store.get('txt:m6:activite','') || '(à choisir en M6-02)';
    root.querySelector('.m6-chips').innerHTML = chips(api);
  },
  notes:`<p>Le canevas existe aussi en version papier (fiche PDF A4, recto verso + une page de notes, bouton en haut à droite). Une fiche par équipe.</p><h4>Accompagnement</h4><ul><li>Commencer par l’<b>objectif</b>, toujours. Puis le <b>jeu</b>, fil conducteur de l’activité, qui doit servir cet objectif.</li><li>Si une équipe bloque sur la mission : « Qui pourraient être vos participants dans une histoire ? Des agents, des explorateurs, une équipe de secours… »</li><li>Passer dans les équipes à mi-parcours avec la question : « Où est le plaisir, dans votre activité ? »</li></ul>`
});

Deck.slide({
  id:'M6-06', title:'Canevas 2/2 : l’animation', kicker:'Concevoir', time:'(suite)',
  html:`
  <div class="m6-canvas-head"><h2>Canevas 2/2 : l’animation</h2><div class="no-print"><a class="btn alt" href="assets/fiches/canevas-conception.pdf" download>📄 Fiche PDF</a></div></div>
  <div class="grid g3" style="gap:12px">
    <div class="grid" style="gap:10px">${F2.slice(0,2).map(field).join('')}</div>
    <div class="grid" style="gap:10px">${F2.slice(2,4).map(field).join('')}</div>
    <div class="grid" style="gap:10px">${F2.slice(4).map(field).join('')}</div>
  </div>
  <div class="callout small" style="margin-top:10px">🎼 N’oubliez pas la valse à trois temps : <b>introduire</b> (briefing), <b>jouer</b>, <b>débriefer</b>.</div>`,
  notes:`<p>Le débriefing est la partie la plus souvent oubliée. Vérifier que chaque équipe a bien écrit ses trois questions.</p>`
});

/* ---------- M6-07 : tour de table ---------- */
Deck.slide({
  id:'M6-07', title:'Tour de table', kicker:'Partager', time:'',
  html:`
  <h2>Tour de table, on partage les idées</h2>
  <div class="split" style="grid-template-columns:1fr 1fr;align-items:start">
    <div class="card acc m6-tour">
      <h3>Chaque équipe présente en une minute</h3>
      <ol class="hx-steps small-steps">
        <li>Le <b>sujet</b> et le <b>public</b>.</li>
        <li>Le <b>jeu</b> choisi comme fil conducteur.</li>
        <li>Une <b>mécanique</b> dont vous êtes fiers.</li>
        <li>La <b>question</b> qui vous reste.</li>
      </ol>
    </div>
    <div>
      <div class="m6-crash"><div><b>👍</b><span>Ce qui donne envie</span></div><div><b>💡</b><span>Une idée à piquer</span></div><div><b>❓</b><span>Une question à poser</span></div></div>
      <div class="field" style="margin-top:12px"><label>Les idées que je pique aux autres équipes</label><textarea rows="4" data-store="m6:idees" placeholder="Ex. : le chrono de l’équipe 2, les cartes défi de l’équipe 4…"></textarea></div>
    </div>
  </div>`,
  notes:`<p>Une minute par équipe, pas plus. Les autres écoutent avec une seule consigne : repérer ce qui donne envie et une idée à reprendre chez soi. Les équipes peuvent ensuite ajuster leur fiche.</p>`
});

/* ---------- M6-08 : relecture ---------- */
const CHECK = ['L’objectif d’apprentissage est clair et écrit.','Le jeu sert l’objectif (et pas l’inverse).','Il y a du plaisir : choix, défi, surprise ou convivialité.',
  'L’erreur est permise et sans conséquence grave.','Les non-joueurs ont une place (observateur, rôle…).','Le briefing tient en 3 phrases.',
  'Le débriefing est prévu, avec des questions.','La logistique est réaliste dans mon EPN.'];
Deck.slide({
  id:'M6-08', title:'Grille de relecture', kicker:'Vérifier', time:'5 min',
  html:`
  <div class="split" style="grid-template-columns:1.2fr .8fr;align-items:start">
    <div>
      <h2>Votre fiche passe-t-elle le contrôle technique ?</h2>
      <div class="m6-checks">${CHECK.map((c,i)=>`<label class="m6-check"><input type="checkbox" data-i="${i}"><span>${c}</span></label>`).join('')}</div>
    </div>
    <div class="card acc m6-score"><span class="big" id="ckIco">🛠️</span><b id="ckN">0 / 8</b><p class="small" id="ckTxt"></p></div>
  </div>`,
  onEnter(root, api){
    let v=api.store.get('m6:check',[]);
    const boxes=[...root.querySelectorAll('.m6-check input')];
    const draw=()=>{ const n=boxes.filter(b=>b.checked).length;
      root.querySelector('#ckN').textContent=n+' / 8';
      const [i,t]= n===8?['🏆','Prête à jouer ! Testez-la dans votre EPN.'] : n>=6?['🚀','Presque prête : il reste un ou deux réglages.'] : n>=3?['🔧','Bonne base. Revenez sur les points non cochés.'] : ['🛠️','Cochez ce que votre fiche respecte déjà.'];
      root.querySelector('#ckIco').textContent=i; root.querySelector('#ckTxt').textContent=t; };
    boxes.forEach(b=>{ b.checked=v.includes(+b.dataset.i); b.addEventListener('change',()=>{ v=boxes.filter(x=>x.checked).map(x=>+x.dataset.i); api.store.set('m6:check',v); draw(); }); b.addEventListener('click',e=>e.stopPropagation()); });
    draw();
  },
  notes:`<p>Grille inspirée du modèle CEPAJe (J. Alvarez & P. Chaumette, 2017), simplifiée pour les EPN.</p>`
});

/* ---------- M6-09 : la fiche ---------- */
const ALL = [['titre','Nom'],['public','Public'],['jeu','Le jeu (fil conducteur)'],['objectif','Objectif'],['mission','Mission'],['etapes','Étapes / niveaux'],['feedback','Feedback'],['roles','Rôles et coopération'],['briefing','Briefing'],['debrief','Débriefing'],['materiel','Matériel et durée'],['adapt','Adaptations']];
Deck.slide({
  id:'M6-09', title:'Votre fiche d’activité', kicker:'Livrable', time:'1 min',
  html:`
  <div class="m6-fiche-head"><h2>Votre fiche d’activité gamifiée</h2>
    <div class="hx-btnrow no-print"><button class="btn" id="ficheCopy">📋 Copier le texte</button><button class="btn alt" data-print>🖨 Imprimer</button></div></div>
  <div class="m6-fiche" id="fiche"></div>`,
  onShow(root, api){
    const g=k=>api.store.get('txt:m6:'+k,'');
    const sel=api.store.get('m6:meca',[]).map(k=>{const m=MECAS.find(x=>x[0]===k); return m?m[2]:'';}).filter(Boolean).join(', ');
    const rows=[['Activité EPN', g('activite')],['Mécaniques', sel], ...ALL.map(([k,l])=>[l,g(k)])];
    root.querySelector('#fiche').innerHTML = rows.map(([l,v])=>`<div class="m6-row"><b>${l}</b><span>${v?v.replace(/</g,'&lt;').replace(/\n/g,'<br>'):'<i class="muted">—</i>'}</span></div>`).join('');
    root.querySelector('#ficheCopy').onclick = async e=>{ e.stopPropagation();
      const txt = rows.map(([l,v])=>`${l} : ${v||'—'}`).join('\n');
      try{ await navigator.clipboard.writeText(txt); api.toast('📋 Fiche copiée : collez-la dans un mail ou un document.'); }
      catch(err){ api.toast('Copie impossible ici : utilisez « Imprimer » ou sélectionnez le texte.'); } };
  },
  notes:`<p>C’est la « fiche d’activité créée par les participants » promise dans l’offre. Proposer à chacun de la copier ou de l’imprimer, et de me l’envoyer s’ils sont d’accord pour la partager avec le groupe.</p>`
});

/* ---------- M6-10 ---------- */
Deck.slide({
  id:'M6-10', title:'Niveau terminé', kicker:'Vers le niveau 7', time:'1 min', cls:'dark',
  html: Tpl.title({
    kicker:'NIVEAU 6 TERMINÉ · OBJET CRÉÉ : FICHE D’ACTIVITÉ',
    title:'Vous êtes game designers.',
    lead:'Dernier niveau : prendre du recul sur la journée et repartir avec un plan d’action.',
    callout:'🏆 Direction le <b>niveau 7</b>.'
  }),
  notes:`<p>Transition rapide vers la synthèse.</p>`
});
})();
