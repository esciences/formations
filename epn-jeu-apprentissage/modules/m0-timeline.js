/* =========================================================
   M0 — Brise-glace : Timeline « La technologie numérique » (≈ 15 min)
   Replacer le numérique et le jeu vidéo dans leur contexte,
   tout en faisant connaissance par groupes de 4.
   Cartes : Voyageurs du numérique (Bibliothèques Sans Frontières),
   d'après le jeu Timeline (Frédéric Henry, Asmodee).
   ========================================================= */
(function(){
const T = 'assets/timeline/';
/* [année, événement, catégorie, explication courte] — jeu · reseau · machine · contexte */
const EVTS = [
  [1642,'Pascal met au point la Pascaline','machine','Blaise Pascal la conçoit à 19 ans pour aider son père dans ses calculs d’impôts.'],
  [1889,'Fondation de Nintendo','jeu','Nintendo fabriquait… des cartes à jouer ! Le jeu vidéo arrive dans les années 1970.'],
  [1947,'Un papillon est retrouvé dans le Mark II','machine','L’équipe du Harvard Mark II colle dans son journal le papillon retrouvé dans la machine. Le mot « bug » existait déjà.'],
  [1947,'Début de la guerre froide','contexte','La rivalité États-Unis / URSS se joue aussi sur le terrain technologique.'],
  [1954,'La parade des Roses est diffusée en couleur à travers les États-Unis','machine','Aux États-Unis d’abord. En Europe, il faudra attendre la fin des années 1960.'],
  [1956,'IBM lance le premier disque dur','machine','Le RAMAC d’IBM, une armoire entière pour cinq millions de caractères.'],
  [1962,'Création du mot « informatique » en français','machine','Un mot-valise, information + automatique, proposé par Philippe Dreyfus.'],
  [1964,'Construction du premier prototype de souris informatique','machine','Bill English construit le prototype imaginé par Douglas Engelbart, une boîte en bois sur roulettes.'],
  [1965,'Deux ordinateurs communiquent à travers les États-Unis','reseau','Une liaison téléphonique entre le Massachusetts et la Californie, juste avant ARPANET.'],
  [1967,'IBM commence à développer la disquette','machine','IBM lance le projet en 1967. Les premiers lecteurs sont vendus en 1971.'],
  [1969,'Les premiers humains marchent sur la Lune','contexte','Avec un ordinateur de bord moins puissant qu’une calculatrice de poche.'],
  [1971,'Premier e-mail envoyé entre deux ordinateurs sur ARPANET','reseau','Ray Tomlinson, sur ARPANET. C’est lui qui choisit le @.'],
  [1975,'Fondation de Microsoft','machine','Bill Gates et Paul Allen misent sur les logiciels plutôt que sur les machines.'],
  [1976,'Fondation d’Apple','machine','Dans un garage. Ronald Wayne, cofondateur, revend ses parts pour 800 $…'],
  [1977,'Un programme d’échecs termine premier ex æquo à l’Open du Minnesota','jeu','Chess 4.5 termine premier ex æquo d’un tournoi humain. Deep Blue battra Kasparov en 1997.'],
  [1977,'Sortie du premier Star Wars au cinéma aux États-Unis','contexte','La science-fiction devient culture populaire.'],
  [1979,'Un ouvrier est tué par un robot industriel','machine','Robert Williams, ouvrier dans une usine Ford, heurté par un bras robotisé.'],
  [1980,'Stockage sur disque dur : environ 200 $ US par mégaoctet','machine','Un exemple de prix sur un disque dur. À comparer avec 2008…'],
  [1982,'Scott Fahlman propose l’émoticône :-)','reseau','Scott Fahlman propose :-) pour signaler l’humour dans un message.'],
  [1982,'Sortie de l’album Thriller de Michael Jackson','contexte','L’album le plus vendu de tous les temps.'],
  [1984,'Internet dépasse 1 000 ordinateurs hôtes recensés','reseau','Le réseau, d’abord militaire puis universitaire, s’ouvre peu à peu.'],
  [1985,'Sortie de Super Mario Bros. au Japon','jeu','Super Mario Bros. relance le jeu vidéo après le krach de 1983.'],
  [1986,'Apparition de Brain, premier virus pour les PC compatibles IBM','reseau','Il se propageait… par disquette.'],
  [1989,'Internet dépasse 100 000 ordinateurs hôtes recensés','reseau','Le premier fournisseur d’accès par ligne téléphonique ouvre la même année.'],
  [1990,'Création du premier site Web au CERN','reseau','Fin 1990 au CERN. Le Web devient libre en 1993. Web et Internet, ce n’est pas la même chose !'],
  [1991,'Fin de la guerre froide','contexte','Dissolution de l’URSS.'],
  [1994,'Des pirates détournent de l’argent en accédant au système de Citibank','reseau','Les premières grandes fraudes informatiques bancaires.'],
  [1995,'Accord sur le format DVD','machine','L’accord sur le format arrive avant les lecteurs. Le DVD va remplacer la cassette VHS.'],
  [1996,'Internet dépasse 10 millions d’ordinateurs hôtes recensés','reseau','Le bruit du modem, et la ligne de téléphone occupée…'],
  [1998,'Fondation de Google','reseau','Larry Page et Sergey Brin.'],
  [1999,'Lancement de Napster, pour partager des fichiers musicaux','reseau','Le partage de musique en ligne bouscule l’industrie du disque.'],
  [2001,'Lancement de Wikipédia','reseau','L’encyclopédie écrite par ses lecteurs.'],
  [2005,'Création de YouTube','reseau','La vidéo en ligne pour tous.'],
  [2007,'Commercialisation du premier iPhone aux États-Unis','machine','Le smartphone tactile se démocratise.'],
  [2008,'Stockage sur disque dur : environ 0,00027 $ US par mégaoctet','machine','Plus de 700 000 fois moins cher qu’en 1980.'],
  [2022,'Fin du support d’Internet Explorer 11 sur certains Windows 10','reseau','Après 27 ans de service.']
];
const CAT = {jeu:['🎮','Jeu'],reseau:['🌐','Réseau'],machine:['💾','Machines'],contexte:['🌍','Contexte']};

/* ---------- M0-03 : consigne ---------- */
Deck.slide({
  id:'M0-04', title:'Brise-glace Timeline', kicker:'Brise-glace', time:'12 min',
  html: Tpl.mission({
    step:'BRISE-GLACE · GROUPES DE 4',
    title:'Timeline, la technologie à travers le temps',
    goal:'Replacer la technologie dans son contexte… et faire connaissance.',
    todo:[
      'Formez des groupes de <b>4</b>.',
      'Chacun·e reçoit <b>4 cartes</b>, date cachée. Une carte part au centre, date visible.',
      'À votre tour, posez une carte <b>avant ou après</b> les autres et retournez-la. Mal placée ? Défaussez et piochez.'
    ],
    rule:'En posant une carte, partagez un souvenir lié à cette technologie.',
    visual:`<div class="tl-photos">${[0,1,2,3,4,6].map(i=>`<img src="${T}img${i}.webp" alt="">`).join('')}</div>`,
    watch:['Quelle carte vous surprend le plus ?','Quelle invention a le plus changé votre quotidien ?'],
    done:'Le premier qui n’a plus de carte gagne. Continuez avec de nouvelles cartes.',
    min:10
  }),
  notes:`<h4>Matériel</h4><p>Un jeu de 36 cartes « La technologie numérique » par groupe : fichier <code>assets/fiches/timeline-cartes.pdf</code> (5 feuilles A4 recto verso, bord long, cartes 63 × 88 mm ; la 5e feuille = 9 cartes IA, aussi seule dans <code>timeline-cartes-ia.pdf</code>), avec sa notice <code>timeline-notice.pdf</code>. Règles d’après Timeline, adaptées à 4 cartes par joueur.</p>
  <h4>Pourquoi ce brise-glace ?</h4><ul><li>On fait connaissance sans tour de table formel.</li><li>On replace la technologie et le numérique dans leur contexte historique.</li><li>Les participants vivent déjà un jeu de société… détourné (on en reparlera au niveau 2 : c’est du serious gaming).</li></ul>`
});

/* ---------- M0-04 : débrief flash ---------- */
Deck.slide({
  id:'M0-05', title:'Débrief Timeline', kicker:'Débriefer', time:'3 min',
  html: Tpl.flash({
    step:'DÉBRIEF FLASH · TIMELINE',
    title:'Alors, cette technologie ?',
    questions:['Quelle carte vous a le plus surpris ?','Qu’avez-vous appris sur vos voisins de table ?','Quelle invention a le plus changé le quotidien de vos publics ?'],
    revealTag:'TOUT S’ACCÉLÈRE',
    reveal:`<div class="tl-speed">
      <div class="tl-s"><b>1984</b><span>1 000 ordinateurs hôtes sur Internet</span></div>
      <div class="tl-s"><b>1989</b><span>100 000 ordinateurs hôtes sur Internet</span></div>
      <div class="tl-s"><b>1996</b><span>10 millions d’ordinateurs hôtes</span></div>
      <div class="tl-s tl-s2"><b>200 $</b><span>le mégaoctet en 1980</span></div>
      <div class="tl-s tl-s2"><b>0,00027 $</b><span>le mégaoctet en 2008</span></div>
      <div class="tl-s tl-s2"><b>2007</b><span>le smartphone tactile arrive</span></div>
    </div>
    <p class="small" style="margin-top:12px">Nos publics n’ont pas tous vécu la même frise. C’est aussi pour ça que les EPN existent.</p>`
  }),
  notes:`<p>Rester bref, c’est un brise-glace. La frise complète, slide suivante, peut rester affichée pendant la pause.</p>`
});

/* ---------- M0-06 : la frise complète ---------- */
Deck.slide({
  id:'M0-06', title:'La frise complète', kicker:'Solution', time:'(pendant la pause)',
  html:`
  <div class="tl-head"><h2>La frise complète</h2>
    <div class="tabs tl-filters">${[['all','Tout'],...Object.entries(CAT).map(([k,v])=>[k,v[1]])].map(([k,n])=>`<button data-f="${k}">${n}</button>`).join('')}</div></div>
  <div class="tl-track">${EVTS.map(([y,t,c,e],i)=>`<button class="tl-card" data-c="${c}" data-i="${i}"><span class="tl-y">${y}</span><span class="tl-cat">${CAT[c][0]}</span><span class="tl-t">${t}</span></button>`).join('')}</div>
  <div class="tl-info"><span class="muted">Cliquez sur une carte pour en savoir plus. Faites défiler la frise →</span></div>`,
  onEnter(root){
    const info=root.querySelector('.tl-info');
    root.querySelectorAll('.tl-card').forEach(b=>b.addEventListener('click',e=>{ e.stopPropagation();
      root.querySelectorAll('.tl-card').forEach(x=>x.classList.remove('on')); b.classList.add('on');
      const [y,t,c,x]=EVTS[+b.dataset.i]; info.innerHTML=`<b>${y} · ${t}</b><br>${x}`; }));
    const filt=k=>{ root.querySelectorAll('.tl-filters button').forEach(b=>b.classList.toggle('on',b.dataset.f===k));
      root.querySelectorAll('.tl-card').forEach(b=>b.classList.toggle('dim', k!=='all' && b.dataset.c!==k)); };
    root.querySelectorAll('.tl-filters button').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation(); filt(b.dataset.f);}));
    filt('all');
    const tr=root.querySelector('.tl-track'); tr.addEventListener('wheel',e=>{ if(Math.abs(e.deltaY)>Math.abs(e.deltaX)){ tr.scrollLeft+=e.deltaY; e.preventDefault(); } },{passive:false});
  },
  notes:`<p>Explications complètes dans la fiche « Timeline – Solution » (Voyageurs du numérique). Filtrer sur « Jeu » pour revenir sur le fil rouge de la journée.</p>`
});
})();
