### convert the postman collection to openapi specs
```bash
npm i postman-to-openapi -g
p2o ref/dockerhub/Docker_HUB_API.postman_collection.json -f ref/dockerhub/dockerhub-openapi.yaml -o ref/dockerhub/options.json
```