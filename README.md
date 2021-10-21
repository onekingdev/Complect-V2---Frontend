# Complect 2.0
[![Client Build](https://github.com/complectco/complect-2.0/actions/workflows/client-public.yml/badge.svg)](https://github.com/complectco/complect-2.0/actions/workflows/client-public.yml)

## Run Project
Run: `docker-compose up` to start *Client*, *API*, *Server*, *MongoDB* and *MongoDB Admin* services.

### Ports:
* [localhost:81](http://localhost:81/) - Client (*front-end*)
* `localhost:82` - API
* `localhost:83` - Server
* `localhost:84` - MongoDB
* [localhost:85](http://localhost:85/) - MongoDB Admin ([more](#mongodb-admin))


## API Endpoints (Development and Tests)

### Create Documents
Post Json to `localhost:82/v1/db/collection/`, where `db` - database name and `collection` - collection name. Data format - `Array` with one/multiple objects inside:

#### Example:
`POST` to `localhost:82/v1/demo/users/`:

---

## MongoDB Admin
* Navigate to: [localhost:85](http://localhost:85/)
* Connection Name: `Any`
* Connection String: `mongodb://user:password@mongo:27017`
* Press **Add Connection**
* Click **Connect** in right Action Tab, to enter.


---

## ToDo
* Docker Scenarios:
  * full local env (local api, server & db);
  * full atlas env (local api, server & cloud db);
  * client atals env (client + cloud api, server & db);
  * api local env (local api + cloud server & db);
  * full tests;