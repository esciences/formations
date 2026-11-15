/* =========================================================
   M0 — Accueil & brise-glace Timeline (≈ 25 min)
   Ce fichier déclare aussi la carte complète des modules.
   ========================================================= */
[
  {id:'M0', order:0, label:'NIV. 0', title:'Accueil & Timeline',               duration:'30 min', color:'#6c4bd8', badge:{icon:'🎟️', name:'Joueur·se inscrit·e'}},
  {id:'M1', order:1, label:'NIV. 1', title:'Escape game : le manoir de Whisper', duration:'50 min', color:'#e0a100', badge:{icon:'🗝️', name:'Crocheteur·se d’énigmes'}},
  {id:'M2', order:2, label:'NIV. 2', title:'Jouer, gamifier, ludifier : on démêle', duration:'45 min', color:'#2e8bc0', badge:{icon:'🧩', name:'Décodeur·se de mécaniques'}},
  {id:'M3', order:3, label:'NIV. 3', title:'Pico Park : coopérer ou périr',     duration:'60 min', color:'#e86a92', badge:{icon:'🤝', name:'Esprit d’équipe'}},
  {id:'M4', order:4, label:'NIV. 4', title:'Hexagonia : prise en main',        duration:'30 min', color:'#e8604c', badge:{icon:'🪐', name:'Explorateur·rice d’Hexagonia'}},
  {id:'M5', order:5, label:'NIV. 5', title:'Hexagonia : jouer & débriefer',    duration:'60 min', color:'#f39c1f', badge:{icon:'🚀', name:'Stratège d’Hexagonia'}},
  {id:'M6', order:6, label:'NIV. 6', title:'Atelier : gamifier une activité EPN', duration:'60 min', color:'#1f9d6b', badge:{icon:'🛠️', name:'Game designer'}},
  {id:'M7', order:7, label:'NIV. 7', title:'Synthèse & perspectives',          duration:'20 min', color:'#8a5cf6', badge:{icon:'🏆', name:'Animateur·rice ludique'}},
  {id:'BOX',order:8, label:'BONUS',  title:'Boîte à outils',                   duration:'',       color:'#7a7590'}
].forEach(Deck.module);

Deck.slide({
  id:'M0-01', title:'Couverture', bare:true, cls:'cover',
  html:`
  <div class="cover-wrap">
    <div class="cover-left">
      <img class="cover-logo" src="assets/esciences/logo-blanc.svg" alt="eSCIENCES">
      <span class="pixel cover-press">▶ APPUYEZ SUR START</span>
      <h1>Intégrer le jeu<br>et le jeu vidéo<br><span class="hl">comme vecteur d’apprentissage</span></h1>
      <p class="lead">Gamifier les activités en EPN</p>
      <p class="cover-who"><b>Tommy Berben</b> · formateur en technopédagogie</p>
      <p class="cover-url pixel">Support en ligne · esciences.github.io/formations</p>
    </div>
    <div class="cover-right" aria-hidden="true">
      <div class="cart"><span class="pixel">LEVEL UP</span><span class="cart-sub">8 niveaux · 1 journée</span></div>
    </div>
  </div>`,
  notes:`<p>À afficher pendant l’arrivée des participants. Lancer le chrono du mode animateur au démarrage.</p>`
});

Deck.slide({
  id:'M0-02', title:'Qui suis-je ?', kicker:'Le formateur', time:'2 min',
  html:`
  <div class="who">
    <div class="who-photo"><img src="assets/esciences/photo-tommy.png" alt="Tommy Berben" onerror="if(!this.dataset.j){this.dataset.j=1;this.src='assets/esciences/photo-tommy.jpg'}else{this.parentElement.classList.add('empty');this.remove()}"><span>TB</span></div>
    <div>
      <h2>Bonjour, moi c’est Tommy</h2>
      <ul class="clean">
        <li>Enseignant en <b>sciences et FMTTN</b> à l’Institut Sainte-Begge (Andenne)</li>
        <li>Formateur en <b>technopédagogie</b> à l’eduLAB (TechnofuturTIC)</li>
        <li>Créateur de contenus pédagogiques sur <b>eSCIENCES.be</b></li>
        <li>J’expérimente le jeu en classe depuis des années, et j’aime partager ce qui fonctionne.</li>
      </ul>
      <div class="who-certifs">
        <span class="tag">Canvassador</span>
        <span class="tag">Formateur certifié BookWidgets</span>
        <span class="tag">Partenaire Meet Edison</span>
        <span class="tag">Space Ambassador ESERO Belgium</span>
      </div>
    </div>
  </div>`,
  notes:`<p>Rester court, l’important c’est eux.</p><p>Pour la photo, déposer un fichier <code>photo-tommy.jpg</code> dans <code>assets/esciences/</code>.</p>`
});

