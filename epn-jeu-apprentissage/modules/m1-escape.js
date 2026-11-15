/* =========================================================
   M1 — Escape game : le manoir de Whisper (≈ 50 min)
   Escape game hybride (cartes imprimées + application Escape Cards).
   Jeu créé par Guillaume Bonzoms. Pitch → règles → 30 min d'évasion
   → débriefing (ressenti, conception du jeu, dynamique de groupe) → EPN.
   ========================================================= */
(function(){
const E = 'assets/escape/';
const URL_JEU = 'https://miniurl.be/r-6zph';
Deck.module({ id:'M1', theme:'escape', decor:`<div class="es-moon" aria-hidden="true"></div>` });

/* ---------- M1-01 ---------- */
Deck.slide({
  id:'M1-01', title:'Le manoir de Whisper', time:'1 min', cls:'dark',
  html: Tpl.title({
    kicker:'NIVEAU 1 · ESCAPE GAME',
    title:'Le manoir<br>de Whisper',
    lead:'Des cartes, une application, 30 minutes… et une équipe.',
    steps:[['2′','Le principe','🔐'],['2′','Le pitch','🕯️'],['3′','Les règles','📜'],['30′','L’évasion','🗝️'],['10′','Débrief','💬'],['3′','Et en EPN ?','🔁']],
    callout:'Pendant le jeu, je vous observe. Après, on regarde <b>comment vous avez fonctionné</b>.'
  }),
  notes:`<p>Escape game « Serious Escape Cards » : cartes à imprimer + application en ligne (chrono, codes, malus). Création : Guillaume Bonzoms.</p>
  <p>⚠️ Différence avec l’offre : l’escape game annoncé « débranché » est ici hybride (cartes + smartphone). L’objectif reste identique : observer une dynamique de groupe.</p>`
});

/* ---------- M1-02 : le principe ---------- */
Deck.slide({
  id:'M1-02', title:'Le principe de l’escape game', kicker:'Le principe', time:'2 min',
  html:`
  <h2>Un escape game, c’est quoi ?</h2>
  <div class="es-principe">
    <div class="card"><span class="big">👥</span><h3>Une équipe</h3><p>Quelques joueurs qui doivent coopérer pour avancer.</p></div>
    <div class="card"><span class="big">🧩</span><h3>Des énigmes reliées</h3><p>Chaque énigme résolue donne un indice pour la suivante.</p></div>
    <div class="card"><span class="big">⏳</span><h3>Un temps limité</h3><p>Le chrono crée l’urgence et l’élan collectif.</p></div>
    <div class="card acc"><span class="big">🚪</span><h3>Un seul but</h3><p>S’échapper, ou résoudre le mystère, avant la fin du temps.</p></div>
  </div>
  <div class="callout" style="margin-top:18px">Né au Japon en 2007, l’escape game « grandeur nature » s’inspire… de petits jeux vidéo en ligne où l’on devait s’échapper d’une pièce.</div>`,
  notes:`<p>Les premiers « Real Escape Game » sont organisés à Kyoto en 2007 par la société SCRAP. Ils s’inspirent des jeux vidéo « escape the room » du début des années 2000, comme Crimson Room (2004).</p>
  <p>En pédagogie, chaque énigme devient une petite situation problème. Ici, on joue avec des cartes et une application.</p>`
});

/* ---------- M1-03 : le pitch ---------- */
Deck.slide({
  id:'M1-03', title:'Le pitch', kicker:'Il était une fois…', time:'3 min', cls:'es-story',
  html:`
  <div class="es-pitch">
    <div class="es-pitch-txt">
      <span class="pixel tp-kicker">LE MANOIR DE WHISPER</span>
      <p class="es-big">Vous entrez dans le manoir.</p>
      <p class="es-big">Le sol s’ouvre sous vos pieds…</p>
      <p class="es-big">et vous tombez dans une vaste cave.</p>
      <p class="es-alert">Le soleil se couche dans <b>30 minutes</b>.</p>
    </div>
    <div class="es-cards">
      <img src="${E}dos-titre.webp" alt="Carte de couverture : Le manoir de Whisper" class="es-c1">
      <img src="${E}cave.webp" alt="Carte 61 : la cave" class="es-c2">
    </div>
  </div>`,
  notes:`<p>Lire le pitch à voix haute, lumière tamisée si possible. L’ambiance fait partie du jeu.</p>
  <p>Texte d’introduction de l’application : on entre dans le manoir, le sol s’ouvre, on tombe dans une cave, et le soleil se couche dans 30 minutes.</p>`
});

/* ---------- M1-04 : les règles ---------- */
Deck.slide({
  id:'M1-04', title:'Les règles', kicker:'Le minimum vital', time:'3 min',
  html:`
  <h2>Les symboles à connaître</h2>
  <div class="es-sym">
    <div class="es-s"><span class="es-red-dot">13</span><p>Un numéro dans un rond rouge, on prend la carte correspondante.</p></div>
    <div class="es-s"><img src="${E}ico/formule.png" alt=""><p>Une formule ou un code à saisir dans l’application.</p></div>
    <div class="es-s"><img src="${E}ico/malus.png" alt=""><p>Un malus, on appuie sur le bouton de l’application et on perd du temps.</p></div>
    <div class="es-s"><img src="${E}ico/defausser.png" alt=""><p>Un numéro barré, on défausse cette carte.</p></div>
    <div class="es-s"><img src="${E}ico/aide.png" alt=""><p>Le « ? » de l’application explique chaque bouton.</p></div>
    <div class="es-s"><img src="${E}ico/joueurs.png" alt=""><p>De 1 à 4 joueurs, en équipe.</p></div>
  </div>
  <div class="es-yy">
    <div class="es-yy-l"><img src="${E}ico/yin.png" alt="Yin"><img src="${E}ico/yang.png" alt="Yang"><p>Une carte <b>Yin</b> et une carte <b>Yang</b> s’assemblent en collant leurs numéros.</p></div>
    <img src="${E}ico/exemple.png" alt="Carte Yin 5 et carte Yang 12 donnent la carte 512" class="es-yy-ex"><p class="es-yy-res">5 et 12<br>donnent la<br><b>carte 512</b></p>
  </div>`,
  notes:`<p>Symboles repris de la carte « Règles du jeu ». Ne pas détailler davantage, les cartes et l’application guident l’équipe.</p>`
});

/* ---------- M1-05 : la mission ---------- */
Deck.slide({
  id:'M1-05', title:'L’évasion', kicker:'Jouer', time:'30 min',
  html: Tpl.mission({
    step:'ÉVASION · ÉQUIPES DE 4 MAXIMUM',
    title:'Échappez-vous du manoir',
    goal:'Sortir du manoir avant le coucher du soleil.',
    todo:['Étalez les cartes, <b>face numéro visible</b>.','Scannez le QR code « Introduction ».','Cliquez sur <b>Commencer la partie</b>.','Prenez la <b>carte n°61</b>… et bonne chance !'],
    rule:'Tout le monde manipule les cartes. Le téléphone circule.',
    visual:`<div class="es-mc"><img src="${E}dos-titre.webp" alt="Carte de couverture du manoir de Whisper"><div class="es-mc-link"><span class="tag">LIEN DE LA PARTIE</span><a href="${URL_JEU}" target="_blank" rel="noopener">miniurl.be/r-6zph</a><span class="small">Si le QR code ne fonctionne pas.</span></div></div>`,
    watch:['Qui tient le téléphone ? Qui tient les cartes ?','Comment l’information circule-t-elle ?'],
    min:30
  }),
  notes:`<h4>Préparation</h4><ul><li>Un jeu de cartes imprimé recto verso et découpé par équipe.</li><li>Un smartphone ou une tablette connecté par équipe.</li><li>Garder la carte conceptuelle (solution) à portée de main pour les indices.</li></ul>
  <h4>Pendant le jeu</h4><p>J’observe : qui prend le lead, qui fouille, qui calcule, qui surveille le temps, qui reste en retrait. Je note des comportements, pas des noms (comme le feront les observateurs de Pico Park).</p>
  <h4>Indices</h4><p>Une équipe bloquée plus de 5 minutes : une question plutôt qu’une réponse (« Avez-vous regardé toutes les cartes que vous avez en main ? »).</p>`
});

/* ---------- M1-06 : débrief à chaud ---------- */
Deck.slide({
  id:'M1-06', title:'Débrief à chaud', kicker:'Débriefer', time:'4 min',
  html: Tpl.flash({
    step:'DÉBRIEF · 1. À CHAUD',
    title:'Vous êtes sortis… ou pas ?',
    questions:['Votre état d’esprit, en <b>un seul mot</b> ?','Votre moment « eurêka » ?','Votre moment de blocage ? Comment en êtes-vous sortis ?'],
    revealTag:'DANS LES COULISSES, COMMENT LE JEU EST CONSTRUIT',
    reveal:`<img src="${E}carte-conceptuelle.webp" alt="Carte conceptuelle du manoir de Whisper" class="es-map zoomable" title="Cliquer pour agrandir">
      <p class="small" style="margin-top:8px">Chaque énigme débloque la suivante. On y voit un <b>chemin</b>, des <b>embranchements</b>, des <b>pièges</b> (malus) et un <b>bonus temps</b>. Cliquez sur la carte pour l’agrandir.</p>`
  }),
  notes:`<p>Le tour du « mot » : rapide, tout le monde parle, personne n’explique. Les émotions d’abord, l’analyse ensuite.</p>
  <p>La carte conceptuelle montre que l’escape game est une suite d’énigmes reliées : c’est aussi la méthode pour en concevoir un (niveau 6).</p>`
});

/* ---------- M1-07 : dynamique de groupe ---------- */
const ROLES = [['🔍','Le fouilleur','Repère les détails sur toutes les cartes.'],['🧮','Le calculateur','Se jette sur les codes et les énigmes logiques.'],
  ['⏱️','Le gardien du temps','Surveille le chrono, presse le groupe.'],['🧭','Le rassembleur','Fait le point, répartit, relance.'],['🙋','L’électron libre','Teste seul·e dans son coin… parfois avec succès.']];
Deck.slide({
  id:'M1-07', title:'La dynamique de groupe', kicker:'Débriefer', time:'4 min',
  html: Tpl.flash({
    step:'DÉBRIEF · 2. LE GROUPE',
    title:'Comment avez-vous fonctionné ?',
    questions:['Qui a pris quel rôle, sans que personne ne le décide ?','L’information circulait-elle, ou restait-elle dans une seule main ?','Le téléphone était-il un outil commun… ou une chasse gardée ?'],
    revealTag:'LES RÔLES QUI APPARAISSENT SOUVENT',
    reveal:`<div class="es-roles">${ROLES.map(([i,n,d])=>`<div class="es-role"><span class="big">${i}</span><div><b>${n}</b><br><span class="small">${d}</span></div></div>`).join('')}</div>
      <p class="small" style="margin-top:10px">Ces rôles existent aussi dans vos groupes en EPN. Le jeu les rend <b>visibles</b>… et donc discutables.</p>`
  }),
  notes:`<p>Partager quelques observations neutres (« J’ai vu une équipe où les cartes passaient de main en main… »). Ne jamais pointer une personne.</p>
  <p>Faire le lien : on observera la même chose, avec une grille, dans Pico Park.</p>`
});

/* ---------- M1-08 : et en EPN ---------- */
Deck.slide({
  id:'M1-08', title:'Un escape game en EPN ?', kicker:'Transposer', time:'3 min',
  html:`
  <h2>Un escape game dans votre EPN ?</h2>
  <div class="grid g3" style="align-items:start">
    <div class="card"><span class="tag">CE QUE ÇA FAIT TRAVAILLER</span><ul class="clean small">
      <li>Observation, logique, lecture de consignes</li><li>Coopération et répartition des tâches</li><li>Des <b>compétences numériques</b> comme scanner un QR code, utiliser une appli ou saisir un code</li></ul></div>
    <div class="card"><span class="tag">POINTS DE VIGILANCE</span><ul class="clean small">
      <li>Groupes de <b>4 maximum</b>, sinon certains décrochent</li><li>Prévoir des <b>indices</b> pour éviter la frustration</li><li>Garder du temps pour <b>débriefer</b></li></ul></div>
    <div class="card acc"><span class="tag">CRÉER LE VÔTRE</span><ul class="clean small">
      <li><b>Escape Cards</b>, un outil gratuit pour créer un escape game à cartes avec son application</li><li>Ça prend du temps ! Partez d’un <b>modèle existant</b> et modifiez les cartes, le thème et les énigmes avant de vous lancer dans une grosse réalisation</li><li>Thèmes possibles en EPN, comme les mots de passe ou les arnaques en ligne</li></ul></div>
  </div>
  <p class="small muted" style="margin-top:12px">Méthode et ressources sur <a href="https://escapecards.fr" target="_blank" rel="noopener">escapecards.fr</a> · application sur <a href="https://app.escapecards.fr" target="_blank" rel="noopener">app.escapecards.fr</a></p>`,
  notes:`<p>Escape Cards est un outil d’aide à la création d’escape games pédagogiques à cartes, développé par Guillaume Bonzoms. Exemple d’usage académique : « Le jeu des IA » (académie de Toulouse).</p>`
});

/* ---------- M1-09 : transition ---------- */
Deck.slide({
  id:'M1-09', title:'Niveau terminé', kicker:'Vers le niveau 2', time:'1 min', cls:'dark',
  html: Tpl.title({
    kicker:'NIVEAU 1 TERMINÉ · PAUSE DÉBLOQUÉE ☕',
    title:'Vous venez de jouer.<br>Et maintenant ?',
    lead:'Après la pause, on met des mots justes sur ce que vous avez vécu. Jeu, serious game, gamification… on démêle tout ça.',
    callout:'Direction le <b>niveau 2</b>.'
  }),
  notes:`<p>Pause de 15 minutes. Laisser la frise Timeline (M0-05) ou la carte conceptuelle affichée pendant la pause.</p>`
});
})();
