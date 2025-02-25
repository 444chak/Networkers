# :mortar_board: Networkers

> SAé5-1  

## :memo: • Description

Networkers est un projet de 3ème année de l'IUT de Vélizy.  
Il consiste en une application pour apprendre des notions sur les réseaux informatiques.  

## :rocket: • Pour commencer

### :package: • Pré-requis

Avant d’installer Networkers, assurez-vous d’avoir les outils suivants :

- [Python2.5 (et plus)](https://www.python.org/downloads/release/python-250/)
- [Docker](https://docs.docker.com/get-docker/)
- [Git (optionnel, recommandé pour cloner le dépôt)](https://git-scm.com/downloads)

**Installation de git sur les distributions Linux :**

```bash
sudo apt-get update
sudo apt-get install git
```

**Installation de Python sur les distributions Linux :**

```bash
sudo apt-get update
sudo apt-get install python
```

**Installation de Docker sur les distributions Linux :**

```bash
sudo apt-get update
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

---

## :inbox_tray: • Installation et configuration

### 1️⃣ Récupération du projet

#### 📌 Option 1 : Clonage depuis GitHub (recommandé)

Si vous avez Git installé, ouvrez un terminal et exécutez les commandes suivantes :

```bash
# Vérifier que Git est installé

git --version  

# Cloner le dépôt

git clone https://github.com/444chak/Networkers.git  

# Se déplacer dans le dossier du projet

cd Networkers
```

#### 📌 Option 2 : Téléchargement et extraction de l’archive ZIP

Si vous ne souhaitez pas utiliser Git :

1. Rendez-vous sur le [dépôt GitHub](https://github.com/444chak/Networkers.git).
2. Cliquez sur "**Code**" > "**Download ZIP**".
3. Extrayez l’archive dans le dossier de votre choix.

**Sous Linux/macOS :**

- Utilisez la commande suivante pour extraire l’archive dans le répertoire actuel :

```bash
unzip Networkers-main.zip
cd Networkers-main
```

Si la commande `unzip` n’est pas disponible, installez-la avec :

```bash
sudo apt install unzip  # Pour Debian/Ubuntu  
sudo pacman -S unzip    # Pour Arch Linux  
sudo yum install unzip  # Pour CentOS/RHEL  
```

**Sous Windows :**

- Méthode 1 (Graphique) :

  - Faites un clic droit sur le fichier ZIP > Extraire tout > Choisissez un dossier > Extraire.
Méthode 2 (PowerShell) :

```pwsh
Expand-Archive -Path C:\Chemin\Vers\Networkers-main.zip -DestinationPath C:\Chemin\Vers\Networkers
cd C:\Chemin\Vers\Networkers
```

### 2️⃣ Configuration initiale

:warning: Faites attention à bien exécuter les commandes suivantes dans le dossier du projet. (ex. `cd Networkers`)

- Exécutez le script de configuration des variables d’environnement :

```bash
python3 set_env.py # ou python set_env.py ou py set_env.py si ça ne fonctionne pas
```

- Ajoutez votre utilisateur au groupe Docker (Linux uniquement) :

```bash
sudo usermod -aG docker <user>
```

- Se déconnecter et se reconnecter pour que les changements soient pris en compte.  

### :rocket: • Démarrage

```bash
cd Networkers
docker compose up # ou docker-compose up si vous avez une version antérieure à la 20.10
# vous pouvez ajouter l'option -d pour lancer les conteneurs en arrière-plan
```

### :warning: • Problèmes courants

#### :warning: • Docker n’est pas démarré

Si vous avez une erreur de type `ERROR: Couldn't connect to Docker daemon at http+docker://localhost - is it running?`, c’est que Docker n’est pas démarré.  

- Sous Linux, exécutez `sudo systemctl start docker` pour démarrer Docker.  
- Sous Windows, recherchez Docker dans le menu Démarrer et lancez-le.

#### :warning: • Port déjà utilisé

Si vous avez une erreur de type :

```text
ERROR: for api  Cannot start service api: driver failed programming external connectivity on endpoint networkers-api (034c38fd6d6ac6e451319c9dae999b9f09961d0ed2d736e4a88cbfccc1e0ae27): Bind for 0.0.0.0:8000 failed: port is already allocated
ERROR: Encountered errors while bringing up the project.
```

Cela signifie que le port 8000 est déjà utilisé. Vous pouvez changer le port dans le fichier `docker-compose.yml` ou arrêter le service qui utilise le port 8000. (pour connaître le service qui utilise le port 8000, exécutez `sudo lsof -i :8000`)

#### :warning: • Problème de connexion à l'API

Si les interactions avec l'API ne fonctionnent pas (connexion, inscription, ...), c'est peut-être que vous utilisez l'application sur une machine distante. L'application n'a pas été conçue pour être utilisée sur une machine distante pour le moment. Dans ce cas, vous pouvez simplement modifier l'URL de l'API dans le fichier `front-js/src/axiosConfig.js` pour qu'elle pointe vers l'adresse IP de votre machine. Remplacez `http://localhost:8000` par `http://<adresse_de_la_machine>:8000`. (sur une machine linux, vous pouvez obtenir l'adresse IP de votre machine avec la commande `hostname -I` et modifier le fichier avec la commande `nano front-js/src/axiosConfig.js`)

Rédémarrez ensuite l'application avec `docker compose down` puis `docker compose up`.

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
docker exec -it Networkers-api bash
```

Accéder au client :  

```bash
docker exec -it Networkers-web bash
```

Accéder à la base de données :  

```bash
docker exec -it Networkers-db bash

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
