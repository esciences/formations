# Level Up · Le jeu comme vecteur d'apprentissage

Support de formation interactif pour animateurs EPN : intégrer le jeu et le jeu vidéo comme vecteur d'apprentissage, gamifier les activités de formation.
Tommy Berben · eSCIENCES

## Ouvrir le support
Double-cliquer sur `index.html` (fonctionne hors ligne) ou publier le dossier avec GitHub Pages.

Raccourcis : ← → naviguer · M carte des modules · P mode animateur (notes + chrono) · F plein écran.

## Structure
```
index.html            coquille du support (HUD, navigation, panneau animateur)
css/theme.css         thème global « Level Up »
css/hexagonia.css     décor et composants des modules Hexagonia
js/deck.js            moteur : tri des slides, XP/badges, composants interactifs
js/modeles.js         modèles de slides (ouverture, consigne d'étape, débrief flash)
modules/              un fichier par module
assets/<module>/      images de chaque module
```

## Convention
- Chaque slide porte un identifiant `M<n>-<nn>` (ex. `M4-03`). Le moteur trie tout seul par module puis par numéro : l'ordre de création n'a aucune importance.
- La liste complète des modules (titres, durées, badges) est déclarée dans `modules/m0-accueil.js`. Un module sans slide apparaît « en construction » sur la carte.
- Ajouter un module = créer `modules/mX-nom.js` et l'ajouter dans `index.html`.

## Avancement
- [x] M0 – Accueil & lancement (6 slides)
- [ ] M1 – Escape game débranché (à concevoir : kit à créer)
- [x] M2 – Jouer, gamifier, ludifier : on démêle (11 slides)
- [x] M3 – Pico Park : coopérer ou périr (10 slides)
- [x] M4 – Hexagonia : prise en main (7 slides)
- [x] M5 – Hexagonia : jouer & débriefer (17 slides)
- [x] M6 – Atelier : gamifier une activité EPN (10 slides)
- [x] M7 – Synthèse & perspectives (8 slides)
- [ ] Boîte à outils

Visuels Hexagonia : Maracas Studio / Technobel (hexagonia.be), repris du guide professeur.
