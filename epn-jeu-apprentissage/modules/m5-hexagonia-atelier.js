/* =========================================================
   M5 — Hexagonia : jouer par étapes & débriefer (≈ 60 min)
   Étape 2 (zones 04-05) → flash → Étape 3 (zones 06-07)
   [+ étape bonus 08-09 pour les équipes rapides] → flash →
   grand débriefing → transfert EPN → recette pour le niveau 6.
   ========================================================= */
(function(){
const {A, el, zone, mission, flash} = HX;
Deck.module({ id:'M5', title:'Hexagonia : jouer & débriefer' });

/* ---------- M5-01 : ouverture ---------- */
const STEPS = [['3′','Anticiper','📝'],['12′','Étape 2','🚀'],['5′','Flash 2','💬'],['10′','Étape 3','🌱'],['5′','Flash 3','💬'],['25′','Débriefer & transposer','🔁']];
Deck.slide({
  id:'M5-01', title:'On continue la mission', time:'1 min', cls:'hx-title',
  html:`
  <span class="pixel hx-level">NIVEAU 5 · LA MISSION CONTINUE</span>
  <h1 style="font-size:54px;margin:8px 0 10px">Jouer. Observer. <span class="hl">Débriefer.</span></h1>
  <p class="lead">Deux nouvelles étapes de jeu, puis on prend du recul pour voir ce que tout ça change dans vos EPN.</p>
  <div class="hx-timeline">${STEPS.map(([t,n,i])=>`<div><span class="hx-tl-ico">${i}</span><b>${n}</b></div>`).join('')}</div>
  <div class="callout">🎯 Le but n’est pas de « finir le jeu », mais de <b>repérer ce qu’on mobilise en jouant</b>.</div>`,
  notes:`<p>Chaque équipe reprend sa partie là où elle s’était arrêtée (bouton <b>Continuer</b>). Pas besoin que tout le monde soit au même endroit.</p>`
});

/* ---------- M5-02 : anticiper ---------- */
Deck.slide({
  id:'M5-02', title:'Carnet de bord : anticiper', kicker:'Avant de jouer', time:'3 min',
  html:`
  <div class="split" style="grid-template-columns:.8fr 1.2fr;align-items:start">
    <div>
      <span class="pixel hx-level">CARNET DE BORD</span>
      <h2>Regardez avant d’agir</h2>
      <ol class="hx-steps small-steps">
        <li>Ouvrez la <b>zone 04</b>, la Grotte des Ombres.</li>
        <li><b>Ne planifiez rien</b>. Explorez la carte du jour 1.</li>
        <li>Répondez ensemble aux trois questions.</li>
      </ol>
      <div class="hx-z4">${zone(4)}</div>
      <p class="small muted">Vous ferez la même chose au début de chaque nouvelle zone, à l’oral.</p>
    </div>
    <div class="grid" style="gap:10px">
      <div class="field"><label>1. Que faut-il faire pour terminer la zone 04 ?</label><textarea rows="2" data-store="m5:c1"></textarea></div>
      <div class="field"><label>2. Que voyez-vous sur la carte que vous ne connaissez pas encore ?</label><textarea rows="2" data-store="m5:c2"></textarea></div>
      <div class="field"><label>3. Votre plan pour les deux premiers jours ?</label><textarea rows="3" data-store="m5:c3"></textarea></div>
      <div class="hx-btnrow no-print"><button class="btn alt" data-print>🖨 Imprimer</button><button class="btn alt" data-reset="txt:m5:c">↺ Vider</button></div>
    </div>
  </div>`,
  notes:`<h4>Source</h4><p>Adapté de la fiche outil 02 « Carnet de bord » du carnet d’activités Technobel.</p>
  <h4>Variante accessible</h4><p>Écrire peut être un frein : accepter la dictée vocale, des mots-clés ou une réponse orale.</p>`
});

/* ---------- M5-03 : étape 2 ---------- */
const DEFIS = [
  ['🤐','Radio silence','Le Pilote n’a pas le droit de parler : il ne fait qu’exécuter.'],
  ['⏳','Zéro temps mort','Aucun membre ne doit finir une journée sans tâche.'],
  ['🍎','Garde-manger plein','Terminer la zone avec au moins 4 fruits en réserve.'],
  ['🏁','Mission éclair','Terminer la zone en un minimum de journées.']
];
Deck.slide({
  id:'M5-03', title:'Étape 2 : à deux, c’est mieux ?', kicker:'Jouer', time:'12 min',
  html: mission({
    step:'ÉTAPE 2 / 3 · ZONES 04 → 05',
    title:'À deux, c’est mieux ?',
    goal:'Un deuxième membre rejoint l’équipage. Terminez les zones 04 et 05.',
    todo:[
      'Cliquez sur <b>Continuer</b>.',
      'Piochez une <b>carte défi</b> ci-dessous et respectez-la.',
      'Au début de chaque zone : <b>observez avant de planifier</b>.',
      'Tournez les rôles à chaque nouvelle journée.'
    ],
    rule:'<span id="defiOut" class="hx-defi-inline"><button class="btn" id="drawDefi">🃏 Piocher une carte défi</button></span>',
    zones:[4,5],
    watch:['Comment répartissez-vous le travail entre les deux membres ?','Votre carte défi change-t-elle votre façon de jouer ?'],
    done:'Continuez vers la zone 06.',
    min:12
  }),
  onEnter(root){
    const box=root.querySelector('#defiOut');
    const draw=e=>{ e.stopPropagation(); const d=DEFIS[Math.floor(Math.random()*DEFIS.length)];
      box.innerHTML=`<span class="hx-defi-card pop"><span class="hx-big">${d[0]}</span><span><b>${d[1]}</b><br>${d[2]}</span><span class="hx-defi-btns"><button class="hx-redraw" title="Repiocher">↻</button><button class="hx-hide" title="Masquer la carte">✕</button></span></span>`;
      box.querySelector('.hx-redraw').addEventListener('click',draw);
      box.querySelector('.hx-hide').addEventListener('click',hide); };
    const hide=e=>{ e.stopPropagation(); box.innerHTML='<button class="btn" id="drawDefi">🃏 Piocher une carte défi</button>'; box.querySelector('#drawDefi').addEventListener('click',draw); };
    root.querySelector('#drawDefi').addEventListener('click',draw);
  },
  notes:`<h4>La carte défi</h4><p>C’est de la gamification <b>dans</b> le jeu : une règle ajoutée change la dynamique du groupe sans toucher au logiciel. Une carte par équipe (↻ pour l’équipe suivante, ✕ pour masquer la carte).</p>
  <h4>Équipe en retard ?</h4><p>Elle termine l’étape 1 puis enchaîne : l’important est de vivre au moins une zone avec deux personnages.</p>
  <h4>Équipe frustrée ?</h4><p>Menu pause → code 3 1 4 1 5 → menu de triche → ajouter de la nourriture (option sans risque).</p>`
});

/* ---------- M5-04 : débrief flash 2 → ressources ---------- */
const CHAINS = [
  {name:'Le bois', steps:[['arbre','Arbre','Son tronc est un excellent matériau. Le couper fait beaucoup baisser le score écologique.','eco--'],
    ['buche','Bûche','Peut être transformée en planches.'],['convertiflore','Convertiflore','Plante qui transforme les ressources déposées (avec un délai).'],
    ['planches','Planches','Pour construire un pont.'],['pont','Pont','Permet de franchir un cours d’eau.']]},
  {name:'La pierre', steps:[['rocher','Rocher friable','Peut être détruit pour obtenir de la pierre. Fait légèrement baisser le score écologique.','eco-'],
    ['pierre','Pierre brute','Peut être transformée en briques.'],['convertiflore','Convertiflore','Pierre brute → briques.'],
    ['briques','Briques','Pour construire un escalier.'],['escalier','Escalier','Permet de franchir un versant constructible.']]},
  {name:'La nourriture', steps:[['fruit','Fruits','Un fruit nourrit une personne pour une journée. À rapporter au vaisseau.'],
    ['convertiflore','Convertiflore','Fruit → graine de fruit.'],['graine-fruit','Graine','À planter sur une terre fertile, puis à arroser.','eco++'],
    ['eau','Cours d’eau','On y prend de l’eau, gardée toute la journée : de quoi arroser plusieurs plantes.'],['plante-fruits','Plante à fruits','Un fruit de plus pousse chaque jour, jusqu’à trois.']]}
];
Deck.slide({
  id:'M5-04', title:'Débrief flash 2', kicker:'Débriefer', time:'5 min',
  html: flash({
    step:'DÉBRIEF FLASH · ÉTAPE 2',
    title:'Deux membres, un plan',
    questions:[
      'Comment vous êtes-vous réparti le travail ?',
      'Avez-vous dû changer de plan en cours de route ? Pourquoi ?',
      'Carte défi : réussie ? Qu’a-t-elle changé dans l’équipe ?'
    ],
    revealTag:'RÉVÉLATION · RÉCOLTER, TRANSFORMER, CONSTRUIRE',
    reveal:`
      <div class="hx-chains compact">
        ${CHAINS.map(c=>`<div class="hx-chain"><span class="hx-chain-name">${c.name}</span>
          ${c.steps.map(([k,n,d,e],i)=>`${i?'<span class="hx-arrow">➜</span>':''}<button class="hx-item" data-name="${n}" data-desc="${d}" data-eco="${e||''}">${el(k,n)}<span>${n}</span></button>`).join('')}
        </div>`).join('')}
      </div>
      <div class="hx-info"><span class="muted">👆 Cliquez sur un élément pour l’examiner.</span></div>`
  }),
  onEnter(root){
    const info = root.querySelector('.hx-info');
    const ECO = {'eco--':'<span class="eco bad">🌍 −− score</span>','eco-':'<span class="eco bad">🌍 − score</span>','eco++':'<span class="eco good">🌍 ++ score</span>'};
    root.querySelectorAll('.hx-item').forEach(b=>b.addEventListener('click',e=>{
      e.stopPropagation();
      const was=b.classList.contains('on');
      root.querySelectorAll('.hx-item').forEach(x=>x.classList.remove('on'));
      if(was){ info.innerHTML='<span class="muted">Cliquez sur un élément pour l’examiner.</span>'; return; }
      b.classList.add('on');
      info.innerHTML = `<b>${b.dataset.name}</b> — ${b.dataset.desc} ${ECO[b.dataset.eco]||''}`;
    }));
  },
  notes:`<h4>Déroulé</h4><p>Faire parler les équipes, puis révéler les chaînes de transformation en demandant : « Lesquelles avez-vous découvertes ? Lesquelles pas encore ? »</p>
  <h4>Astuces que le jeu ne dit pas</h4><ul><li>Un membre qui a pris de l’eau nettoie tout un groupe de flaques d’huile d’un coup.</li><li>Pas de graine dans la zone ? Fruit → Convertiflore → graine.</li></ul>`
});

/* ---------- M5-05 : étape 3 ---------- */
Deck.slide({
  id:'M5-05', title:'Étape 3 : la planète vous observe', kicker:'Jouer', time:'10 min',
  html: mission({
    step:'ÉTAPE 3 / 3 · ZONES 06 → 07',
    title:'La planète vous observe',
    goal:'Terminez les zones 06 et 07… en prenant soin de la planète.',
    todo:[
      'Notez le <b>chiffre en haut à gauche</b> au début de la zone.',
      'Jouez la zone en essayant de le <b>faire monter</b>.',
      'Comparez le chiffre en fin de zone.',
      'Toujours : observer avant de planifier, rôles tournants.'
    ],
    rule:'Défi collectif : finir avec un score plus élevé qu’au départ.',
    zones:[6,7],
    watch:['Quelles actions font bouger ce chiffre ?','Avez-vous dû renoncer à une action « efficace » ?'],
    done:'Passez à l’<b>étape bonus</b> (zones 08 → 09).',
    min:10
  }),
  notes:`<p>On ne dit pas que c’est le score écologique : les équipes le déduisent. C’est l’objet du débrief flash 3.</p>
  <h4>Équipes plus lentes</h4><p>Elles restent sur l’étape 2 : ce n’est pas grave, la consigne d’observation du chiffre fonctionne dans n’importe quelle zone.</p>`
});

/* ---------- M5-06 : étape bonus ---------- */
Deck.slide({
  id:'M5-06', title:'Étape bonus : l’équipe s’agrandit', kicker:'Équipes rapides', time:'(pendant l’étape 3)',
  html: mission({
    step:'ÉTAPE BONUS · ZONES 08 → 09',
    title:'L’équipe s’agrandit',
    goal:'Un troisième membre vous attend. Et cette fois, il y a plusieurs objectifs.',
    todo:[
      'Repérez <b>ce que chaque membre fait mieux que les autres</b>.',
      'Confiez-lui les tâches qui lui correspondent.',
      'Le Stratège doit justifier chaque attribution.'
    ],
    rule:'Une phrase obligatoire avant « Lancer » : « J’envoie … parce que … ».',
    zones:[8,9],
    watch:['Les membres de l’équipage ont-ils tous les mêmes capacités ?'],
    done:'Bravo, vous êtes en avance sur la mission ! Continuez librement.',
    min:10
  }),
  notes:`<p>Slide à laisser affichée sur un second écran ou à montrer aux équipes rapides uniquement. Elle prépare la révélation sur l’équipage.</p>`
});

/* ---------- M5-07 : débrief flash 3 → score écologique ---------- */
Deck.slide({
  id:'M5-07', title:'Débrief flash 3', kicker:'Débriefer', time:'5 min',
  html: flash({
    step:'DÉBRIEF FLASH · ÉTAPE 3',
    title:'Ce chiffre en haut à gauche…',
    questions:[
      'Qu’est-ce qui faisait monter ou descendre le chiffre ?',
      'Avez-vous renoncé à une action « efficace » pour le préserver ?',
      'Et dans la vraie vie, quels choix fonctionnent comme ça ?'
    ],
    revealTag:'RÉVÉLATION · LE SCORE ÉCOLOGIQUE',
    reveal:`
      <div class="grid g2" style="gap:14px;align-items:start">
        <table class="hx-eco-table">
          <tr><td>${el('arbre','Arbre')}</td><td>Couper un arbre</td><td class="bad">−−</td></tr>
          <tr><td>${el('rocher','Rocher')}</td><td>Détruire un rocher</td><td class="bad">−</td></tr>
          <tr><td><img src="${A}vaisseau.webp" alt="Vaisseau"></td><td>Atterrir dans une zone</td><td class="bad">−</td></tr>
          <tr><td>${el('huile','Huile')}</td><td>Nettoyer de l’huile</td><td class="good">+</td></tr>
          <tr><td>${el('graine-arbre','Graine')}</td><td>Planter un arbre</td><td class="good">++</td></tr>
        </table>
        <div class="hx-eco-sim">
          <input type="range" min="-26" max="6" value="2" class="ecoRange" aria-label="Score écologique">
          <div class="hx-eco-val"><span class="ecoVal">+2</span></div>
          <p class="hx-eco-txt ecoTxt"></p>
        </div>
      </div>`
  }),
  onEnter(root){
    const r=root.querySelector('.ecoRange'), v=root.querySelector('.ecoVal'), t=root.querySelector('.ecoTxt');
    const draw=()=>{ const n=+r.value; v.textContent=(n>0?'+':'')+n;
      const [msg,cls] = n<=-24?['☠️ Plus rien ne pousse : plus aucun fruit.','bad']
        : n<=-19?['🥀 Plantes plus lentes, un seul fruit par plante.','bad']
        : n<=-9 ?['🐌 Les plantes poussent moins vite.','warn']
        : n<=-3 ?['🍂 Moins de fruits disponibles.','warn']
        : ['🌿 Écosystème en équilibre.','good'];
      t.textContent=msg; t.className='hx-eco-txt ecoTxt '+cls; };
    r.addEventListener('input',draw); r.addEventListener('keydown',e=>e.stopPropagation()); draw();
  },
  notes:`<h4>Message clé</h4><p>Le jeu ne punit pas tout de suite : il installe des <b>conséquences à long terme</b>. On peut abîmer la planète quelques jours… puis la nourriture manque.</p>
  <h4>Paliers (guide professeur)</h4><p>−3 : moins de fruits · −9 : plantes plus lentes · −19 : un seul fruit · −24 : plus rien ne pousse.</p>
  <p>La 3e question ouvre sur la sobriété numérique ou la gestion d’un budget : à garder pour le transfert.</p>`
});

/* ---------- M5-08 : l'équipage ---------- */
const CREW = [
  ['lucia','Lucia','Mécanicienne','Prévoyance, prudence','Gérer l’incertitude et les changements','Termine toujours sa tâche en cours à la fin de la journée (sauf transport).'],
  ['alex','Alex','Infirmier','Courage','Travailler en groupe','Donne un boost de vitesse temporaire aux membres qu’il croise.'],
  ['nala','Nala','Conceptrice d’interfaces','Honnêteté','Créativité artistique','Construit deux fois plus vite.'],
  ['amir','Amir','Roboticien','Générosité','Expérimentation','Extrait le bois et la roche deux fois plus vite.'],
  ['sasha','Sasha','Électricienne','Confiance, calme','Conscience des enjeux environnementaux','Porte plus vite les cellules d’énergie.'],
  ['nico','Nico','Architecte','Humilité','Esprit critique','La Convertiflore transforme deux fois plus vite quand il l’utilise.'],
  ['mei','Mei','Programmeuse','Empathie','Gestion de projet','Plus rapide quand elle enchaîne des tâches du même type.']
];
Deck.slide({
  id:'M5-08', title:'Révélation : l’équipage', kicker:'Révélation', time:'3 min',
  html:`
  <h2>Sept profils, sept super-pouvoirs</h2>
  <div class="hx-crew">
    ${CREW.map(([k,n,m,q,s,p])=>`<button class="flip hx-card"><div class="flip-in">
      <div class="flip-face hx-front"><img src="${A}equipage/${k}.webp" alt="${n}"><b>${n}</b><span>${m}</span></div>
      <div class="flip-face flip-back hx-back"><b>${n}</b><span class="tag">QUALITÉ</span><p>${q}</p><span class="tag">COMPÉTENCE STEAM</span><p>${s}</p><span class="tag">EN JEU</span><p>${p}</p></div>
    </div></button>`).join('')}
  </div>
  <p class="small muted" style="margin-top:12px">👆 Cliquez pour retourner. Avez-vous remarqué ces différences en jouant ? Femmes et hommes, profils variés : le jeu casse les stéréotypes sur les métiers STEAM.</p>`,
  notes:`<h4>À demander d’abord</h4><p>« Vos membres d’équipage avaient-ils tous les mêmes capacités ? » Les équipes de l’étape bonus ont la réponse.</p>
  <h4>Pourquoi c’est puissant</h4><p>Les spécialités obligent à <b>répartir selon les forces de chacun</b> : c’est la coopération rendue visible. Parallèle direct avec un groupe hétérogène en EPN.</p>
  <p>Plus loin dans le jeu, deux membres doivent rester au vaisseau : on choisit chaque matin qui sort.</p>`
});

/* ---------- M5-09 : quiz (optionnel) ---------- */
const Q = [
  ['Il faut construire un pont au plus vite.','nala','Nala construit deux fois plus vite.'],
  ['La zone est couverte de rochers à casser.','amir','Amir extrait bois et roche deux fois plus vite.'],
  ['Une longue tâche risque d’être coupée par la fin de journée.','lucia','Lucia termine toujours sa tâche en cours.'],
  ['Trois cellules d’énergie à rapporter.','sasha','Sasha porte plus vite les pièces du vaisseau.'],
  ['La Convertiflore tourne à plein régime.','nico','Avec Nico, la Convertiflore va deux fois plus vite.']
];
Deck.slide({
  id:'M5-09', title:'Qui envoies-tu en mission ?', kicker:'Optionnel', time:'2 min',
  html:`
  <h2>Qui envoies-tu en mission ?</h2>
  <div data-quiz class="hx-quiz">
    ${Q.map(([sit,ans,why],i)=>`<div class="q card" data-answer="${ans}" data-ok="✅ ${why}">
      <p><b>${i+1}.</b> ${sit}</p>
      <div class="quiz-opts">${CREW.map(([k,n])=>`<button data-v="${k}"><img src="${A}equipage/${k}.webp" alt="">${n}</button>`).join('')}</div>
      <div class="quiz-fb"></div></div>`).join('')}
  </div>`,
  notes:`<p>Slide optionnelle, selon le temps : à main levée avec tout le groupe. On refait exactement ce que le jeu demande chaque matin : <b>associer une tâche à la bonne personne</b>.</p>`
});

/* ---------- M5-10 : grand débriefing ---------- */
Deck.slide({
  id:'M5-10', title:'Le grand débriefing', kicker:'Débriefer', time:'7 min',
  html:`
  <h2>Débriefer en trois temps</h2>
  <div class="grid g3 hx-debrief">
    <div class="card"><span class="hx-num">1</span><h3>Décrire</h3><p class="small">Qu’est-ce qui s’est passé ?</p><ul class="clean small hx-tight"><li>Une stratégie qui a marché.</li><li>Une erreur que vous avez corrigée.</li><li>Que dit la grille de l’observateur·rice ?</li></ul></div>
    <div class="card" data-step><span class="hx-num">2</span><h3>Analyser</h3><p class="small">Pourquoi ça s’est passé ainsi ?</p><ul class="clean small hx-tight"><li>Quel rôle avez-vous préféré ? Pourquoi ?</li><li>Une décision ratée : qu’est-ce qui l’expliquait ?</li><li>Qu’est-ce qui a changé avec la carte défi ?</li></ul></div>
    <div class="card" data-step><span class="hx-num">3</span><h3>Transférer</h3><p class="small">Et chez moi, en EPN ?</p><ul class="clean small hx-tight"><li>Quelles compétences avez-vous mobilisées ?</li><li>Dans quel atelier en a-t-on besoin ?</li><li>Que changeriez-vous si c’était à refaire ?</li></ul></div>
  </div>
  <div class="callout">🤝 Règle d’or : <b>on parle des décisions, jamais des personnes.</b> Une stratégie ratée est une donnée, pas une faute.</div>`,
  notes:`<h4>Déroulé</h4><ul><li>3 min : chaque équipe partage une stratégie qui a marché et une erreur corrigée (les observateurs ont la parole en premier).</li><li>3 min : analyse collective.</li><li>2 min : premières pistes de transfert.</li></ul>
  <h4>Posture</h4><p>Valoriser les essais ratés : c’est là que l’apprentissage est le plus visible.</p>`
});

/* ---------- M5-11 : un vrai jeu ---------- */
Deck.slide({
  id:'M5-11', title:'Un vrai jeu, pas un exercice déguisé', kicker:'Prendre du recul', time:'1 min',
  html:`
  <h2>Avez-vous eu l’impression d’apprendre ?</h2>
  <div class="grid g2" style="align-items:start">
    <div>
      <blockquote class="hx-quote">« Le jeu, c’est la fiction du faire. »<cite>Oscar Barda, concepteur de jeux</cite></blockquote>
      <p>Pas de questionnaire caché, pas de leçon plaquée : les concepteurs sont restés <b>fidèles au jeu vidéo</b>.</p>
    </div>
    <div class="grid" style="gap:12px">
      <div class="card"><span class="tag">CE QUE VOUS AVEZ VÉCU</span><p>Vous avez appris à jouer sans lire de règles, par essais et erreurs, en équipe.</p></div>
      <div class="card acc"><span class="tag">CE QUE ÇA SIGNIFIE</span><p>Le jeu crée l’expérience. <b>C’est le débriefing qui la transforme en apprentissage.</b></p></div>
    </div>
  </div>`,
  notes:`<p>Rappeler la distinction du niveau 2 : Hexagonia est un <b>jeu</b> utilisé à des fins pédagogiques, pas une activité gamifiée.</p>
  <p>Question au groupe : « Avez-vous déjà utilisé un “jeu éducatif” qui n’était pas amusant ? Qu’est-ce qui coinçait ? »</p>`
});

/* ---------- M5-12 : mécaniques → compétences ---------- */
const MECA = [
  ['🌅','Planifier le matin','Anticipation, organisation, priorisation','Préparer sa démarche avant d’agir : lister les étapes pour envoyer un e-mail, remplir un formulaire en ligne…'],
  ['☀️','Observer sans intervenir','Observation, patience, acceptation de l’erreur','Laisser la personne aller au bout de son essai avant de corriger ; regarder ensemble ce qui s’est passé.'],
  ['🌙','Lire le bilan du soir','Analyse, esprit critique, auto-évaluation','Prendre 2 minutes en fin d’atelier : qu’est-ce qui a marché ? que change-t-on la prochaine fois ?'],
  ['🍎','Gérer des ressources limitées','Gestion du temps, raisonnement à long terme','Gérer son temps d’écran, son forfait, son espace de stockage, son budget en ligne.'],
  ['👩‍🚀','Répartir selon les spécialités','Coopération, communication, valorisation','Former des binômes complémentaires ; donner un rôle à chaque participant·e.'],
  ['🌍','Assumer un impact écologique','Responsabilité, citoyenneté','Ouvrir la discussion sur la sobriété numérique et l’impact de nos usages.'],
  ['🔁','Échouer sans « game over »','Persévérance, confiance en soi','Dédramatiser l’erreur : on recommence, avec un petit coup de pouce.']
];
Deck.slide({
  id:'M5-12', title:'Des mécaniques aux compétences', kicker:'Transférer', time:'4 min',
  html:`
  <h2>Ce que chaque mécanique fait travailler</h2>
  <div class="hx-meca">
    <div class="hx-meca-head"><span>Ce que vous avez vécu</span><span>Compétences mobilisées</span><span>Et dans votre EPN ?</span></div>
    ${MECA.map(([i,m,c,t])=>`<div class="hx-meca-row" data-step><b>${i} ${m}</b><span>${c}</span><span class="small">${t}</span></div>`).join('')}
  </div>
  <p class="reveal-hint no-print">→ pour révéler ligne par ligne</p>`,
  notes:`<p>Avant de révéler chaque ligne, demander : « Où avez-vous vécu ça pendant le jeu ? Et chez vous, où retrouve-t-on cette compétence ? »</p>
  <p>Dernière ligne : si une zone se termine sans nourriture, le jeu la fait recommencer avec quelques fruits bonus. L’échec devient une étape.</p>`
});

/* ---------- M5-13 : transposer par public ---------- */
const PUB = [
  ['jeunes','🧒 Jeunes',['Ajouter des <b>cartes défi</b> et un classement par équipe.','Faire <b>tourner les rôles</b> à chaque journée.','Prolonger avec la fiche 05 « Le patch de mission » du carnet Technobel. Chaque équipe crée l’<b>écusson de son équipage</b> dans Canva.']],
  ['seniors','👵 Seniors',['Privilégier l’<b>iPad</b> : le tactile est souvent plus intuitif que la souris.','<b>Allonger la durée de la journée</b> (menu de triche) pour réduire la pression. <button class="btn alt hx-howbtn" data-how>Comment faire ?</button>','Jouer en binôme : la personne décide, un pair ou l’animateur·rice pilote.']],
  ['debutants','🐣 Débutant·es du numérique',['Toujours commencer par le <b>tutoriel</b>.','Faire <b>observer une journée</b> avant de faire jouer.','Carnet de bord <b>oral</b> ou en dessins.']],
  ['fragiles','🫶 Publics fragilisés',['Pas de chrono, pas de classement : on valorise <b>chaque journée réussie</b>.','Ajouter de la nourriture si la frustration monte.','Insister : l’échec <b>n’entraîne pas de game over</b>.']],
  ['mixte','🧩 Groupes hétérogènes',['Utiliser les rôles comme <b>les spécialités des personnages</b>.','Associer un·e « expert·e du jeu » et un·e « expert·e de la stratégie ».','Débriefer sur la complémentarité, pas sur la performance.']]
];
Deck.slide({
  id:'M5-13', title:'Transposer dans votre EPN', kicker:'Adapter', time:'4 min',
  html:`
  <h2>Et avec vos publics ?</h2>
  <div data-tabs>
    <div class="tabs">${PUB.map(([k,n])=>`<button data-tab="${k}">${n}</button>`).join('')}</div>
    ${PUB.map(([k,n,l])=>`<div class="tab-panel" data-panel="${k}"><div class="card hx-pub"><ul class="clean">${l.map(x=>`<li>${x}</li>`).join('')}</ul></div></div>`).join('')}
  </div>
  <div class="field" style="margin-top:12px"><label>💡 Mon idée pour mon EPN</label><textarea rows="2" data-store="m5:idee" placeholder="Avec mon groupe du jeudi, je pourrais…"></textarea></div>
  <div class="hx-how" hidden>
    <div class="hx-how-in">
      <button class="hx-how-x" title="Fermer">✕</button>
      <h3>Allonger la durée de la journée</h3>
      <div class="hx-how-grid">
        <div class="hx-how-step"><span class="hx-num">1</span><p>Ouvrez le <b>menu pause</b> et tapez le code <b class="pixel">3 1 4 1 5</b>.</p><img src="${A}pause-triche.webp" alt="Menu pause avec le code et le bouton Menu de triche"></div>
        <div class="hx-how-step"><span class="hx-num">2</span><p>Cliquez sur <b>Menu de triche</b>, puis sur <b>+</b> à la ligne « Durée de la journée ».</p>
          <div class="hx-cheatmock">
            <div class="hx-cm-h">Menu de triche</div>
            <div class="hx-cm-r"><span>Nourriture</span><b>4</b><i>⭯</i><i>−</i><i>+</i></div>
            <div class="hx-cm-r on"><span>Durée de la journée</span><b>22</b><i>⭯</i><i>−</i><i class="hot">+</i></div>
            <div class="hx-cm-r"><span>Impact écologique</span><b>0</b><i>⭯</i><i>−</i><i>+</i></div>
          </div>
          <p class="small">22 secondes par défaut. Chaque clic sur + allonge la phase de résolution, ⭯ revient à 22 s.</p></div>
      </div>
    </div>
  </div>`,
  onEnter(root){
    const box=root.querySelector('.hx-how');
    root.querySelectorAll('[data-how]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation(); box.hidden=false;}));
    box.addEventListener('click',e=>{e.stopPropagation(); if(e.target===box||e.target.closest('.hx-how-x')) box.hidden=true;});
  },
  notes:`<p>Demander d’abord quel public les participants accueillent le plus, ouvrir cet onglet en premier, puis compléter avec leurs idées. Le champ « Mon idée » sert d’amorce pour l’atelier de conception du niveau 6.</p><p>Le menu de triche ne présente qu’une liste de valeurs avec ⭯, − et + (guide professeur, p. 26). L’illustration est une reconstitution simplifiée.</p>`
});

/* ---------- M5-14 : fiche technique ---------- */
Deck.slide({
  id:'M5-14', title:'Fiche technique pour votre EPN', kicker:'Mettre en place', time:'2 min',
  html:`
  <h2>Mettre Hexagonia en place chez vous</h2>
  <div class="grid g3" style="align-items:start">
    <div class="card"><span class="tag">INSTALLER</span>
      <ul class="clean small hx-tight">
        <li><b>PC</b> : télécharger le .zip, <b>extraire</b>, lancer <i>Hexagonia plan your escape.exe</i> (quitter : Alt + F4).</li>
        <li><b>iPad</b> : App Store, compte de la région belge.</li>
        <li>Tester chaque poste <b>la veille</b> : le jeu tourne ensuite hors ligne.</li>
      </ul></div>
    <div class="card"><span class="tag">SAUVEGARDES</span>
      <ul class="clean small hx-tight">
        <li><b>Nouvelle partie</b> écrase la sauvegarde existante.</li>
        <li>Cocher <b>Tutoriel</b> pour démarrer par les zones d’apprentissage.</li>
        <li>Le jeu sauvegarde <b>au début de chaque zone</b> : on reprend avec <b>Continuer</b>.</li>
      </ul></div>
    <div class="card acc"><span class="tag">MENU DE « TRICHE »</span>
      <div class="hx-cheat"><img src="${A}pause-triche.webp" alt="Menu pause"><div>
        <p class="small">Menu pause → code <b class="pixel">3 1 4 1 5</b> (π) → <i>Menu de triche</i>.</p>
        <p class="small">✅ Sans risque : <b>nourriture</b> et <b>impact écologique</b>.<br>⚠️ Les autres options peuvent provoquer des bugs.</p>
      </div></div>
      <p class="small">Un vrai outil de <b>différenciation</b> : allonger la journée (22 s par défaut) ou la raccourcir pour pimenter.</p></div>
  </div>`,
  notes:`<p>Les participants découvrent maintenant les coulisses qu’ils ont « subies » sans le savoir. Faire le lien avec les adaptations par public de la slide précédente.</p>`
});

/* ---------- M5-15 : aller plus loin ---------- */
const FICHES = [
  ['01','Des métiers pour tous','Imaginer les personnages avec une IA générative d’images, puis questionner les stéréotypes de genre.','45–90 min'],
  ['02','Carnet de bord','Anticiper, noter ses observations jour après jour, s’auto-évaluer.','15–45 min'],
  ['03','Les journalistes','Enquêter sur les métiers STEM, critiquer ses sources, générer un podcast avec NotebookLM.','45–90 min'],
  ['04','Centre de contrôle','Tester la résistance thermique de matériaux avec une micro:bit et des capteurs.','45–90 min'],
  ['05','Le patch de mission','Créer l’écusson de l’équipage dans Canva ou Polotno.','45–90 min']
];
Deck.slide({
  id:'M5-15', title:'Aller plus loin', kicker:'Ressources', time:'1 min',
  html:`
  <h2>Prolonger l’aventure</h2>
  <div class="grid" style="grid-template-columns:1.4fr .6fr;gap:22px;align-items:start">
    <div class="hx-fiches">${FICHES.map(([n,t,d,du])=>`<div class="hx-fiche"><span class="pixel">FICHE ${n}</span><div><b>${t}</b> <span class="tag">${du}</span><br><span class="small">${d}</span></div></div>`).join('')}</div>
    <div class="grid" style="gap:12px">
      <div class="card acc"><h3>📘 Carnet d’activités</h3><p class="small">Fiches outils de Technobel, alignées sur le référentiel FMTTN et le référentiel STEAM.</p></div>
      <div class="card"><h3>🤖 Chatbot « Guide Hexagonia »</h3><p class="small">Un assistant entraîné sur tous les niveaux pour débloquer un joueur.</p></div>
      <div class="card"><h3>🔗 hexagonia.be</h3><p class="small">Jeu, guide professeur et carnet à télécharger gratuitement.</p></div>
      <img src="${A}technobel.webp" alt="Technobel" style="width:170px;margin:4px auto 0;display:block">
    </div>
  </div>`,
  notes:`<p>Les fiches 04 (micro:bit) et 05 (Canva) font le pont avec d’autres formations du catalogue EPN. Pour aller plus loin : le <i>Manuel de pédagogie vidéoludique</i> (2023), gratuit sur educajeux.be.</p>`
});

/* ---------- M5-16 : progression ---------- */
const ZONES = [
  ['Atterrissage difficile',1,'Tutoriel : les phases du jeu et la récolte de nourriture.'],
  ['Rivière des Murmures',1,'Tutoriel : actions qui demandent plusieurs tours de planification.'],
  ['Oasis du Sauvetage','1+','Validation du tutoriel (pont, fruits) et découverte de l’huile à nettoyer.'],
  ['Grotte des Ombres',2,'Découverte de la pierre friable et du jeu à deux personnages.'],
  ['Plateaux de la Sérénité',2,'Validation des acquis et coordination des personnages.'],
  ['Jardin Fertile',2,'Découverte de l’agriculture : planter des graines d’arbre et les arroser.'],
  ['Plaines Fertiles','2+','Plusieurs arbres à faire pousser.'],
  ['Plateau Central',3,'Graines d’arbre et de fruit. Niveau très ouvert, premier avec deux objectifs.'],
  ['Bassin des Trois Rivières','3+','Toutes les mécaniques. Bien observer pour ne pas perdre de jours.'],
  ['Nid Rocheux',4,'Validation des acquis et jeu à quatre personnages.'],
  ['Terres Fragmentées','4+','Large niveau. Après le sauvetage de Sasha : cinq personnages.'],
  ['Nid des Eaux Vives',3,'Choix de départ entre plusieurs zones. Échange de personnages.'],
  ['Dédale des Plateaux','3+','Sauver Nico dès le premier jour rend l’équipe plus efficace.'],
  ['Quatre Échos',4,'Quatre sections similaires dont il faut échanger les ressources.'],
  ['Cascade des Fructueux','4+','Dense, pour cinq personnages. Planter des fruits est recommandé.'],
  ['Vallée des Adieux',5,'Niveau final spécial, pour cinq personnages.']
];
Deck.slide({
  id:'M5-16', title:'Une difficulté qui monte pas à pas', kicker:'Décoder la conception', time:'1 min',
  html:`
  <h2>Pourquoi vous avez appris sans lire de règles</h2>
  <div class="hx-zones">
    <div class="hx-zone-view">
      <img class="zImg" src="${A}niveaux/n00.webp" alt="">
      <div class="hx-zone-meta"><span class="pixel zNum">ZONE 01</span><h3 class="zName"></h3><p class="small zTxt"></p><span class="tag zCrew"></span></div>
    </div>
    <div class="hx-zone-strip">${ZONES.map((z,i)=>`<button data-z="${i}">${String(i+1).padStart(2,'0')}</button>`).join('')}</div>
  </div>
  <div class="callout small">🎓 Une seule nouveauté à la fois, puis une zone pour la valider : <b>c’est exactement le découpage par étapes que vous venez de vivre</b>.</div>`,
  onEnter(root){
    const q=s=>root.querySelector(s);
    const show=i=>{ const [n,c,t]=ZONES[i];
      q('.zImg').src=`${A}niveaux/n${String(i).padStart(2,'0')}.webp`;
      q('.zNum').textContent='ZONE '+String(i+1).padStart(2,'0'); q('.zName').textContent=n; q('.zTxt').textContent=t;
      q('.zCrew').textContent='👩‍🚀 '+c+' personnage'+(String(c).startsWith('1')?'':'s');
      root.querySelectorAll('[data-z]').forEach(b=>b.classList.toggle('on',+b.dataset.z===i)); };
    root.querySelectorAll('[data-z]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();show(+b.dataset.z);}));
    show(0);
  },
  notes:`<p>Montrer les zones jouées (01 à 07, voire 09), puis quelques zones suivantes. Le « + » signifie qu’un membre supplémentaire est sauvé en cours de zone.</p>
  <p>Numérotation : le guide professeur utilise des ID de 0 à 15, le carnet d’activités de 01 à 16 (ici : carnet).</p>`
});

/* ---------- M5-17 : la recette ---------- */
const MODEL = [
  ['🎯','Un objectif clair','Réparer le vaisseau et repartir.'],
  ['🧗','Des défis','Chaque zone : sauver un membre, rapporter les cellules.'],
  ['📈','Une progression','Une nouvelle mécanique à la fois, puis on la valide.'],
  ['📊','Du feedback','Le bilan du soir, le score écologique, la nourriture.'],
  ['🤝','De la coopération','Des personnages complémentaires à coordonner.']
];
Deck.slide({
  id:'M5-17', title:'La recette d’Hexagonia', kicker:'Vers le niveau 6', time:'2 min',
  html:`
  <span class="pixel hx-level">NIVEAU 5 TERMINÉ · RÉCOMPENSE DÉBLOQUÉE</span>
  <h2>La recette d’Hexagonia… à réutiliser</h2>
  <div class="hx-model">${MODEL.map(([i,t,d])=>`<div class="hx-model-step"><span class="hx-big">${i}</span><b>${t}</b><span class="small">${d}</span></div>`).join('<span class="hx-arrow">➜</span>')}</div>
  <div class="callout">🛠️ Gardez cette grille en tête : au <b>niveau 6</b>, vous l’utiliserez pour transformer une activité EPN classique en atelier gamifié.</div>`,
  notes:`<p>« Hexagonia n’est pas seulement un jeu à utiliser : c’est un <b>modèle de conception</b>. » Et c’est aussi le modèle de l’heure qu’on vient de vivre : présenter peu, tester par étapes, débriefer.</p><p>Pause de 15 minutes, puis atelier de conception.</p>`
});
/* ---------- M5-18 : aller plus loin, réalisations ---------- */
const REAL = [
  ['plateau','Un Hexagonia en jeu de plateau','Imprimer ou découper des tuiles hexagonales, fabriquer les pions de l’équipage et rejouer une zone autour d’une table.',
   `<svg viewBox="0 0 220 140"><g stroke="var(--ink)" stroke-width="3">${[[50,40,'#d98b6c'],[90,63,'#8fc46a'],[130,40,'#d98b6c'],[90,109,'#5fb8e0'],[130,86,'#d98b6c'],[170,63,'#8fc46a'],[170,109,'#d98b6c'],[50,86,'#5fb8e0']].map(([x,y,c])=>`<polygon fill="${c}" points="${[0,1,2,3,4,5].map(k=>{const a=Math.PI/3*k+Math.PI/6;return (x+26*Math.cos(a)).toFixed(1)+','+(y+26*Math.sin(a)).toFixed(1)}).join(' ')}"/>`).join('')}</g><circle cx="90" cy="58" r="8" fill="#fff" stroke="var(--ink)" stroke-width="3"/><rect x="84" y="64" width="12" height="9" rx="3" fill="#e8604c" stroke="var(--ink)" stroke-width="2.5"/><circle cx="170" cy="58" r="8" fill="#fff" stroke="var(--ink)" stroke-width="3"/><rect x="164" y="64" width="12" height="9" rx="3" fill="#2e8bc0" stroke="var(--ink)" stroke-width="2.5"/></svg>`],
  ['robot','Un terrain de jeu pour robot','Une carte hexagonale au sol. Un robot (Edison, Blue-Bot, Thymio…) doit rejoindre le vaisseau en évitant l’huile et l’eau.',
   `<svg viewBox="0 0 220 140"><rect x="10" y="12" width="200" height="118" rx="8" fill="#f4e3d3" stroke="var(--ink)" stroke-width="3"/><g stroke="var(--ink)" stroke-width="2" fill="none" opacity=".55">${[[40,40],[80,40],[120,40],[160,40],[60,74],[100,74],[140,74],[180,74],[40,108],[80,108],[120,108],[160,108]].map(([x,y])=>`<polygon points="${[0,1,2,3,4,5].map(k=>{const a=Math.PI/3*k;return (x+20*Math.cos(a)).toFixed(1)+','+(y+20*Math.sin(a)).toFixed(1)}).join(' ')}"/>`).join('')}</g><ellipse cx="140" cy="74" rx="16" ry="11" fill="#1c1a24" opacity=".8"/><path d="M40 108 C70 100 70 60 100 74" stroke="#e8604c" stroke-width="4" stroke-dasharray="7 6" fill="none"/><rect x="26" y="96" width="30" height="22" rx="6" fill="#ffd23f" stroke="var(--ink)" stroke-width="3"/><circle cx="34" cy="120" r="5" fill="var(--ink)"/><circle cx="48" cy="120" r="5" fill="var(--ink)"/><path d="M172 30l14 22h-28z" fill="#fff" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/></svg>`],
  ['impr3d','Les personnages en 3D','Modéliser un membre d’équipage ou une pièce du vaisseau dans Tinkercad, puis l’imprimer pour le jeu de plateau.',
   `<svg viewBox="0 0 220 140"><rect x="50" y="18" width="120" height="106" rx="6" fill="#fff" stroke="var(--ink)" stroke-width="3"/><rect x="62" y="30" width="96" height="10" fill="#c9c1b0" stroke="var(--ink)" stroke-width="2.5"/><path d="M104 40v18l6 8 6-8V40" fill="#e8604c" stroke="var(--ink)" stroke-width="2.5"/><circle cx="110" cy="84" r="11" fill="#5fb8e0" stroke="var(--ink)" stroke-width="3"/><path d="M96 112c0-12 6-17 14-17s14 5 14 17z" fill="#5fb8e0" stroke="var(--ink)" stroke-width="3"/><rect x="62" y="112" width="96" height="6" fill="var(--ink)"/></svg>`]
];
Deck.slide({
  id:'M5-18', title:'Aller plus loin avec Hexagonia', kicker:'Prolonger', time:'',
  html:`
  <h2>Et si on sortait Hexagonia de l’écran ?</h2>
  <div class="grid g3 hx-real">
    ${REAL.map(([k,t,d,svg])=>`<div class="card"><div class="hx-real-ph"><img src="${A}realisations/${k}.jpg" alt="${t}" class="zoomable" onerror="this.remove()">${svg}</div><h3>${t}</h3><p class="small">${d}</p></div>`).join('')}
  </div>
  <div class="callout small" style="margin-top:12px">Un même univers, plusieurs portes d’entrée. Le jeu vidéo devient le point de départ d’un projet <b>FabLab</b>, de <b>robotique</b> ou d’<b>impression 3D</b> dans votre EPN.</div>`,
  notes:`<p>Pour ajouter vos photos, déposez-les dans <code>assets/hexagonia/realisations/</code> sous les noms <code>plateau.jpg</code>, <code>robot.jpg</code> et <code>impr3d.jpg</code>. Elles remplacent automatiquement les illustrations (un clic les agrandit).</p>
  <p>Le terrain pour robot fait le lien avec les formations programmation du catalogue EPN.</p>`
});
})();
