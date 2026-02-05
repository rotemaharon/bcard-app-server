const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    first: { type: String, required: true, minlength: 2, maxlength: 256 },
    middle: { type: String, maxlength: 256, default: "" },
    last: { type: String, required: true, minlength: 2, maxlength: 256 },
  },
  phone: { type: String, required: true, minlength: 9, maxlength: 11 },
  email: { type: String, required: true, minlength: 5, unique: true },
  password: { type: String, required: true, minlength: 7, maxlength: 1024 },
  image: {
    url: { type: String, minlength: 14 },
    alt: { type: String, minlength: 2, maxlength: 256 },
  },
  address: {
    state: { type: String, maxlength: 256, default: "" },
    country: { type: String, required: true, minlength: 2, maxlength: 256 },
    city: { type: String, required: true, minlength: 2, maxlength: 256 },
    street: { type: String, required: true, minlength: 2, maxlength: 256 },
    houseNumber: { type: Number, required: true, min: 2, max: 256 },
    zip: { type: Number, required: true, min: 2 },
  },
  isBusiness: { type: Boolean, required: true },
  isAdmin: { type: Boolean, default: false },

  loginAttempts: { type: Number, default: 0 },
  lockUntil: { type: Number, default: 0 }, 
});

const User = mongoose.model("users", userSchema);
module.exports = User;
