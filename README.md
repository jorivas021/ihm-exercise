# 🎓 Refonte Ergonomique — Formulaire d'Inscription en Ligne (ESGAE)

> **Projet académique d'Interface Homme-Machine (IHM)** réalisé dans le cadre du Chapitre 1 (*Fondements de l'IHM*).
>
> Ce dépôt présente l'analyse ergonomique du formulaire d'inscription initial de l'**ESGAE** ainsi que sa refonte interactive axée sur l'expérience utilisateur (UX).

## 🌐 Démonstration en ligne (GitHub Pages)

👉 **Accéder à l'interface interactive :** `https://jorivas021.github.io/ihm-exercise/`

*(Note pour la soutenance : Cliquez sur le bouton **"Mode Présentation IHM"** en haut à droite de l'interface pour afficher les annotations pédagogiques reliant chaque composant aux critères ergonomiques.)*

## 📋 Contexte & Objectifs de l'exercice

À partir d'une maquette de formulaire présentant des défauts majeurs d'utilisabilité, le travail demandé consistait à :

1. **Identifier quatre (4) problèmes ergonomiques** entravant la saisie et la compréhension de l'utilisateur.

2. **Proposer une amélioration concrète** pour chaque problème identifié (en s'appuyant notamment sur les critères ergonomiques de **Bastien & Scapin**).

3. **Concevoir et développer un prototype fonctionnel** offrant une expérience fluide, intuitive et agréable à l'utilisateur.

## 🔍 Analyse Ergonomique : Avant / Après

| \# | Critère IHM (Bastien & Scapin) | ❌ Problème sur le formulaire initial | ✅ Solution implémentée dans la refonte | 
| ----- | ----- | ----- | ----- | 
| **1** | **Guidage & Lisibilité** | Les 5 champs de saisie sont vides et uniquement repérés par des pastilles numérotées (`1` à `5`), sans aucun libellé explicite. | Ajout de **labels clairs** au-dessus de chaque champ, d'icônes sémantiques et d'exemples de saisie (*placeholders*). | 
| **2** | **Gestion des erreurs** | Un seul message d'erreur vague et global affiché tout en bas (*"Certains champs sont invalides ou manquants"*). | Affichage de **messages d'erreur contextuels et ciblés** directement sous le champ concerné avec mise en évidence visuelle. | 
| **3** | **Incitation & Homogénéité** | Aucune distinction entre les informations obligatoires et les informations facultatives. | Signalisation claire des champs obligatoires via un **astérisque rouge (`*`)** et mention explicite **`Optionnel`** pour le téléphone. | 
| **4** | **Rétroaction (*Feedback*) & Contrôle** | Le bouton *"Envoyer"* est statique et aucun retour en temps réel n'indique si la saisie est correcte. | **Validation en temps réel** (bordure verte + icône ✔️), **barre de progression dynamique** et activation intelligente du bouton d'envoi. | 

## ✨ Fonctionnalités actuelles (v1.0 - Provisoire)

* **Identité visuelle institutionnelle :** Charte graphique adaptée à l'ESGAE, sobre et rassurante.

* **Validation dynamique en temps réel :** Vérification instantanée de la longueur des noms/prénoms, du format d'adresse e-mail et du numéro de téléphone congolais (`+242`).

* **Indicateur de progression :** Barre de complétion calculée en direct selon les champs obligatoires validés.

* **Modale de confirmation récapitulative :** Fenêtre de synthèse permettant à l'étudiant de vérifier ses informations après soumission.

* **Mode Présentation IHM intégré :** Bouton interactif permettant de faire apparaître ou disparaître les bulles explicatives lors de la soutenance.

* **Responsive Design :** Interface adaptée aux ordinateurs, tablettes et smartphones.

## 🛠️ Technologies utilisées

* **HTML5** (Structure sémantique et attributs d'accessibilité)

* **Tailwind CSS** (Mise en page moderne, responsive et états visuels)

* **JavaScript Vanilla (ES6+)** (Logique de validation temps réel, gestion d'état et interactions DOM)

* **FontAwesome & Google Fonts (Inter)** (Iconographie et typographie)

## 🚀 Installation & Utilisation locale

Aucune dépendance complexe n'est requise pour lancer le projet :

```
# 1. Cloner le dépôt
git clone https://github.com/jorivas021/ihm-exercise.git

# 2. Ouvrir le dossier du projet
cd ihm-exercise

# 3. Ouvrir index.html directement dans votre navigateur web

```

## 🗓️ Feuille de route (Améliorations prévues jusqu'à mercredi)

* \[x\] **Étape 1 :** Analyse des 4 problèmes ergonomiques et maquettage fonctionnel (`index.html`).

* \[x\] **Étape 2 :** Implémentation du *Mode Présentation IHM* et publication sur GitHub Pages.

* \[ \] **Étape 3 :** Ajout de fonctionnalités d'accessibilité avancées (navigation clavier optimisée, attributs ARIA complets).

* \[ \] **Étape 4 :** Ajout d'un sélecteur de filières dynamiques selon le niveau d'études choisi (ex: Génie Logiciel, Gestion, Finance...).

* \[ \] **Étape 5 :** Tests utilisateurs rapides et ajustements finaux avant la présentation de mercredi.

## 👥 Équipe projet

* **José Gloire “Rivas” BOKITOMO** — *Dévéloppeur Fullstack*

* *(Ajouter ici les noms des autres membres du groupe si applicable)*