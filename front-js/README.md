# :lipstick: NetWorkers Web

**Table des matières**  

- [Framework](#framework)
- [Mise en place](#mise-en-place)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Run](#run)
- [Codes](#codes)
  - [Architecture](#architecture)
  - [Environnement](#environnement)
- [Dépendances](#dépendances)

## Framework

- [Next.js](https://nextjs.org/)  
- [Tailwind CSS](https://tailwindcss.com/)  

## Mise en place

### Requirements

- [Node.js](https://nodejs.org/)

### Installation

```bash
npm install
```

### Run

```bash
npm run dev
```

## Codes

Le code est fait en TypeScript (`.ts` et `.tsx`).  

### Architecture

Dans le dossier `src/` :

- `components/`: composants utilisés dans les différentes pages  
- `app/`: pages de l'application  
  - `api/`: serveur API (next/server) qui permet de récupérer la common key permettant de communiquer avec le serveur API  
- `axiosConfig.ts`: configuration des requêtes Axios

### Environnement

L'application a besoin que la variable d'environnement suivante soit définie :

- COMMON_KEY  

> La variable d'environnement est déjà définie si l'application est lancée avec le Docker  

## Dépendances

L'applications dépend de l'API pour fonctionner. Il faut donc lancer l'API avant de lancer l'application front-end.  
