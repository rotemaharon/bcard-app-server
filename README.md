Live demo: https://b-card-gamma.vercel.app

# BCard App - Server

A REST API server for the BCard business card management application, built with Node.js and Express.

## Getting Started

1. Install dependencies:

```bash
   npm install
```

2. Create a `.env` file in the root directory:

```
   NODE_ENV=development
   PORT=8000
   DB=your_mongodb_connection_string
   JWTKEY=your_secret_key
```

3. Start the server:

```bash
   npm start
```

On first run, 3 users and 3 cards are created automatically for testing.

## Test Users

Password for all: `Aa123456!`

| Role     | Email             |
| -------- | ----------------- |
| Regular  | user@test.com     |
| Business | business@test.com |
| Admin    | admin@test.com    |

## Endpoints

### Users

| Method | URL              | Auth                     |
| ------ | ---------------- | ------------------------ |
| POST   | /api/users       | Register                 |
| POST   | /api/users/login | Login                    |
| GET    | /api/users       | Admin only               |
| GET    | /api/users/:id   | Registered user or Admin |
| PUT    | /api/users/:id   | Registered user          |
| PATCH  | /api/users/:id   | Registered user          |
| DELETE | /api/users/:id   | Registered user or Admin |

### Cards

| Method | URL                      | Auth                   |
| ------ | ------------------------ | ---------------------- |
| GET    | /api/cards               | All                    |
| GET    | /api/cards/my-cards      | Registered user        |
| GET    | /api/cards/:id           | All                    |
| POST   | /api/cards               | Business user          |
| PUT    | /api/cards/:id           | Card owner             |
| PATCH  | /api/cards/:id           | Registered user (like) |
| PATCH  | /api/cards/:id/bizNumber | Admin (bonus)          |
| DELETE | /api/cards/:id           | Card owner or Admin    |

All protected routes require an `x-auth-token` header with the token received from login.

## Bonus Features

- Admin can change a card's bizNumber (validates uniqueness)
- User account locks for 24 hours after 3 failed login attempts
- File logger saves all 400+ responses to a daily log file in the `logs` directory

## Tech Stack

Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, Joi, Morgan, Cors, Dotenv
