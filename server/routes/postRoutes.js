// server/routes/postRoutes.js
import express from "express";
import {
  createPostController,
  getAllPostsController,
} from "../controllers/postController.js";
import { requireSignIn } from "../middleware/authmiddleware.js";

const router = express.Router();

// Protected route to create post
router.post("/create", requireSignIn, createPostController);

// Public route to get all posts
router.get("/", getAllPostsController);

export default router;
