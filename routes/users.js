const express = require("express");
const router = express.Router();
const joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");
const _ = require("lodash");

const registerSchema = joi.object({
  name: joi
    .object({
      first: joi.string().min(2).max(256).required(),
      middle: joi.string().min(2).max(256).allow("").optional(),
      last: joi.string().min(2).max(256).required(),
    })
    .required(),
  phone: joi.string().min(9).max(11).required(),
  email: joi.string().min(5).required().email(),
  password: joi.string().min(7).max(20).required(),
  image: joi
    .object({
      url: joi.string().min(14).required(),
      alt: joi.string().min(2).max(256).required(),
    })
    .required(),
  address: joi
    .object({
      state: joi.string().min(2).max(256).allow("").optional(),
      country: joi.string().min(2).max(256).required(),
      city: joi.string().min(2).max(256).required(),
      street: joi.string().min(2).max(256).required(),
      houseNumber: joi.number().min(2).max(256).required(),
      zip: joi.number().min(2).required(),
    })
    .required(),
  isBusiness: joi.boolean().required(),
});

const loginSchema = joi.object({
  email: joi.string().min(5).required().email(),
  password: joi.string().min(7).max(20).required(),
});

// Register a new user
router.post("/", async (req, res) => {
  try {
    //joi validation
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //check for existing user
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered.");
    //create new user
    user = new User(req.body);
    //encrypt the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.status(201).send(_.pick(user, ["_id", "name", "email"]));
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password.");

    if (user.lockUntil && user.lockUntil > Date.now()) {
      return res
        .status(403)
        .send(
          "Account is locked for 24 hours due to too many failed attempts.",
        );
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password,
    );

    if (!validPassword) {
      user.loginAttempts = (user.loginAttempts || 0) + 1;

      if (user.loginAttempts >= 3) {
        user.lockUntil = Date.now() + 24 * 60 * 60 * 1000; 
      }

      await user.save(); 
      return res.status(400).send("Invalid email or password.");
    }

    user.loginAttempts = 0;
    user.lockUntil = 0;
    await user.save();

    const token = jwt.sign(
      { _id: user._id, isBusiness: user.isBusiness, isAdmin: user.isAdmin },
      process.env.JWTKEY,
    );

    res.status(200).send(token);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    if (req.payload._id !== req.params.id && !req.payload.isAdmin) {
      return res.status(403).send("Access denied.");
    }
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).send("User not found.");
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    if (!req.payload.isAdmin) return res.status(403).send("Access denied.");
    const users = await User.find().select("-password");
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    if (req.payload._id !== req.params.id)
      return res.status(403).send("Access denied.");

    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).send("User not found.");

    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    if (req.payload._id !== req.params.id && !req.payload.isAdmin) {
      return res.status(403).send("Access denied.");
    }
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found.");

    user.isBusiness = !user.isBusiness;
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    if (req.payload._id !== req.params.id && !req.payload.isAdmin) {
      return res.status(403).send("Access denied.");
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send("User not found.");
    res.send("User deleted");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
