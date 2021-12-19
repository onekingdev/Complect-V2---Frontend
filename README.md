# Complect 2.0
[![Client Build](https://github.com/complectco/complect-2.0/actions/workflows/client-public.yml/badge.svg)](https://github.com/complectco/complect-2.0/actions/workflows/client-public.yml)

## Live versions
* [Public Stage](https://next.complect.com)
* [Dev Stage](https://dev.next.complect.com)  
login: `next`  
password: `preview`

## Run Project
Run: `docker-compose up` to start *Client*, *API*, *MongoDB* and *MongoDB Admin* services.


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
