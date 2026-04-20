const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();

const fileLogger = require("./middleware/logger");
const initialData = require("./initialData/initialData");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const app = express();
const port = process.env.PORT || 8000;

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
app.use(fileLogger);

app.use("/api/users", usersRouter);
app.use("/api/cards", cardsRouter);

app.use((req, res) => res.status(404).send("Route not found"));

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("Connected to MongoDB");
    initialData();
    app.listen(port, () => console.log(`Server started on port ${port}`));
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB:", err.message);
    process.exit(1);
  });
