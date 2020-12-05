[![Actions Status: test](https://github.com/eddwinpaz/ripley-assestment-backend/workflows/test/badge.svg)](https://github.com/eddwinpaz/ripley-assestment-backend/actions?query=is:success")

# ripley Assestment Backend

## To Run Application using Docker

```
docker-compose build && docker-compose up -d
```

## Enable text search on mongoDB
- You need to enter via bash on mongoDB Instance and select Database and apply index using the following command.

```
db.products.createIndex( { marca: "text", descripcion: "text", nombre: "text" } )
```

https://github.com/eddwinpaz/ripley-assestment-backend


