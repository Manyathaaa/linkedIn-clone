import express from "express";
import { getuserController } from "../controllers/userController.js";
import { requireSignIn } from "../middleware/authmiddleware.js";

const router = express.Router();

router.get("/get-user", requireSignIn, getuserController);

export default router;
