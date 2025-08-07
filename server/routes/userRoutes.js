import express from "express";
import {
  getUser,
  getuserController,
  UpdateUserController,
} from "../controllers/userController.js";
import { requireSignIn } from "../middleware/authmiddleware.js";

const router = express.Router();

router.get("/get-user", requireSignIn, getuserController);

// Get all posts by a specific user
router.get("/:id/posts", getUser);

router.patch("/update-user", requireSignIn, UpdateUserController);

export default router;
