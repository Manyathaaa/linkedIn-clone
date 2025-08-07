import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

//routes
app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT || 1011;

app.listen(PORT, () => console.log(`server is running at port ${PORT}`));
