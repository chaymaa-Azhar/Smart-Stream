# Smart Stream

Application web de **TV en direct (IPTV)** : un panneau latéral liste les chaînes, une zone d'affichage montre la chaîne sélectionnée. Les données sont consommées depuis une API REST simulée avec **MockAPI**, via la **Fetch API**.

Projet individuel réalisé dans le cadre du brief « Smart Stream » (09/11/2026 → 13/11/2026).

---

## 1. Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| Chargement des données | Requête `GET` vers MockAPI avec `async/await` et `try/catch/finally` |
| État de chargement | Spinner affiché pendant la requête, masqué ensuite |
| État d'erreur | Message clair (404, erreur serveur, problème réseau) + bouton **Réessayer** |
| Liste des chaînes | Logo, numéro, nom et catégorie de chaque chaîne |
| Prévisualisation | Clic sur une chaîne : image de couverture, numéro, nom et catégorie à droite |
| Chaîne active | La chaîne sélectionnée est mise en surbrillance dans la liste |
| Recherche instantanée | Filtre par **nom** ou **numéro** à chaque frappe |
| Filtre par catégorie | Menu déroulant (TOUS, GÉNÉRALISTE, SPORT, ENFANTS, DOCUMENTAIRE, MUSIQUE) combiné avec la recherche |

**Bonus (non réalisés pour l'instant)** : lecteur vidéo interactif (`streamUrl`) et guide des programmes EPG avec barre de progression. Les données (`streamUrl`, `epg`) sont déjà présentes dans l'API.

---

## 2. Technologies

- **HTML5**
- **JavaScript ES6+** (modules ES, `async/await`, destructuring, spread, fonctions fléchées, `map`, `filter`, `find`)
- **Tailwind CSS** (classes utilitaires uniquement, via Tailwind CLI)
- **MockAPI** (API REST de test)
- **Git / GitHub** (branches fonctionnelles, Conventional Commits, Pull Requests)

---

## 3. Structure du projet

```
Smart Stream/
├── index.html            # Page unique : header, sidebar, zone de prévisualisation
├── README.md
├── Data/
│   └── data.json         # Données initiales (15 chaînes) pour alimenter MockAPI
├── css/
│   ├── input.css         # Entrée Tailwind
│   └── output.css        # CSS généré par Tailwind CLI
├── js/
│   ├── main.js           # Chef d'orchestre : états, événements, filtres
│   ├── api.js            # Couche services : requêtes HTTP (Fetch)
│   └── ui.js             # Couche affichage : liste, prévisualisation, chaîne active
└── src/
    └── images/           # Images locales
```

### Séparation des responsabilités

| Fichier | Rôle | Ce qu'il ne fait pas |
|---|---|---|
| `api.js` | Récupérer les données, contrôler `response.ok`, lever des erreurs | Ne touche jamais au DOM |
| `ui.js` | Construire et mettre à jour l'affichage | Ne fait aucune requête réseau |
| `main.js` | Orchestrer : appelle l'API, gère loading/erreur, écoute les événements | Ne contient pas le HTML des cartes |

---





## 5. API (MockAPI)

- **Endpoint** : `https://6af348f3d2377d6c3704d1d5.mockapi.io/channels`
- **Méthode utilisée par l'application** : `GET /channels`

### Format d'une chaîne

```json
{
  "id": "1",
  "channelNumber": "101",
  "name": "2M",
  "category": "GÉNÉRALISTE",
  "logo": "https://...",
  "previewImage": "https://...",
  "streamUrl": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  "isLive": true,
  "epg": {
    "currentProgram": "Journal de 20h",
    "startTime": "20:00",
    "endTime": "20:45",
    "progressPercentage": 60
  }
}
```

### Gestion des codes HTTP

`fetch` ne rejette la promesse que pour une erreur réseau. Pour les erreurs HTTP, la propriété `response.ok` est vérifiée manuellement :

| Cas | Comportement |
|---|---|
| `200` (`response.ok`) | Les données JSON sont retournées |
| `404` | Erreur « Ressource introuvable » |
| `500` et plus | Erreur « Erreur du serveur » |
| Autre code | Erreur « Erreur HTTP » avec le code |
| Pas de connexion | `fetch` lève une `TypeError`, attrapée par le `catch` de `main.js` |

---

## 6. Installation et lancement

### Prérequis

- Node.js (version 18 ou plus)
- VS Code avec l'extension **Live Server**

### Étapes

```bash
# 1. Cloner le dépôt
git clone https://github.com/chaymaa-Azhar/Smart-Stream.git
cd Smart-Stream

# 2. Installer Tailwind CSS
npm install

# 3. Lancer Tailwind en mode watch (dans un terminal dédié)
npx tailwindcss -i ./css/input.css -o ./css/output.css --watch
```

4. Ouvrir `index.html` avec **Live Server** (clic droit, *Open with Live Server*).

> Les modules ES ne fonctionnent pas en ouvrant le fichier par double-clic (`file://`). Un serveur local est obligatoire.


## 7. Workflow Git

### Branches

| Branche | Rôle |
|---|---|
| `main` | Version stable |
| `develop` | Branche d'intégration |
| `feature/mockapi-service` | Service API, états loading/erreur |


### Règles

1. Une branche par fonctionnalité, créée depuis `develop`.
2. Pull Request vers `develop`.
3. Vérification du code avant chaque intégration.
4. Fusion de `develop` dans `main` après validation finale.

### Convention de commits (Conventional Commits)

| Préfixe | Usage | Exemple |
|---|---|---|
| `feat:` | Nouvelle fonctionnalité | `feat: add instant search by name or channel number` |
| `fix:` | Correction de bug | `fix: use same variable name for channels list` |
| `style:` | Mise en forme / Tailwind | `style: simplify layout with gray theme` |
| `docs:` | Documentation | `docs: add README` |
| `chore:` | Configuration, structure | `chore: add project structure` |




