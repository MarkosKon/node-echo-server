# Node echo server

A server that responds with HTTP `200` and logs the HTTP headers and body of the request in the `requests.txt` file. It's useful for development.

```bash
$ npm run start

Server listening on port 3000
Server listening on port 3443
```

Make an HTTP request in a new console:

```bash
$ curl --json '{ "message": "Hello World" }' 'https://localhost:3443/hello/world'
Done!
```

And if you look in the first console:

```bash

POST /hello/word HTTP/1.1 2025-12-27T18:28:54.290Z

HTTP headers:
host: localhost:3443
user-agent: curl/8.5.0
content-type: application/json
accept: application/json
content-length: 28

Request body:
{ "message": "Hello World" }

```

Create a `.env` file to change the ports:

```text
// .env
PORT=4000
PORT_HTTPS=4443
```

```bash
$ npm run start

Server listening on port 4000
Server listening on port 4443
```
