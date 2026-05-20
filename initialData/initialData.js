const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Card = require("../models/Card");

const DEFAULT_IMAGE =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

const initialData = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) return;

    const password = await bcrypt.hash("Aa123456!", 10);

    const baseUser = {
      password,
      image: { url: DEFAULT_IMAGE, alt: "profile picture" },
    };

    const regularUser = await new User({
      ...baseUser,
      name: { first: "John", last: "Doe" },
      email: "user@test.com",
      phone: "050-0000001",
      address: {
        country: "Israel",
        city: "Tel Aviv",
        street: "Rothschild",
        houseNumber: 5,
        zip: 12345,
      },
      isBusiness: false,
      isAdmin: false,
    }).save();

    const businessUser = await new User({
      ...baseUser,
      name: { first: "Biz", last: "Man" },
      email: "business@test.com",
      phone: "050-0000002",
      address: {
        country: "Israel",
        city: "Haifa",
        street: "Herzl",
        houseNumber: 5,
        zip: 67890,
      },
      isBusiness: true,
      isAdmin: false,
    }).save();

    const adminUser = await new User({
      ...baseUser,
      name: { first: "Admin", last: "User" },
      email: "admin@test.com",
      phone: "050-0000003",
      address: {
        country: "Israel",
        city: "Jerusalem",
        street: "Jaffa",
        houseNumber: 5,
        zip: 54321,
      },
      isBusiness: true,
      isAdmin: true,
    }).save();

    const sampleCards = [1, 2, 3].map((n) => ({
      title: `Card ${n}`,
      subtitle: `Subtitle ${n}`,
      description: `Description ${n}`,
      phone: "050-0000000",
      email: `c${n}@test.com`,
      web: "",
      image: { url: DEFAULT_IMAGE, alt: "business card image" },
      address: {
        country: "Israel",
        city: "Tel Aviv",
        street: "Main",
        houseNumber: n,
        zip: 100 + n,
      },
      bizNumber: 1000000 + n,
      user_id: businessUser._id,
      likes: [],
    }));

    await Card.insertMany(sampleCards);
    console.log("Initial data created successfully");
  } catch (err) {
    console.error("Initial data error:", err.message);
  }
};

module.exports = initialData;
