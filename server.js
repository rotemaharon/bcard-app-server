const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const logger = require("./middleware/logger");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Card = require("./models/Card");

const users = require("./routes/users");
const cards = require("./routes/cards");

const app = express();
const port = process.env.PORT || 8000;

mongoose
  .connect(process.env.DB)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Could not connect to MongoDB", err));

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://127.0.0.1:5500",
    ],
    optionsSuccessStatus: 200,
  }),
);

app.use(express.json());
app.use(morgan("dev"));
app.use(logger);

const initialData = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) return;

    const password = await bcrypt.hash("Aa123456!", 10);

    const user1 = new User({
      name: { first: "John", last: "Doe" },
      email: "user@test.com",
      password,
      phone: "0500000001",
      image: {
        url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        alt: "pic",
      },
      address: {
        country: "Israel",
        city: "Tel Aviv",
        street: "Rothschild",
        houseNumber: 1,
        zip: 12345,
      },
      isBusiness: false,
      isAdmin: false,
    });

    const user2 = new User({
      name: { first: "Biz", last: "Man" },
      email: "business@test.com",
      password,
      phone: "0500000002",
      image: {
        url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        alt: "pic",
      },
      address: {
        country: "Israel",
        city: "Haifa",
        street: "Herzl",
        houseNumber: 2,
        zip: 67890,
      },
      isBusiness: true,
      isAdmin: false,
    });

    const user3 = new User({
      name: { first: "Admin", last: "User" },
      email: "admin@test.com",
      password,
      phone: "0500000003",
      image: {
        url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        alt: "pic",
      },
      address: {
        country: "Israel",
        city: "Jerusalem",
        street: "Jaffa",
        houseNumber: 3,
        zip: 54321,
      },
      isBusiness: true,
      isAdmin: true,
    });

    await user1.save();
    await user2.save();
    await user3.save();

    const cards = [
      {
        title: "Card 1",
        subtitle: "Subtitle 1",
        description: "Description 1",
        phone: "0500000000",
        email: "c1@test.com",
        image: {
          url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          alt: "alt",
        },
        address: {
          country: "Israel",
          city: "TA",
          street: "St",
          houseNumber: 1,
          zip: 123,
        },
        bizNumber: 1000001,
        user_id: user2._id,
      },
      {
        title: "Card 2",
        subtitle: "Subtitle 2",
        description: "Description 2",
        phone: "0500000000",
        email: "c2@test.com",
        image: {
          url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          alt: "alt",
        },
        address: {
          country: "Israel",
          city: "TA",
          street: "St",
          houseNumber: 1,
          zip: 123,
        },
        bizNumber: 1000002,
        user_id: user2._id,
      },
      {
        title: "Card 3",
        subtitle: "Subtitle 3",
        description: "Description 3",
        phone: "0500000000",
        email: "c3@test.com",
        image: {
          url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          alt: "alt",
        },
        address: {
          country: "Israel",
          city: "TA",
          street: "St",
          houseNumber: 1,
          zip: 123,
        },
        bizNumber: 1000003,
        user_id: user2._id,
      },
    ];

    await Card.insertMany(cards);
    console.log("Initial data created successfully");
  } catch (err) {
    console.log("Initial data error:", err);
  }
};

initialData();

app.use("/api/users", users);
app.use("/api/cards", cards);

app.listen(port, () => console.log(`Server started on port ${port}`));
