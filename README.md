# :mortar_board: NetWorkers

> SAé5-1  

## :memo: • Description

NetWorkers est un projet de 3ème année de l'IUT de Vélizy.  
Il consiste en une application pour apprendre des notions sur les réseaux informatiques.  

## :rocket: • Pour commencer

### :package: • Pré-requis

- [Python2.5 (et plus)](https://www.python.org/downloads/release/python-250/)
- [Docker](https://docs.docker.com/get-docker/)

### :inbox_tray: • Installation et configuration

1. Clonez la dernière version du projet ([releases](https://www.github.com/444chak/SAE-5/releases)).

```bash
REPO_URL="https://github.com/444chak/SAE-5.git"
LAST_TAG=$(git ls-remote --tags --sort="v:refname" $REPO_URL | tail -n 1 | awk '{print $2}' | sed 's/refs\/tags\///')
git clone --branch $LAST_TAG --single-branch $REPO_URL
```

> *Ce script vous permet de récupérer le code du dernier tag présent sur le projet.*  

2. Lancez le script pour mettre en place les variables d'environnement.

```bash
python set_env.py
```

### :rocket: • Démarrage

```bash
docker compose up
```

## :clipboard: • Documentation technique

- [#API](api/README.md)  
- [#Client](front-js/README.md)  

## :gear: • Technologies utilisées

- :snake: [Python](https://www.python.org/)  
- :satellite: [FastAPI](https://fastapi.tiangolo.com/)  
- :lipstick: [Next.js](https://nextjs.org/)  
- :whale: [Docker](https://www.docker.com/)  
- :floppy_disk: [MariaDB](https://mariadb.org/)  

## :wrench: • Maintenance

Pour maintenir ce projet, il est nécessaire de prendre connaissance des différentes documentations techniques ([#Documentation technique](#clipboard--documentation-technique)).  

Pour voir l'état des différents composants de l'application, vous pouvez exécuter la commande suivante :  

```bash
docker compose ps
```

Si vous devez accéder aux différents composants de l'applications, vous pouvez exécutez les commandes suivantes :  

Accéder à l'API :  

```bash
docker exec -it networkers-api bash
```

Accéder au client :  

```bash
docker exec -it networkers-web bash
```

Accéder à la base de données :  

```bash
docker exec -it networkers-db bash

mariadb -p
# Entrez le mot de passe que vous aviez défini dans le script set_env.py
```

Si vous avez besoin de redémarrer un composant de l'application, vous pouvez exécuter la commande suivante :  

```bash
docker compose restart <component>
```

Si vous devez arrêter l'application, vous pouvez exécuter la commande suivante :  

```bash
docker compose down
```

## :busts_in_silhouette: • Auteurs

- [**@Eliott BARKER**](https://wwww.github.com/Eliott-B)  
- [**@Maxence OUVRARD**](https://github.com/MaxOuvrard)  
- [**@Chakib OUALI**](https://github.com/444chak)  
- [**@Ilan RUBIO**](https://github.com/IlanRubio)  
- [**@Kylian GRAVIER**](https://github.com/SaAxok)  
