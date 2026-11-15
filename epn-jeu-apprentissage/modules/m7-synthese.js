/* =========================================================
   M7 — Synthèse & perspectives (≈ 30 min)
   Prendre du recul, posture de l'animateur ludique (objectif 6),
   vigilances, ressources, auto-évaluation et plan d'action.
   ========================================================= */
(function(){
Deck.module({ id:'M7', theme:'m7', decor:`<div class="m7-decor" aria-hidden="true">🏆</div>` });

/* ---------- M7-01 ---------- */
Deck.slide({
  id:'M7-01', title:'Dernier niveau', time:'1 min', cls:'dark',
  html: Tpl.title({
    kicker:'NIVEAU 7 · BOSS FINAL',
    title:'Synthèse<br>& perspectives',
    lead:'Prendre du recul sur la journée… et repartir avec un plan pour votre EPN.',
    steps:[['','Le chemin parcouru','🗺️'],['','L’essentiel à retenir','🎩'],['','Mon premier pas','📝']]
  }),
  notes:`<p>Version courte, trois slides et c’est fini. Garder du rythme et finir à l’heure.</p>`
});

/* ---------- M7-02 : le chemin parcouru ---------- */
const CHEMIN = [['🗝️','Escape game','Un problème, une équipe, un chrono.','Lire une dynamique de groupe en équipe.'],
  ['🤝','Pico Park','Tous égaux, tous dépendants.','Un jeu de divertissement détourné : le serious gaming.'],
  ['🪐','Hexagonia','Planifier, agir, faire le bilan.','Un serious game structuré, joué par étapes.'],
  ['🛠️','Atelier','Votre propre activité gamifiée.','Concevoir avec un objectif, des mécaniques et un débriefing.']];
Deck.slide({
  id:'M7-02', title:'Le chemin parcouru', kicker:'Récapituler', time:'5 min',
  html:`
  <h2>Le chemin parcouru</h2>
  <div class="grid g4 m7-path">
    ${CHEMIN.map(([i,t,v,a])=>`<button class="flip m7-step"><div class="flip-in">
      <div class="flip-face m7-f"><span class="big">${i}</span><b>${t}</b><span>${v}</span><span class="pixel">CE QUE ÇA MONTRE ?</span></div>
      <div class="flip-face flip-back m7-b"><p>${a}</p></div></div></button>`).join('')}
  </div>
  <div class="callout" style="margin-top:18px">🔁 À chaque fois, la même structure : <b>présenter peu, jouer par étapes, débriefer toujours.</b></div>`,
  notes:`<p>Faire retourner les cartes par les participants : « Qu’est-ce que ce jeu nous a appris sur le jeu ? »</p>`
});

/* ---------- M7-03 : l'essentiel ---------- */
const VIG = [['🔧','La technique','Installer et tester la veille. Prévoir un plan B sans écran.'],
  ['⚖️','Les droits et le PEGI','Usage public autorisé ? Âge conseillé sur pegi.info.'],
  ['💸','Les jeux « gratuits »','Publicités, achats intégrés, données : lire avant d’installer.'],
  ['🫶','Le consentement','On ne force jamais à jouer. Ne pas jouer, ce n’est pas ne pas participer. Proposer un rôle d’observateur.']];
Deck.slide({
  id:'M7-03', title:'L’essentiel à retenir', kicker:'Retenir', time:'',
  html:`
  <div class="split" style="grid-template-columns:1fr 1fr;align-items:start">
    <div>
      <h2>Votre rôle de maître du jeu</h2>
      <div class="grid" style="gap:10px">
        <div class="card"><b>🎬 Avant</b><p class="small" style="margin:0">Présenter peu. Juste ce qu’il faut pour démarrer.</p></div>
        <div class="card"><b>🎮 Pendant</b><p class="small" style="margin:0">Observer, accompagner, ne pas prendre la souris.</p></div>
        <div class="card acc"><b>💬 Après</b><p class="small" style="margin:0">Débriefer, toujours. C’est là que le jeu devient apprentissage.</p></div>
      </div>
    </div>
    <div>
      <h3>Quatre points de vigilance</h3>
      <div class="grid g2 m7-vig2">${VIG.map(([i,t,d])=>`<div class="card m7-vig"><span class="big">${i}</span><b>${t}</b><p class="small">${d}</p></div>`).join('')}</div>
    </div>
  </div>`,
  notes:`<p>Rôle de « maître du jeu sérieux » d’après le réseau Ludus (cité par le Louvain Learning Lab). Vigilances tirées du Manuel de pédagogie vidéoludique (FOr’J, 2022).</p>
  <p>Loot boxes, la Commission des jeux de hasard belge les considère comme des jeux de hasard depuis 2018.</p>`
});

/* ---------- M7-04 : mon premier pas ---------- */
Deck.slide({
  id:'M7-04', title:'Mon premier pas', kicker:'Repartir', time:'',
  html:`
  <h2>Dans mon EPN, je commence par…</h2>
  <div class="split" style="grid-template-columns:1.2fr .8fr;align-items:start">
    <div class="grid" style="gap:12px">
      <div class="field"><label>🧪 Le jeu ou l’activité que je teste en premier</label><textarea rows="3" data-store="m7:teste" placeholder="Ex. : Pico Park avec mon groupe de jeunes du mercredi"></textarea></div>
      <div class="field"><label>📅 Avec qui, et quand ?</label><textarea rows="2" data-store="m7:quand" placeholder="Ex. : avant les vacances de Noël"></textarea></div>
      <div class="hx-btnrow no-print"><button class="btn alt" data-print>🖨 Imprimer</button></div>
    </div>
    <div class="card res-qr m7-qr"><img src="assets/esciences/qr-ressources.png?v=2" alt="QR code du mur de ressources"><p>Toutes les ressources de la journée</p><span class="small">miniurl.be/r-6zpn</span></div>
  </div>`,
  notes:`<p>Chacun·e écrit son premier pas, puis tour rapide à voix haute (une phrase par personne). Un plan avec une date a bien plus de chances d’aboutir.</p>`
});

/* ---------- M7-05 : merci ---------- */
Deck.slide({
  id:'M7-05', title:'Merci !', time:'', cls:'dark',
  html:`
  <div class="m7-end">
    <span class="pixel tp-kicker">GAME COMPLETE · 8 BADGES</span>
    <h1>Merci d’avoir joué !</h1>
    <p class="lead">Et maintenant, à vous de faire jouer.</p>
    <img src="assets/esciences/logo-blanc.svg" alt="eSCIENCES" class="m7-logo">
    <p class="m7-contact">✉️ tommy@esciences.be &nbsp;·&nbsp; 🌐 <a href="https://www.esciences.be" target="_blank" rel="noopener">www.esciences.be</a></p>
    <p class="m7-contact">Le support en ligne · <a href="https://esciences.github.io/formations/" target="_blank" rel="noopener">esciences.github.io/formations</a></p>
    <div class="m7-reflex no-print"><button class="btn" data-reflex>🖨 Imprimer mes réflexions</button><span>Toutes vos notes de la journée sur une fiche A4. Choisissez « Enregistrer en PDF » pour la garder.</span></div>
  </div>`,
  notes:`<p>Rappeler l’envoi des ressources par mail. Remercier le SPW et les EPN présents.</p><p>Le bouton « Imprimer mes réflexions » rassemble tout ce qui a été écrit dans les zones de texte (et les grilles, mécaniques choisies) sur une fiche A4 portrait. Les notes restent dans le navigateur de chaque poste.</p>`
});
})();
