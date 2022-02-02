# Complect 2.0
[![Client Test](https://github.com/complectco/complect-2.0/actions/workflows/client-test.yml/badge.svg)](https://github.com/complectco/complect-2.0/actions/workflows/client-test.yml) 
[![API Test](https://github.com/complectco/complect-2.0/actions/workflows/api-test.yml/badge.svg)](https://github.com/complectco/complect-2.0/actions/workflows/api-test.yml) 
[![API Deploy (Dev)](https://github.com/complectco/complect-2.0/actions/workflows/api-dev-deploy.yml/badge.svg)](https://github.com/complectco/complect-2.0/actions/workflows/api-dev-deploy.yml)


## Live versions
* [Dev Stage](https://app.complect.dev)  
* [Public Stage](https://app.complect.com)

login: `next`  
password: `preview`


## Useful links:
[Tasks Board](https://github.com/complectco/complect-2.0/projects/3)  
[Wiki](https://github.com/complectco/complect-2.0/wiki)  
[Mock-ups](https://www.figma.com/file/ZuxzZnGy8PR8bDR6dUts8u/Complect-Design-System?node-id=350%3A562)  
[Legacy App](https://demo.complect.com)  
[AWS Console (Dev Stage)](https://complect-dev.signin.aws.amazon.com/console)  
[AWS Console (Production Stage)](https://complect.signin.aws.amazon.com/console)


## Run Project:
To start complete project with *Client*, *API*, *MongoDB* and *MongoDB Admin* services, just run:
```sh
docker-compose up
```

If you plan to work only with *Client App* and use cloud *API*, run:
```sh
docker-compose -f docker-compose.client.yml up
```

To start only *API*, *MongoDB* and *MongoDB Admin* services, run:
```sh
docker-compose -f docker-compose.api.yml up
```

### Ports:
* [localhost:5000](http://localhost:5000/) - Client (*front-end*)
* `localhost:5001` - API
* `localhost:5002` - MongoDB
* [localhost:5003](http://localhost:5003/) - MongoDB Admin ([more](#mongodb-admin))

---

## MongoDB Admin
* Navigate to: [localhost:5003](http://localhost:5003/)
* Connection Name: `Any`
* Connection String: `mongodb://user:password@mongo:27017`
* Press **Add Connection**
* Click **Connect** in right Action Tab, to enter.
