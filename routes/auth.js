import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// REGISTER
router.get("/Loginget",async (req,res) => {

console.log("Login get")
res.status(200).json({message:"User Logged in!"})
});

router.post('/register', async (req, res) => {
  try {
    const { email, password,username } = req.body;
     const userexists = await User.findOne({ email });
    if (userexists) return res.status(400).json({ error: "user already exists!" });

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashed
    });

    await user.save();

    res.json({ message: "User created" });

  } catch (err) {
    res.status(500).json({ error: "Error registering" });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email)
    console.log(password)


    const user = await User.findOne({ email });
    console.log(user)
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
       console.log(isMatch)
    if (!isMatch) return res.status(400).json({message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token:token,username:user?.username });

  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Login error" });
  }
});

export default router;