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

---

## MongoDB Admin
* Navigate to: [localhost:85](http://localhost:85/)
* Connection Name: `Any`
* Connection String: `mongodb://user:password@mongo:27017`
* Press **Add Connection**
* Click **Connect** in right Action Tab, to enter.