const PUBLICS = [['jeunes','🧒','Enfants et jeunes'],['adultes','🧑','Adultes'],['seniors','👵','Seniors'],['emploi','💼','Recherche d’emploi'],['tous','🌍','Tout public']];
Deck.slide({
  id:'M0-03', title:'Faisons connaissance', kicker:'Tour de table', time:'5 min',
  html:`
  <h2>Faisons connaissance</h2>
  <div class="grid g3 meet">
    <div class="card"><span class="big">👋</span><h3>Votre prénom</h3></div>
    <div class="card"><span class="big">📍</span><h3>Votre EPN</h3></div>
    <div class="card"><span class="big">👥</span><h3>Le public que vous accueillez</h3></div>
  </div>
  <h3 style="margin-top:22px">Qui accueillez-vous dans votre EPN ?</h3>
  <div class="grid publics">${PUBLICS.map(([k,i,n])=>`<div class="counter pub" data-key="m0:pub:${k}"><span class="big">${i}</span><span class="lbl">${n}</span></div>`).join('')}</div>`,
  notes:`<p>Tour de table rapide, 30 secondes par personne. Je compte les publics au fur et à mesure avec les boutons + et −.</p><p>Ces chiffres serviront pendant la journée, notamment pour les adaptations par public.</p>`
});
Deck.slide({
  id:'M0-07', title:'Les objectifs de la journée', kicker:'Objectifs', time:'2 min',
  html:`
  <h2>À la fin de la journée, vous pourrez…</h2>
  <div class="grid g3">
    <div class="card"><span class="tag">OBJECTIF 1</span><p>Comprendre le <b>rôle du jeu</b> dans l’apprentissage et l’inclusion.</p></div>
    <div class="card"><span class="tag">OBJECTIF 2</span><p>Animer un <b>escape game</b> et lire une dynamique de groupe.</p></div>
    <div class="card"><span class="tag">OBJECTIF 3</span><p>Utiliser <b>Pico Park</b> pour faire coopérer un groupe en quelques minutes.</p></div>
    <div class="card"><span class="tag">OBJECTIF 4</span><p>Exploiter <b>Hexagonia</b> comme support pédagogique structuré.</p></div>
    <div class="card"><span class="tag">OBJECTIF 5</span><p><b>Concevoir</b> ou adapter une activité gamifiée pour votre EPN.</p></div>
    <div class="card acc"><span class="tag">OBJECTIF 6</span><p>Adopter une <b>posture d’animateur·rice ludique</b>.</p></div>
  </div>`,
  notes:`<p>Ce sont les six objectifs de l’offre. Ils reviennent en fin de journée (niveau 7) pour l’auto-évaluation.</p>`
});

Deck.slide({
  id:'M0-08', title:'Le mur de ressources', kicker:'Ressources', time:'1 min',
  html:`
  <h2>Toutes les ressources de la journée</h2>
  <div class="res-wall">
    <div class="card res-qr"><img src="assets/esciences/qr-ressources.png" alt="QR code vers le mur de ressources"><p>Scannez pour ouvrir le mur</p></div>
    <div class="grid" style="gap:16px">
      <a class="card res-link" href="https://miniurl.be/r-6zpg" target="_blank" rel="noopener"><span class="tag">LIEN COURT</span><b>miniurl.be/r-6zpg</b><span class="small">Le mur Digiwall « Ressources – jeux » avec les fiches, les jeux et les liens de la journée</span></a>
      <a class="card res-link" href="https://esciences.github.io/formations/" target="_blank" rel="noopener"><span class="tag">CE SUPPORT EN LIGNE</span><b>esciences.github.io/formations</b><span class="small">Toutes les slides, à revoir après la journée, avec les fiches à imprimer</span></a>
      <a class="card res-link" href="https://www.esciences.be" target="_blank" rel="noopener"><span class="tag">ET AUSSI</span><b>esciences.be</b><span class="small">Mes ressources pédagogiques et d’autres activités</span></a>
    </div>
  </div>`,
  notes:`<p>Mur Digiwall : https://digiwall.app/w/5966/6bad8/ressources---jeux (le QR code mène au lien court).</p><p>Le support est hébergé sur GitHub Pages : https://esciences.github.io/formations/ (page d’accueil de mes formations, puis « Level Up »).</p>`
});

Deck.slide({
  id:'M0-09', title:'La carte de la journée', kicker:'Programme', time:'2 min',
  html:`
  <h2>La carte de la journée</h2>
  <div class="daymap">
    ${[
      ['9h00','0','Accueil & Timeline','🎟️'],
      ['9h30','1','Escape game : le manoir de Whisper','🗝️'],
      ['10h30','2','Jouer, gamifier, ludifier','🧩'],
      ['11h15','3','Pico Park','🤝'],
      ['13h00','4','Hexagonia : prise en main','🪐'],
      ['13h30','5','Hexagonia : jouer & débriefer','🚀'],
      ['14h45','6','Atelier : gamifier une activité','🛠️'],
      ['15h45','7','Synthèse & perspectives','🏆']
    ].map(([h,n,t,i])=>`<div class="day-node"><span class="pixel">${h}</span><b>${i}</b><span class="pixel">NIV. ${n}</span><span>${t}</span></div>`).join('')}
  </div>
  <p class="small muted">Pauses à 10h20, 12h15 (midi) et 14h30. Fin vers 16h15.</p>`,
  notes:`<p>La progression : jeu sans écran → jeu coopératif simple → jeu riche et structuré → vous devenez concepteurs.</p>`
});

Deck.slide({
  id:'M0-10', title:'Les règles du jeu de la journée', kicker:'Cadre', time:'2 min',
  html:`
  <h2>Les règles du jeu… de la journée</h2>
  <div class="card acc rules-card"><h3>Ici, vous avez le droit de…</h3><ul class="clean"><li><b>vous tromper</b>, c’est même recommandé</li><li><b>ne pas aimer</b> un jeu, et le dire</li><li><b>observer</b> plutôt que jouer, à certains moments</li><li>poser <b>toutes</b> les questions</li></ul></div>
  <div class="callout" style="margin-top:20px">On présente peu, on joue, on débriefe toujours.</div>`,
  notes:`<p>La barre d’XP et les badges restent visibles en haut de l’écran. Bouton ↺ à côté de la barre pour la remettre à zéro.</p>`
});
