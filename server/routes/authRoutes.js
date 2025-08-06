import express from "express";
import { registerController } from "../controllers/authcontroller.js";

const router = express.Router();

//register
router.post("/register", registerController);

export default router;
