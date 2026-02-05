ואז לכתוב את זה ?

# Business Card App - REST API Server 🚀

This is the backend server for a Business Card application, built with **Node.js**, **Express**, and **MongoDB**.
The application provides a RESTful API for managing users and business cards, including authentication, authorization, and data validation.

## ✨ Features

- **User Management:** Register, Login, User Profile, Edit Profile.
- **Card Management:** Create Business Cards, View All, View My Cards, Edit, Delete, Like.
- **Security:**
      _ **JWT** Authentication.
      _ **Bcryptjs** for password hashing.
      \* Protected Routes (Middleware).
- **Data Validation:** Using **Joi** for strict input validation.

### 🏆 Bonuses Implemented

1.  **BizNumber Management:** Admin users can update a card's business number (with validation for uniqueness).
2.  **Account Lockout:** Users are locked out for 24 hours after 3 failed login attempts.
3.  **File Logger:** Automatic error logging to a daily log file (in `/logs`) for server errors (status 400+).

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Token)
- Bcryptjs
- Joi
- Morgan (Logger)
- Cors

## ⚙️ Installation & Setup

1.  **Clone the repository:**
    `bash
    git clone <YOUR_REPO_URL>
    cd bcard-app-server
    `

2.  **Install dependencies:**
    `bash
    npm install
    `

3.  **Environment Variables:**
    Create a `.env` file in the root directory. You need to provide the following variables:
    `env
    PORT=8000
    DB=your_mongodb_connection_string
    JWTKEY=your_secret_key
    `
    _(Note: The .env file is not included in this repo for security reasons)._

4.  **Run the server:**
    `bash
    npm start
    `

## 📚 API Endpoints Overview

### Users

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login (Returns JWT)
- `GET /api/users/:id` - Get user details
- `GET /api/users` - Get all users (Admin only)
- `PUT /api/users/:id` - Edit user
- `PATCH /api/users/:id` - Change `isBusiness` status
- `DELETE /api/users/:id` - Delete user

### Cards

- `GET /api/cards` - Get all cards
- `GET /api/cards/my-cards` - Get user's cards
- `GET /api/cards/:id` - Get specific card
- `POST /api/cards` - Create a new card (Business users only)
- `PUT /api/cards/:id` - Edit card
- `PATCH /api/cards/:id` - Like/Unlike card
- `PATCH /api/cards/:id/bizNumber` - Update BizNumber (Admin only)
- `DELETE /api/cards/:id` - Delete card

---

**Created by:** Rotem Aharon
