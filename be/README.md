# Login App Backend

## Overview

The scope of this repository is to add backend support for our Login App.

## Technologies

- Backend: Node.js, Typescript, Express.js
- Database: MySQL

## Start the server

In order to start the server, the following environment variables must be defined:
```bash
PORT= # server port
HOST= # server host
DB_HOST= # database server host
DB_PORT= # database server port
DB_NAME= # database name
DB_USERNAME= # database user
DB_PASSWORD= # database password
ROUNDS= # used when generate authorization token
SECRET_KEY= # the secret key used to sign the authorization token
EXPIRES_IN= # how many seconds the token is valid
```

- build
```bash
npm run build
```

- start
```bash
npm run start
```

- start without running the build command
```bash
npm run start:dev
```

## APIs

### Login

1. #### login

- route
```
POST <host>/auth/login
```

- request
```JSON
{
    "username": "adrian",
    "password": "password"
}
```

- response

if the operation has succeeded, the response contains a JWT token than can be used to authorize the user

```JSON
{
	"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkcmlhbiIsImlhdCI6MTY5NDYwNDE5MSwiZXhwIjoxNjk0NjkwNTkxfQ.GJVDXmkOLIVE5my-v2S3Nlp5R4eXIFLiVRxbB0lbWk0"
}
```

if the operation failed, then the response contains an error message. See below an example of possible error message:
```JSON
{
    "message": "invalid credentials"
}
```

### Manage users API

#### 1. Get user data

- route
```
GET <host>/api/v1/users/user
```

- headers

The request must contains authorization header
```bash
authorization = Bearer <token>
```

- response

if the operation was successful, then the response will contains user data
```JSON
{
	"userData": {
		"id": 1,
		"username": "adrian",
		"email": "adrian@gmail.com",
		"first_name": "Adrian",
		"last_name": "Stefan",
		"location": {
			"latitude": "44.42680000000000",
			"longitude": "26.10250000000000"
		}
	}
}
```

if the operation failed, then the response contains an error message. See below an example of possible error message:
```JSON
{
	"message": "invalid auth token"
}
```
