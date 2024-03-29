# Complect 2.0 Frontend
[![Client Test](https://github.com/complectco/complect-2.0/actions/workflows/client-test.yml/badge.svg)](https://github.com/complectco/complect-2.0/actions/workflows/client-test.yml) 
[![API Test](https://github.com/complectco/complect-2.0/actions/workflows/api-test.yml/badge.svg)](https://github.com/complectco/complect-2.0/actions/workflows/api-test.yml) 
[![API Deploy (Dev)](https://github.com/complectco/complect-2.0/actions/workflows/api-dev-deploy.yml/badge.svg)](https://github.com/complectco/complect-2.0/actions/workflows/api-dev-deploy.yml)


## StandardJS coding style
We use https://standardjs.com/rules.html with some exceptions

*One exception: it is natural to use camelCase on frontend js, but backend accepts underscore_style, so let's use camelCase for everything js, but for form properties and all data sent to backend use underscore (e.g. it's OK to write c-field(v-model="form.user_email" some-attribute="someJsVariable"))

## Demo Site
app.complect.dev

login: `dev`  
password: `preview`


## Useful links:
[Tasks Board](https://github.com/complectco/complect-2.0/projects/3)  
[Wiki](https://github.com/complectco/complect-2.0/wiki)  
[Mock-ups](https://www.figma.com/file/ZuxzZnGy8PR8bDR6dUts8u/Complect-Design-System?node-id=350%3A562)  
[Legacy App](https://demo.complect.com)  
[AWS Console (Dev Stage)](https://complect-dev.signin.aws.amazon.com/console)  
[AWS Console (Production Stage)](https://complect.signin.aws.amazon.com/console)


## Run Project:
To start complete project with *Client*, *API*, just run:
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
