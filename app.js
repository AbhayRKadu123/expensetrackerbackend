import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import privaterouter from './routes/private.js';

import authRoutes from './routes/auth.js';
import authMiddleware from './middleware/authMiddleware.js';
// import dotenv from "dotenv";
// dotenv.config();
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.get("/test",(req,res)=>{
  res.status(200).json({message:"test route"})
})
app.use('/api/auth', authRoutes);
app.use('/private',authMiddleware,privaterouter);

// connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// server
app.listen(5000,"0.0.0.0", () => {
  console.log("Server running on port 5000");
});