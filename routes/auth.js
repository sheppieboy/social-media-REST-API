const router = require("express").Router();

const User = require("../models/User");

router.get("/", async (req, res) => {
  const user = await new User({
    username: "Luke",
    email: "lukesheppard@gmail.com",
    password: "password123",
  });

  await user.save();
  res.send("test user");
});

module.exports = router;
