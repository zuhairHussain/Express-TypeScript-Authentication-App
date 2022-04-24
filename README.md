# Introduction
Authentication app based on Express.js, MySQL, TypeScript and Sequelize. :heart:

## Getting Started

* Clone the repository

```bash
git clone git@github.com:zuhairHussain/Express-TypeScript-Authentication-App.git
```

* Install dependencies

```bash
npm install
```

* Copy .sample-env and rename it to .env and add DB credentials in it

* Run seed command to create admin user in DB
```bash
npx sequelize-cli db:seed:all
```

* Start Development Server
```bash
npm run dev
```
Your web server is now exposed on http://localhost:8000


* To prettify the code
```bash
npm run format
```
**All endpoints required a valid token x-access-token in request headers** 

### GET   /api/users
return list of available users

### POST   /api/users
Creates a new user
User attributes:
● name
● email (unique)
● password

### GET   /api/users/:id
get user by id

### Post   /api/login
Returns auth token
