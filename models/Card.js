const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, minlength: 2, maxlength: 256 },
    subtitle: { type: String, required: true, minlength: 2, maxlength: 256 },
    description: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 1024,
    },
    phone: { type: String, required: true, minlength: 9, maxlength: 11 },
    email: { type: String, required: true, minlength: 5 },
    web: { type: String, default: "" },
    image: {
      url: { type: String, default: "" },
      alt: { type: String, maxlength: 256, default: "business card image" },
    },
    address: {
      state: { type: String, default: "not defined" },
      country: { type: String, required: true },
      city: { type: String, required: true },
      street: { type: String, required: true },
      houseNumber: { type: Number, required: true, min: 1 },
      zip: { type: Number, default: 0 },
    },
    bizNumber: {
      type: Number,
      required: true,
      min: 1000000,
      max: 9999999,
      unique: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true },
);

const Card = mongoose.model("cards", cardSchema);
module.exports = Card;
