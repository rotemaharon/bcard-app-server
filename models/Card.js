const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 2, maxlength: 256 },
  subtitle: { type: String, required: true, minlength: 2, maxlength: 256 },
  description: { type: String, required: true, minlength: 2, maxlength: 1024 },
  phone: { type: String, required: true, minlength: 9, maxlength: 11 },
  email: { type: String, required: true, minlength: 5 },
  web: { type: String, minlength: 14 },
  image: {
    url: { type: String, minlength: 14 },
    alt: { type: String, minlength: 2, maxlength: 256 },
  },
  address: {
    state: { type: String },
    country: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    houseNumber: { type: Number, required: true, min: 1 },
    zip: { type: Number },
  },
  bizNumber: {
    type: Number,
    required: true,
    min: 1000000,
    max: 9999999,
    unique: true,
  },
  likes: [String],
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Card = mongoose.model("cards", cardSchema);
module.exports = Card;
