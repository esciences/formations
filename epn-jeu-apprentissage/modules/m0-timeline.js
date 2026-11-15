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
  [1645,'Invention de la première machine à calculer','machine','La Pascaline de Blaise Pascal, conçue à 19 ans pour aider son père dans ses calculs d’impôts.'],
  [1889,'Fondation de l’entreprise Nintendo','jeu','Nintendo fabriquait… des cartes à jouer ! Le jeu vidéo arrive dans les années 1970.'],
  [1947,'Un insecte dans un ordinateur popularise le mot « bug »','machine','L’équipe de Grace Hopper retrouve un papillon de nuit coincé dans le Harvard Mark II.'],
  [1947,'Début de la guerre froide','contexte','La rivalité États-Unis / URSS se joue aussi sur le terrain technologique.'],
  [1954,'Première émission de télévision en couleur','machine','Aux États-Unis d’abord ; il faudra attendre la fin des années 1960 en Europe.'],
  [1956,'Premier disque dur d’une capacité de 5 Mo','machine','Le disque du RAMAC d’IBM, une armoire entière pour 5 Mo.'],
  [1962,'Invention du terme « informatique »','machine','Un mot-valise, information + automatique (Philippe Dreyfus).'],
  [1963,'Invention de la souris','machine','Douglas Engelbart imagine une boîte en bois montée sur roulettes.'],
  [1965,'Première communication longue distance entre deux ordinateurs','reseau','Un premier réseau longue distance, juste avant ARPANET, l’ancêtre d’Internet.'],
  [1967,'Invention de la disquette','machine','D’abord 20 cm de large ! Elle rétrécira jusqu’au format 3,5 pouces.'],
  [1969,'L’Homme marche sur la Lune','contexte','Avec un ordinateur de bord moins puissant qu’une calculatrice de poche.'],
  [1971,'Le premier e-mail de l’histoire','reseau','Ray Tomlinson, sur ARPANET. C’est lui qui choisit le @.'],
  [1975,'Fondation de Microsoft','machine','Bill Gates et Paul Allen misent sur les logiciels plutôt que sur les machines.'],
  [1976,'Création d’Apple','machine','Dans un garage. Ronald Wayne, cofondateur, revend ses parts pour 800 $…'],
  [1977,'Un tournoi d’échecs majeur remporté par un ordinateur','jeu','Le jeu, terrain d’essai de l’intelligence artificielle. Deep Blue battra Kasparov en 1997.'],
  [1977,'Sortie au cinéma de Star Wars','contexte','La science-fiction devient culture populaire.'],
  [1979,'Premier humain tué par un robot','machine','Un ouvrier, dans une usine Ford, heurté par un bras robotisé.'],
  [1980,'Prix moyen du mégaoctet : 300 $','machine','À comparer avec 2008…'],
  [1982,'Invention du premier smiley','reseau','Scott Fahlman propose :-) pour signaler l’humour dans un message.'],
  [1982,'Album « Thriller » de Michael Jackson','contexte','L’album le plus vendu de tous les temps.'],
  [1984,'1 000 ordinateurs connectés à Internet','reseau','Le réseau, d’abord militaire puis universitaire, s’ouvre peu à peu.'],
  [1985,'Sortie de Super Mario','jeu','Super Mario Bros relance le jeu vidéo après le krach de 1983.'],
  [1986,'Brain, premier virus à infecter massivement les ordinateurs','reseau','Il se propageait… par disquette.'],
  [1989,'100 000 ordinateurs connectés à Internet','reseau','Le premier fournisseur d’accès par ligne téléphonique ouvre la même année.'],
  [1991,'Fin de la guerre froide','contexte','Dissolution de l’URSS.'],
  [1993,'Le premier site Internet','reseau','Le 30 avril 1993, le CERN met le Web dans le domaine public. Web et Internet, ce n’est pas la même chose !'],
  [1994,'Un cyberpirate s’introduit dans la base de données d’une banque','reseau','Les premières grandes fraudes informatiques bancaires.'],
  [1995,'Invention du DVD','machine','Il va remplacer la cassette VHS.'],
  [1996,'10 000 000 ordinateurs connectés à Internet','reseau','Le bruit du modem, et la ligne de téléphone occupée…'],
  [1998,'Fondation de Google','reseau','Larry Page et Sergey Brin.'],
  [1999,'Première plateforme de téléchargement illégal','reseau','Napster et le partage de musique en ligne.'],
  [2001,'Fondation de Wikipédia','reseau','L’encyclopédie écrite par ses lecteurs.'],
  [2005,'Création de YouTube','reseau','La vidéo en ligne pour tous.'],
  [2007,'Sortie de l’iPhone','machine','Le smartphone tactile se démocratise.'],
  [2008,'Prix du mégaoctet : 0,00022 $','machine','Plus d’un million de fois moins cher qu’en 1980.'],
  [2022,'Fin du navigateur Internet Explorer','reseau','Après 27 ans de service.']
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
  notes:`<h4>Matériel</h4><p>Un jeu de 36 cartes « La technologie numérique » par groupe (imprimé recto verso, découpé). Règles d’après Timeline, adaptées à 4 cartes par joueur.</p>
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
      <div class="tl-s"><b>1984</b><span>1 000 ordinateurs connectés</span></div>
      <div class="tl-s"><b>1989</b><span>100 000 ordinateurs connectés</span></div>
      <div class="tl-s"><b>1996</b><span>10 millions d’ordinateurs connectés</span></div>
      <div class="tl-s tl-s2"><b>300 $</b><span>le mégaoctet en 1980</span></div>
      <div class="tl-s tl-s2"><b>0,0002 $</b><span>le mégaoctet en 2008</span></div>
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
