# Complect 2.0
[![Client Build](https://github.com/complectco/complect-2.0/actions/workflows/client-public.yml/badge.svg)](https://github.com/complectco/complect-2.0/actions/workflows/client-public.yml)

## Run Project
Run: `docker-compose up` to start *Client*, *API*, *MongoDB* and *MongoDB Admin* services.

### Ports:
* [localhost:81](http://localhost:81/) - Client (*front-end*)
* `localhost:82` - API
* `localhost:83` - MongoDB
* [localhost:84](http://localhost:84/) - MongoDB Admin ([more](##mongodb-admin))


## API Endpoints (Development and Tests)

### Create Documents
Post Json to `localhost:82/v1/db/collection/`, where `db` - database name and `collection` - collection name. Data format - `Array` with one/multiple objects inside:

#### Example:
`POST` to `localhost:82/v1/demo/users/`:

```js
[
  {
    "fist_name": "John",
    "last_name": "Smith",
    "photo": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTMyfHxwZW9wbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=60&q=60"
  }
]
```
---

### Read Documents
Send `GET` request to `localhost:82/v1/db/collection/`, where `db` - database name and `collection` - collection name, to get **all** Documents. Or send `GET` request to `localhost:82/v1/db/collection/document_id`, where `document_id` - is `id` from databse.

#### Example:
`POST` to `localhost:82/v1/demo/users/` or `localhost:82/v1/demo/users/616ab334cfa59c15bb12bd65`

---

### Update Document
Send `PUT` request to `localhost:82/v1/db/collection/document_id`, where `db` - database name, `collection` - collection name and `document_id` - is `id` from databse. Data format - `Object`.

#### Example:
`PUT` to `localhost:82/v1/demo/users/616ab334cfa59c15bb12bd65`:

```js
{
   "fist_name": "Steven"
}
```

---

### Delete Documents
Send `DELETE` request to `localhost:82/v1/db/collection/document_id`, where `db` - database name, `collection` - collection name and `document_id` - is `id` from databse.

#### Example:
`DELETE` to `localhost:82/v1/demo/users/` to delete all records in collection, or `localhost:82/v1/demo/users/616ab334cfa59c15bb12bd65` to delete record by `ID`

---

## MongoDB Admin
* Navigate to: `localhost:84`
* Connection Name: `Any`
* Connection String: `mongodb://user:password@mongo:27017`
* Press Connect, to get controls over MongoDB
