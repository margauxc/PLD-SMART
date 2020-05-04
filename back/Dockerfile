# Node v16, image utilisée pour ce container
FROM node:8.16-alpine

# On définit le dossier root du projet dans le container docker 
WORKDIR /usr/src/app

# On copie les différents fichiers de configuration et de gestion de dépendances.
COPY ["package.json", "./"]

COPY . /usr/src/app

# Installation des dépendances
RUN npm install 

# Port sur lequel va tourner le server
EXPOSE 3500

ADD crontab.txt /crontab.txt
COPY entry.sh /entry.sh
RUN chmod 755  /entry.sh
RUN /usr/bin/crontab /crontab.txt

# Commande de démarrage
CMD ["npm", "run","prod"]