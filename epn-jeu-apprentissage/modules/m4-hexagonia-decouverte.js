/* =========================================================
   M4 — Hexagonia : prise en main (≈ 30 min)
   Présenter le strict nécessaire, former les équipes, jouer
   l'étape 1 (zones 01 → 03), puis débriefer à chaud.
   Les mécaniques ne sont expliquées QU'APRÈS avoir joué.
   ========================================================= */
(function(){
const {A, mission, flash} = HX;
Deck.module({ id:'M4', title:'Hexagonia : prise en main' });

/* ---------- M4-01 : ouverture ---------- */
Deck.slide({
  id:'M4-01', title:'Bienvenue sur Hexagonia', time:'1 min', cls:'hx-title',
  html:`
  <div class="split">
    <div>
      <span class="pixel hx-level">NIVEAU 4 · NOUVELLE ZONE DÉBLOQUÉE</span>
      <img class="hx-logo" src="${A}logo.webp" alt="Hexagonia – Plan your escape">
      <p class="lead">Un équipage échoué sur une planète inconnue. Un vaisseau à réparer. Et pour vous : <b>une heure et demie de jeu en équipe</b>.</p>
    </div>
    <div class="card hx-goals">
      <h3>Comment on va procéder</h3>
      <ul class="clean">
        <li><b>2 minutes</b> de présentation, pas plus.</li>
        <li>On joue <b>par étapes</b>, avec des consignes courtes.</li>
        <li>Après chaque étape : <b>débriefing flash</b>.</li>
        <li>Les explications arrivent <b>après</b> avoir joué, jamais avant.</li>
      </ul>
    </div>
  </div>`,
  notes:`<h4>Intention</h4><p>On ne dévoile pas le jeu : les participants le découvrent en jouant, comme le feront leurs publics. Les explications (phases, ressources, score, personnages) arrivent dans les débriefings.</p>
  <h4>À dire</h4><p>« Je ne vais pas vous expliquer le jeu. Vous allez le découvrir, et c’est justement ce qui nous intéresse : <b>comment on apprend un jeu qu’on ne connaît pas</b>. »</p>`
});

/* ---------- M4-02 : le pitch ---------- */
Deck.slide({
  id:'M4-02', title:'Le pitch', kicker:'Présentation express', time:'2 min',
  html:`
  <div class="split" style="grid-template-columns:1fr 1fr">
    <div>
      <h2>Le pitch</h2>
      <p>Lors d’un atterrissage forcé, le vaisseau s’écrase. L’équipage, cryogénisé, est dispersé sur la planète.</p>
      <p>Votre mission : <span class="hl">retrouver l’équipage</span>, <span class="hl">réparer le vaisseau</span> et <span class="hl">repartir</span>.</p>
      <p class="muted">C’est tout ce que vous devez savoir. 😉</p>
    </div>
    <div>
      <img class="hx-shot short" src="${A}menu.webp" alt="Écran d’accueil d’Hexagonia">
      <div class="hx-id-mini">
        <span>🇧🇪 Jeu belge gratuit</span><span>💻 PC · iPad · Android</span><span>📴 Joue hors ligne</span>
      </div>
      <p class="small muted" style="margin-top:8px">Maracas Studio · Technobel · plan de relance de la Wallonie · <a href="https://hexagonia.be" target="_blank" rel="noopener">hexagonia.be</a></p>
    </div>
  </div>`,
  notes:`<p>Rester bref : le reste de la carte d’identité (public visé, ressources pédagogiques, chatbot…) est présenté à la fin du niveau 5, une fois que le jeu a été vécu.</p>`
});

/* ---------- M4-03 : comment on joue ---------- */
Deck.slide({
  id:'M4-03', title:'Jouer : le minimum vital', kicker:'Prise en main', time:'2 min',
  html:`
  <h2>Le minimum vital pour démarrer</h2>
  <div class="hx-gestures hx-gest-img">
    <div class="card"><div class="hx-gimg"><img src="${A}ui/ui-membre.webp" alt="Portrait d’un membre d’équipage"></div><h3>1. Sélectionner</h3><p>Cliquez sur le portrait d’un membre de l’équipage.</p></div>
    <div class="card"><div class="hx-gimg wide"><img src="${A}ui/ui-cases.webp" alt="Cases hexagonales de la carte"></div><h3>2. Choisir</h3><p>Cliquez sur une case hexagonale et choisissez une action.</p></div>
    <div class="card"><div class="hx-gimg"><img src="${A}ui/ui-lancer.webp" alt="Bouton lancer la journée"></div><h3>3. Lancer</h3><p>Appuyez sur le grand bouton… et regardez ce qui se passe.</p></div>
  </div>
  <div class="callout">Le reste ? <b>Le tutoriel vous l’apprendra.</b> Testez, trompez-vous, recommencez. On en parlera après.</div>`,
  notes:`<p>Ne pas en dire plus, ni la nourriture, ni le score écologique, ni la durée de la journée. Ce sont les « découvertes » qui alimenteront le débriefing flash.</p>
  <p>Déplacer la vue en glissant. Zoomer avec la molette (PC) ou en pinçant (tablette). À ne mentionner que si un groupe bloque.</p>`
});

/* ---------- M4-04 : équipes & rôles ---------- */
const ROLES = [
  ['🕹️','Pilote','Seul·e à toucher la souris ou l’écran. Exécute le plan de l’équipe.'],
  ['🧠','Stratège','Propose le plan de la journée et l’annonce à voix haute.'],
  ['🔍','Observateur·rice','Ne joue pas : remplit la grille d’observation.']
];
Deck.slide({
  id:'M4-04', title:'Équipes & rôles', kicker:'S’organiser', time:'3 min',
  html:`
  <h2>Formez votre équipage</h2>
  <div class="grid g3">${ROLES.map(([i,n,d])=>`<div class="card hx-role"><span class="hx-big">${i}</span><h3>${n}</h3><p class="small">${d}</p></div>`).join('')}</div>
  <div class="hx-draw">
    <div class="field" style="flex:1"><label>Prénoms de l’équipe (séparés par des virgules)</label><textarea rows="1" data-store="m5:team" placeholder="Ex. : Anne, Karim, Lou"></textarea></div>
    <button class="btn" id="drawRoles">🎲 Tirer les rôles au sort</button>
  </div>
  <div class="hx-draw-out" id="drawOut"></div>
  <div class="callout small">🔁 <b>On tourne les rôles à chaque nouvelle journée de jeu.</b> À deux par poste : pas d’observateur, le Stratège observe aussi.</div>`,
  onEnter(root){
    root.querySelector('#drawRoles').addEventListener('click',e=>{
      e.stopPropagation();
      const names = root.querySelector('[data-store="m5:team"]').value.split(',').map(s=>s.trim()).filter(Boolean);
      const out = root.querySelector('#drawOut');
      if(!names.length){ out.innerHTML='<span class="muted">Ajoutez d’abord les prénoms de l’équipe.</span>'; return; }
      const sh = names.map(n=>[Math.random(),n]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]);
      const roles = sh.length>=3 ? ROLES : [ROLES[0],ROLES[1]];
      out.innerHTML = sh.map((n,i)=>{ const r=roles[i%roles.length]; return `<span class="hx-draw-pill">${r[0]} <b>${n}</b> · ${r[1]}</span>`; }).join('');
    });
  },
  notes:`<h4>Organisation</h4><p>5 à 7 postes (PC ou iPad), 2 ou 3 personnes par poste. Hexagonia installé et lancé à l’avance, sur l’écran d’accueil.</p>
  <h4>Pourquoi des rôles ?</h4><p>Ils rendent visibles les dynamiques de groupe (comme l’escape game du matin) et évitent qu’une seule personne monopolise la souris.</p>`
});

/* ---------- M4-05 : grille d'observation (modèle Pico Park) ---------- */
const OBS = ['L’équipe se met d’accord avant de lancer la journée','Quelqu’un propose une priorité','Le travail est réparti entre les membres de l’équipage',
  'La stratégie change après une journée ratée','Une erreur est commentée sans reproche','Chaque joueur·se prend la parole','Le Pilote attend l’avis de l’équipe avant de cliquer','L’équipe observe la carte avant de planifier'];
const FREQ = ['Rarement','Parfois','Souvent'];
Deck.slide({
  id:'M4-05', title:'Grille d’observation', kicker:'Pour l’observateur·rice', time:'1 min',
  html:`
  <div class="split" style="grid-template-columns:1.35fr .65fr;align-items:start">
    <div>
      <h2>Grille de l’observateur·rice</h2>
      <div class="pp-grid">
        <div class="pp-gh"><span>Comportement observé</span>${FREQ.map(f=>`<span>${f}</span>`).join('')}</div>
        ${OBS.map((g,i)=>`<div class="pp-gr" data-i="${i}"><span>${g}</span>${FREQ.map((f,j)=>`<button data-v="${j}" aria-label="${f}"></button>`).join('')}</div>`).join('')}
      </div>
    </div>
    <div class="grid" style="gap:12px">
      <div class="card"><h3>L’ambiance, en un coup d’œil</h3><div class="pp-mood">${[['tendue','😣','Tendue'],['correcte','🙂','Correcte'],['joyeuse','😄','Joyeuse']].map(([k,e,n])=>`<button data-m="${k}"><span>${e}</span>${n}</button>`).join('')}</div></div>
      <div class="field"><label>Un moment clé à raconter</label><textarea rows="3" data-store="m5:obs:moment"></textarea></div>
      <div class="field"><label>Une décision qui n’a pas marché</label><textarea rows="3" data-store="m5:obs:rate"></textarea></div>
      <div class="hx-btnrow no-print"><a class="btn alt" href="assets/fiches/grille-hexagonia.pdf" download>📄 Fiche PDF</a><button class="btn alt" id="hxObsReset">↺ Vider</button></div>
    </div>
  </div>`,
  onEnter(root, api){
    let g=api.store.get('m5:grille',{}), mood=api.store.get('m5:mood','');
    const draw=()=>{ root.querySelectorAll('.pp-gr').forEach(r=>r.querySelectorAll('button').forEach(b=>b.classList.toggle('on', String(g[r.dataset.i])===b.dataset.v)));
      root.querySelectorAll('.pp-mood button').forEach(b=>b.classList.toggle('on', b.dataset.m===mood)); };
    root.querySelectorAll('.pp-gr button').forEach(b=>b.addEventListener('click',e=>{ e.stopPropagation(); const i=b.closest('.pp-gr').dataset.i; if(g[i]===+b.dataset.v) delete g[i]; else g[i]=+b.dataset.v; api.store.set('m5:grille',g); draw(); }));
    root.querySelectorAll('.pp-mood button').forEach(b=>b.addEventListener('click',e=>{ e.stopPropagation(); mood = mood===b.dataset.m ? '' : b.dataset.m; api.store.set('m5:mood',mood); draw(); }));
    root.querySelector('#hxObsReset').addEventListener('click',e=>{ e.stopPropagation(); g={}; mood=''; api.store.set('m5:grille',g); api.store.set('m5:mood',''); root.querySelectorAll('textarea').forEach(t=>{t.value=''; api.store.set('txt:'+t.dataset.store,'');}); draw(); });
    draw();
  },
  notes:`<p>Même grille que pour Pico Park. L’observateur·rice note des <b>comportements</b>, jamais des personnes. Elle sert pendant <b>toutes les étapes</b> et alimente le grand débriefing (niveau 5).</p>
  <p>Astuce, laisser cette slide ouverte sur le poste de l’observateur·rice, ou imprimer la grille.</p>`
});

/* ---------- M4-06 : étape 1 ---------- */
Deck.slide({
  id:'M4-06', title:'Étape 1 : l’atterrissage', kicker:'Jouer', time:'12 min',
  html: mission({
    step:'ÉTAPE 1 / 3 · ZONES 01 → 03',
    title:'L’atterrissage',
    goal:'Terminer le tutoriel et sauver votre premier coéquipier.',
    todo:[
      'Cliquez sur <b>Nouvelle partie</b>.',
      'Cochez la case <b>Tutoriel</b>.',
      'Suivez les indications du jeu.',
      'Enchaînez les zones <b>01, 02 puis 03</b>.'
    ],
    rule:'Avant chaque « Lancer », le Stratège annonce le plan à voix haute.',
    zones:[1,2,3],
    watch:['Que se passe-t-il quand la journée se termine ?','Qu’est-ce qui vous a obligés à recommencer ou à changer de plan ?'],
    done:'Continuez dans la zone suivante.',
    min:12
  }),
  notes:`<h4>Posture</h4><p>Circuler sans prendre la souris. Répondre aux questions par une question : « Qu’est-ce que le jeu vous montre ? »</p>
  <h4>À ne pas dire</h4><p>Ne pas expliquer la nourriture, la fin de journée ou les transformations : ce sont les découvertes du débriefing.</p>
  <h4>Équipes à des rythmes différents ?</h4><p>Aucun problème : chaque équipe garde sa partie et reprend là où elle s’est arrêtée à l’étape suivante.</p>`
});

/* ---------- M4-07 : débrief flash 1 ---------- */
Deck.slide({
  id:'M4-07', title:'Débrief flash 1', kicker:'Débriefer', time:'5 min',
  html: flash({
    step:'DÉBRIEF FLASH · ÉTAPE 1',
    title:'Qu’avez-vous compris… tout seuls ?',
    questions:[
      'Comment se déroule une journée sur Hexagonia ?',
      'Qu’est-ce qui vous a surpris ?',
      'Comment avez-vous appris à jouer : en lisant, en essayant, en regardant les autres ?'
    ],
    revealTag:'RÉVÉLATION · UNE JOURNÉE EN 3 TEMPS',
    reveal:`
      <div class="hx-3t">
        <div><span class="hx-big">🌅</span><b>Matin · Planifier</b><span class="small">On choisit les tâches de chaque membre et leur ordre.</span></div>
        <div><span class="hx-big">☀️</span><b>Journée · Résoudre</b><span class="small">Le plan s’exécute. On ne peut plus intervenir : on observe.</span></div>
        <div><span class="hx-big">🌙</span><b>Soir · Faire le bilan</b><span class="small">Progression, objectifs… et chaque membre doit manger.</span></div>
      </div>
      <div class="callout small">💡 Planifier → agir → évaluer → ajuster : c’est aussi <b>la boucle d’un bon atelier EPN</b>.</div>`
  }),
  notes:`<h4>Déroulé</h4><ul><li>2 min : tour rapide des équipes sur les questions.</li><li>Flèche → pour révéler la synthèse, qu’on construit à partir de leurs mots.</li><li>1 min : souligner la 3e question. Personne n’a lu de règles, et tout le monde joue : <b>c’est la force du tutoriel intégré</b>.</li></ul>
  <h4>Si la question de la nourriture n’est pas venue</h4><p>Demander : « Avez-vous regardé le rapport du soir ? Que dit-il ? »</p>`
});
})();
