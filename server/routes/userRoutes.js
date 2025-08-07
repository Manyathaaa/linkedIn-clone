import express from "express";
import {
  getUserPosts,
  getuserController,
  UpdateUserController,
  getUserById,
} from "../controllers/userController.js";
import { requireSignIn } from "../middleware/authmiddleware.js";

const router = express.Router();

router.get("/get-user", requireSignIn, getuserController);

// Get user profile by ID
router.get("/:id", getUserById);

// Get all posts by a specific user
router.get("/:id/posts", getUserPosts);

router.patch("/update-user", requireSignIn, UpdateUserController);

export default router;
