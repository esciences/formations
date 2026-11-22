# M1A · Exploiter le potentiel de l'IA dans son contexte professionnel

Support interactif du module M1A (parcours Référent·e IA, Technofutur TIC / eduLAB), refondu à partir du support Canva « V2 - M1A ».
Contenu réalisé : introduction, administratif, partie 2 « Se découvrir… et découvrir l'IA », partie 3 « Aux origines de l'IA », partie 4 « Les coulisses de l'IA », partie 5 « Réfléchir avant d'utiliser », ouverture du jour 2 et partie 6 « L'art du prompt » (bloc 1) (80 diapositives, jour 1 enrichi d'idées du support de M. Guisset).

## Version en ligne

En ligne : https://esciences.github.io/formations/m1a-referent-ia/

Dans cette version publique, des ressources tierces dont la licence reste à confirmer sont retirées provisoirement : l'infographie « Les dates clés de l'IA » (Supertilt), les photos des cartes de la frise et trois photos de chiens (remplacées par des pictogrammes). Elles restent présentes dans la version de travail.

## Lancer l'aperçu

- **Le plus simple** : double-clic sur `index.html`. Tout fonctionne hors ligne (polices et images incluses), y compris la vue présentateur.
- **Avec un petit serveur local** (facultatif, plus proche de GitHub Pages) : dans ce dossier, `python3 -m http.server 8000`, puis ouvrir http://localhost:8000.
- **Mode formateur** : ouvrir `index.html?formateur`, ou cocher « Mode formateur » dans le sommaire (touche S). Le réglage est mémorisé dans le navigateur.

## Raccourcis

| Touche | Action |
| --- | --- |
| → / Espace / Page suivante | Suivant (ou étape suivante d'une révélation) |
| ← / Page précédente | Précédent |
| Début / Fin | Première / dernière diapositive |
| S | Sommaire |
| F | Plein écran |
| B | Écran noir (mode formateur) |
| N | Notes formateur sur le même écran (mode formateur) |
| P | Vue présentateur dans une fenêtre séparée, synchronisée (mode formateur) |
| Échap | Fermer les panneaux |

Sur tablette : balayer vers la gauche ou la droite. Un lien direct vers une diapositive : `index.html#/12`.

**Projection sur deux écrans** : mettre la fenêtre principale en plein écran sur le projecteur, ouvrir la vue présentateur (P) sur l'ordinateur. Les deux fenêtres restent synchronisées dans les deux sens.

## Organisation des fichiers

```
index.html            toutes les diapositives, regroupées par partie (<section class="part">)
css/theme.css         palette et polices (charte du support original)
css/deck.css          moteur : scène 16:9, barre d'outils, sommaire, notes, vue présentateur, impression
css/slides.css        mises en page et composants des diapositives
js/deck.js            navigation, sommaire, plein écran, notes, synchronisation présentateur
js/components.js      onglets, révélations, copie, chronomètre, jeu de classement
assets/img/           images extraites du PDF (optimisées en WebP/PNG)
assets/qr/            QR codes régénérés en SVG (net à toute taille)
assets/fonts/         Montserrat et Nunito (licence SIL OFL, fichiers inclus)
```

Aucune dépendance externe, aucun traceur, aucune collecte : les cases cochées et les réponses restent dans le navigateur de chaque participant.

## Ajouter une partie

1. Dans `index.html`, copier une `<section class="part" data-num="6" data-label="L'art du prompt">` après la dernière partie.
2. Y placer des `<article class="slide t-teal|t-navy|t-paper" id="s-..." data-title="...">`. Ajouter `data-active="1"` pour une diapositive d'activité (repère dans le sommaire).
3. Mettre les notes dans `<aside class="notes">` à l'intérieur de la diapositive (jamais projetées).
4. Dans `window.DECK_PLAN` (en tête de `index.html`), passer la partie de `"upcoming"` à `"built"`.

Composants disponibles par simple balisage : `.fragment` (révélation au clavier), `[role="tablist"]` (onglets), `[data-reveal]`, `[data-copy]`, `.timer[data-minutes]`, `.sortgame` (classement avec feedback, choix libres), `[data-flip]` (carte à retourner), `[data-highlight]` (surlignage), `[data-dialog]` (fenêtre d'image), `.yt[data-yt]` (vidéo YouTube chargée au clic, sans cookies), `input[data-store]` (champ modifiable mémorisé dans le navigateur, ex. code FSE ; `?fse=0589` dans l'URL l'impose), `.qr-card`, `.tagbox` (consigne), `.meta` (durée et modalité).

## Impression / PDF

Ctrl+P depuis le navigateur : une diapositive par page, toutes les étapes révélées.

## Licence

Contenu : Tommy Berben, CC BY-NC-SA 4.0. Polices : SIL Open Font License (voir `assets/fonts/`).
