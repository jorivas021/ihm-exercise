# 🎓 Refonte Ergonomique — Formulaire d'Inscription en Ligne (ESGAE)

> **Projet académique d'Interface Homme-Machine (IHM)** réalisé dans le cadre du Chapitre 1 (*Fondements de l'IHM*).
>
> Ce dépôt présente l'analyse ergonomique du formulaire d'inscription initial de l'**ESGAE** ainsi que sa refonte interactive axée sur l'expérience utilisateur (UX) et l'accessibilité.

## 🌐 Démonstration en ligne (GitHub Pages)

👉 **Accéder à l'interface interactive :** `https://jorivas021.github.io/ihm-exercise`

*(Note pour la soutenance : Cliquez sur le bouton **"Mode Présentation IHM"** en haut à droite de l'interface pour afficher les annotations pédagogiques reliant chaque composant aux critères ergonomiques.)*

## 📋 Contexte & Objectifs de l'exercice

À partir d'une maquette de formulaire présentant des défauts majeurs d'utilisabilité, le travail demandé consistait à :

1. **Identifier quatre (4) problèmes ergonomiques** entravant la saisie et la compréhension de l'utilisateur.
2. **Proposer une amélioration concrète** pour chaque problème identifié (en s'appuyant sur les critères ergonomiques de **Bastien & Scapin**).
3. **Concevoir et développer un prototype fonctionnel** offrant une expérience fluide, intuitive, accessible et agréable à l'utilisateur.

## 🔍 Analyse Ergonomique : Avant / Après

| \# | Critère IHM (Bastien & Scapin) | ❌ Problème sur le formulaire initial | ✅ Solution implémentée dans la refonte | 
| ----- | ----- | ----- | ----- | 
| **1** | **Guidage & Lisibilité** | Les 5 champs de saisie sont vides et uniquement repérés par des pastilles numérotées (`1` à `5`), sans aucun libellé explicite. | Ajout de **labels clairs** associés aux champs, d'icônes sémantiques, d'attributs `ARIA` et d'exemples de saisie (*placeholders*). | 
| **2** | **Gestion des erreurs** | Un seul message d'erreur vague et global affiché tout en bas (*"Certains champs sont invalides ou manquants"*). | Affichage de **messages d'erreur contextuels et ciblés** (`role="alert"`) sous chaque champ invalide + dévoilement progressif des filières. | 
| **3** | **Incitation & Homogénéité** | Aucune distinction entre les informations obligatoires et les informations facultatives. | Signalisation claire des champs obligatoires via un **astérisque rouge (`*`)** et mention explicite **`Optionnel`** pour le téléphone. | 
| **4** | **Rétroaction (*Feedback*) & Contrôle** | Le bouton *"Envoyer"* est statique et aucun retour en temps réel n'indique si la saisie est correcte. | **Validation en temps réel** (bordure verte + icône ✔️), **barre de progression dynamique** et activation intelligente du bouton d'envoi. | 

## ✨ Fonctionnalités complètes (v2.0 - Prête pour soutenance)

* **Architecture modulaire propre :** Séparation nette entre la structure HTML/Tailwind (`index.html`) et la logique applicative JavaScript (`js/app.js`).
* **Dévoilement progressif (Filières dynamiques) :** Le sélecteur de spécialité ESGAE s'adapte dynamiquement au niveau d'études choisi (*Licence 1 à Master 2*) pour réduire la charge cognitive initiale.
* **Accessibilité avancée (WCAG / ARIA) :** Lien d'évitement rapide, support complet des lecteurs d'écran (`aria-invalid`, `aria-live`, `role="alert"`, `role="progressbar"`), gestion intelligente du focus en cas d'erreur et fermeture de la modale via la touche `Échap`.
* **Validation dynamique en temps réel :** Vérification instantanée des noms/prénoms, du format d'adresse e-mail et formatage automatique du numéro de téléphone congolais (`+242`).
* **Mode Présentation IHM intégré :** Bouton interactif permettant de faire apparaître ou disparaître les bulles explicatives devant le jury lors de la soutenance.

## 📂 Structure du projet

```text
├── index.html      # Structure sémantique HTML5, attributs ARIA et styles Tailwind CSS
├── README.md       # Documentation complète et analyse ergonomique du projet
└── js/
    └── app.js      # Logique de validation temps réel, filières dynamiques et accessibilité
```

## 🛠️ Technologies utilisées

* **HTML5** (Structure sémantique et attributs d'accessibilité ARIA)
* **Tailwind CSS** (Mise en page moderne, responsive et états visuels)
* **JavaScript Vanilla (ES6+)** (Logique modulaire isolée dans `js/app.js`)
* **FontAwesome & Google Fonts (Inter)** (Iconographie et typographie)

## 🚀 Installation & Utilisation locale

```bash
# 1. Cloner le dépôt
git clone https://github.com/jorivas021/ihm-exercise.git

# 2. Ouvrir le dossier du projet
cd ihm-exercise

# 3. Ouvrir index.html directement dans votre navigateur web
```

## 🗓️ Feuille de route (Terminée pour mercredi ✅)

* [x] **Étape 1 :** Analyse des 4 problèmes ergonomiques et maquettage fonctionnel (`index.html`).
* [x] **Étape 2 :** Implémentation du *Mode Présentation IHM* et configuration GitHub Pages.
* [x] **Étape 3 :** Séparation du code JavaScript dans un dossier dédié (`js/app.js`).
* [x] **Étape 4 :** Ajout des fonctionnalités d'accessibilité avancées (navigation clavier optimisée, focus automatique, attributs ARIA complets).
* [x] **Étape 5 :** Ajout du sélecteur dynamique de filières ESGAE selon le niveau d'études choisi.

## 👥 Équipe projet

* **José Gloire “Rivas” BOKITOMO** — *Développeur Fullstack*