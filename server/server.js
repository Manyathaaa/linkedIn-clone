import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

const PORT = process.env.PORT || 1011;

app.listen(PORT, () => console.log(`server is running at port ${PORT}`));
