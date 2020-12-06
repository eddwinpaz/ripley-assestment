[![Actions Status: test](https://github.com/eddwinpaz/ripley-assestment-backend/workflows/test/badge.svg)](https://github.com/eddwinpaz/ripley-assestment-backend/actions?query=is:success")

# Ripley Assestment Backend

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


## REST API / URLs

URL: https://ripley-backend-server.herokuapp.com/api/product/

- Search:  https://ripley-backend-server.herokuapp.com/api/product/?query=adidas HTTP/GET

- Get Products: https://ripley-backend-server.herokuapp.com/api/product/5fcc273a4565220017811b5f HTTP/GET

- Update Product: https://ripley-backend-server.herokuapp.com/api/product/ HTTP/PUT

- Delete Product: https://ripley-backend-server.herokuapp.com/api/product/ HTTP/DELETE

- Create Product: https://ripley-backend-server.herokuapp.com/api/product/ HTTP/POST

```
{
	"marca": "index",
	"imagen": "https://home.ripley.cl/store/Attachment/WOP/D308/2000378322030/2000378322030_2.jpg",
	"nombre": "SANDALIA INDEX IMEKO",
	"precio": 15000,
	"descripcion": "Juego Seccional Simétrico"
}
```
