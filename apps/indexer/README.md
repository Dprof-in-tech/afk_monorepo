# Setup

## Install Apibara

## Install Postgres and Init the tables

```
docker run --name afk-indexer -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 -v /afk-indexer:/docker-entrypoint-initdb.d postgres:16
```

# Test

unrugmeme_deploy

```
apibara run ./src/pump-buy-coin.js -A dna_XXX


```


## Docker test

```
 docker build -t afk-indexer .

```

 ### Run it
 docker run -it --env-file ./.env afk-indexer run /app/pump-deploy-coin.js --tls-accept-invalid-certificates=true --connection-string POSTGRES:INDEXER_DATABASE_URL