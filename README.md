# Business Card App - REST API Server

Backend server for a Business Card application, built with **Node.js**, **Express**, and **MongoDB**. The application provides a RESTful API for managing users and business cards, with authentication, authorization, validation, and logging.

## Features

- **User Management:** Register, Login, Get Profile, Edit, Toggle Business Status, Delete.
- **Card Management:** Create, Read All, Read My Cards, Edit, Like/Unlike, Delete.
- **Security:**
  - JWT authentication
  - Bcryptjs password hashing
  - Protected routes (auth middleware)
- **Data Validation:** Joi schemas for all inputs.
- **Logging:** Morgan for request logging, custom file logger for errors.
- **Two environments:** Local MongoDB and MongoDB Atlas (via `.env`).

## Bonuses Implemented

1. **BizNumber Management** — Admin users can change a card's business number, with uniqueness validation.
2. **File Logger** — Every request returning status ≥ 400 is appended to a daily log file under `/logs`.
3. **Account Lockout** — After 3 consecutive failed login attempts, the account is locked for 24 hours.

## Tech Stack

Node.js, Express.js, MongoDB (Mongoose), JWT, Bcryptjs, Joi, Morgan, Cors, Dotenv.

## Installation & Setup

1. Clone the repository:

   ```bash
   git clone <YOUR_REPO_URL>
   cd bcard-app-server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with:

   ```env
   PORT=8000
   DB=your_mongodb_connection_string
   JWTKEY=your_secret_key
   ```

4. Run the server:

   ```bash
   npm start
   ```

   On the first run, initial users and cards will be seeded automatically.

## API Endpoints

### Users (`/api/users`)

| Method | Path      | Auth                     | Action                 |
| ------ | --------- | ------------------------ | ---------------------- |
| POST   | `/`       | Public                   | Register a new user    |
| POST   | `/login`  | Public                   | Login, returns JWT     |
| GET    | `/`       | Admin                    | Get all users          |
| GET    | `/:id`    | The user or Admin        | Get user by id         |
| PUT    | `/:id`    | The user                 | Edit user              |
| PATCH  | `/:id`    | The user                 | Toggle `isBusiness`    |
| DELETE | `/:id`    | The user or Admin        | Delete user            |

### Cards (`/api/cards`)

| Method | Path                 | Auth                    | Action                         |
| ------ | -------------------- | ----------------------- | ------------------------------ |
| GET    | `/`                  | Public                  | Get all cards                  |
| GET    | `/my-cards`          | Registered user         | Get cards owned by the user    |
| GET    | `/:id`               | Public                  | Get card by id                 |
| POST   | `/`                  | Business user           | Create a new card              |
| PUT    | `/:id`               | Card owner              | Edit card                      |
| PATCH  | `/:id`               | Registered user         | Like / Unlike card             |
| PATCH  | `/:id/bizNumber`     | Admin                   | Update card's bizNumber (bonus)|
| DELETE | `/:id`               | Card owner or Admin     | Delete card                    |

All authenticated routes require an `x-auth-token` header containing the JWT returned from `/api/users/login`.

## Test Users (seeded on first run)

Password for all three: `Aa123456!`

| Role     | Email               | Permissions                                           |
| -------- | ------------------- | ----------------------------------------------------- |
| Regular  | `user@test.com`     | Browse cards, like cards                              |
| Business | `business@test.com` | Create, edit, and delete own cards                    |
| Admin    | `admin@test.com`    | Full access, can manage users and change bizNumbers   |


**Author:** Rotem Aharon
