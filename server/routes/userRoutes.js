import express from "express";
import {
  getuserController,
  UpdateUserController,
} from "../controllers/userController.js";
import { requireSignIn } from "../middleware/authmiddleware.js";

const router = express.Router();

router.get("/get-user", requireSignIn, getuserController);

router.patch("/update-user", requireSignIn, UpdateUserController);

export default router;
