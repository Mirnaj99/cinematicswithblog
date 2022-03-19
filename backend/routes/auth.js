const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// registration:

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),

  });

  try {
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
      return res.status(400).send({ message: "Email already exists" });

    const usernameExist = await User.findOne({ username: req.body.username });
    if (usernameExist)
      return res.status(400).send({ message: "username already exists" });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json(err);
  }
});

// login:
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(400).send({message:"Wrong email or password!"});

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password &&
      res.status(400).json("Wrong email or password!");

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin , username:user.username},
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );
      

    const { password, ...info } = user._doc;

    res.status(200).json({ ...info, accessToken  });
  } catch (err) {
    
  }
});

module.exports = router;
