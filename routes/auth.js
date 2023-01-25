const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Register User
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log("errow throwing at auth.js", err);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    //email checking
    const user = await User.findOne({
      email: req.body.email,
    });

    !user && res.status(404).json("User not found");

    //password checking
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    !validPassword && res.status(400).json("Wrong password");

    //successful
    res.status(200).json(user); //send user as response
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
