const express = require("express");
const router = express.Router();
const joi = require("joi");
const Card = require("../models/Card");
const auth = require("../middleware/auth");
const _ = require("lodash");

const cardSchema = joi.object({
  title: joi.string().min(2).max(256).required(),
  subtitle: joi.string().min(2).max(256).required(),
  description: joi.string().min(2).max(1024).required(),
  phone: joi.string().min(9).max(11).required(),
  email: joi.string().min(5).required().email(),
  web: joi.string().min(14).allow(""),
  image: joi
    .object({
      url: joi.string().min(14).allow(""),
      alt: joi.string().min(2).max(256).allow(""),
    })
    .required(),
  address: joi
    .object({
      state: joi.string().allow(""),
      country: joi.string().required(),
      city: joi.string().required(),
      street: joi.string().required(),
      houseNumber: joi.number().min(1).required(),
      zip: joi.number().allow(""),
    })
    .required(),
});

const generateBizNumber = async () => {
  while (true) {
    const random = _.random(1000000, 9999999);
    const card = await Card.findOne({ bizNumber: random });
    if (!card) return random;
  }
};

router.get("/my-cards", auth, async (req, res) => {
  try {
    const cards = await Card.find({ user_id: req.payload._id });
    res.send(cards);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).send("Card not found");
    res.send(card);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.get("/", async (req, res) => {
  try {
    const cards = await Card.find();
    res.send(cards);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.post("/", auth, async (req, res) => {
  try {
    if (!req.payload.isBusiness)
      return res.status(400).send("Access denied. Business users only.");

    const { error } = cardSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const card = new Card({
      ...req.body,
      bizNumber: await generateBizNumber(),
      user_id: req.payload._id,
      likes: [],
    });

    await card.save();
    res.status(201).send(card);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { error } = cardSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const card = await Card.findOneAndUpdate(
      { _id: req.params.id, user_id: req.payload._id },
      req.body,
      { new: true },
    );

    if (!card)
      return res.status(404).send("Card not found or you are not the owner.");

    res.send(card);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).send("Card not found");

    const cardLikes = card.likes.find((id) => id === req.payload._id);

    if (!cardLikes) {
      card.likes.push(req.payload._id);
      res.send("Card liked");
    } else {
      card.likes = card.likes.filter((id) => id !== req.payload._id);
      res.send("Card unliked");
    }

    await card.save();
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.patch("/:id/bizNumber", auth, async (req, res) => {
  try {
    [cite_start]; 
    if (!req.payload.isAdmin) {
      return res.status(403).send("Access denied. Admin only.");
    }

    const { bizNumber } = req.body;

    if (!bizNumber || bizNumber < 1000000 || bizNumber > 9999999) {
      return res
        .status(400)
        .send("BizNumber must be between 1,000,000 and 9,999,999");
    }

    [cite_start]; 
    const existingCard = await Card.findOne({ bizNumber: bizNumber });
    if (existingCard) {
      return res.status(400).send("This BizNumber is already taken.");
    }

    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { bizNumber: bizNumber },
      { new: true },
    );

    if (!card) return res.status(404).send("Card not found.");
    res.send(card);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).send("Card not found");

    if (card.user_id.toString() !== req.payload._id && !req.payload.isAdmin) {
      return res.status(403).send("Access denied.");
    }

    await Card.deleteOne({ _id: req.params.id });
    res.send("Card deleted");
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
