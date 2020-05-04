# Installation
```
npm install
```
- Lancer une base MySQl "smart"
- Copier et adapter le .env comme dans le template ci dessous
- en faire un .env.development et .env.test pour les deux environnements
# RUN
``` 
npm start
```

# Publish image
sudo docker build -t arthurtndr/smart . && sudo docker push arthurtndr/smart

# RUN in prod
sudo docker run -p 3500:3500 arthurtndr/smart
# Documentation

https://www.npmjs.com/package/documentation

Générer la documentation -> "documentation build src/** -f html -o docs"

# Template du .env

## Port

PORT=3000

## Logs

LOG_LEVEL=silly

## Database

SQL_DATABASE_URL=
DATABASE_NAME=smart
DATABASE_USER=touristguy
DATABASE_PASSWORD=password
DATABASE_HOST=localhost
DATABASE_DIALECT=mysql
DATABASE_RESET_ALL=true
DATABASE_PORT=3306
