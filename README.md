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

**Si Git n'est pas istaller :**  

```bash
sudo apt-get update
sudo apt-get install git
```

**Si Docker et Python ne sont pas installer :**  

```bash
sudo apt-get update
sudo apt-get install python

sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

:warning: Il faut installer Git avant Docker afin d'éviter des problèmes lors du clone.  

1. Lancer le script pour mettre en place les variables d'environnement.

```bash
python3 set_env.py
```

2. Ajouter son utilisateur au groupe Docker.  

```bash
sudo usermod -aG docker <user>
```

3. Se déconnecter et se reconnecter pour que les changements soient pris en compte.  

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
