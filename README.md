# Business Card App - REST API Server

This is the backend server for a Business Card application.
Built with Node.js, Express, and MongoDB.

## Features
- **Users:** Register, Login, User Profile, Edit Profile.
- **Cards:** Create Business Cards, View All, View My Cards, Edit, Delete, Like.
- **Security:** JWT Authentication, Password Encryption (Bcrypt), Protected Routes.
- **Bonuses Implemented:**
  - BizNumber management (Admin only).
  - Failed login lockout (3 attempts -> 24h lock).
  - File Logger for errors (400+).

## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file in the root directory with the following variables:
PORT=8000
DB=your_mongodb_connection_string
JWTKEY=your_secret_key
4. Run `npm start` to launch the server.

## API Documentation

### Users
- `POST /api/users/register` - Register a new user.
- `POST /api/users/login` - Login (Returns JWT).
- `GET /api/users/:id` - Get user details.
- `GET /api/users` - Get all users (Admin only).
- `PUT /api/users/:id` - Edit user.
- `PATCH /api/users/:id` - Change isBusiness status.
- `DELETE /api/users/:id` - Delete user.

### Cards
- `GET /api/cards` - Get all cards.
- `GET /api/cards/my-cards` - Get user's cards.
- `GET /api/cards/:id` - Get specific card.
- `POST /api/cards` - Create a new card (Business only).
- `PUT /api/cards/:id` - Edit card.
- `PATCH /api/cards/:id` - Like/Unlike card.
- `PATCH /api/cards/:id/bizNumber` - Update BizNumber (Admin only).
- `DELETE /api/cards/:id` - Delete card.


