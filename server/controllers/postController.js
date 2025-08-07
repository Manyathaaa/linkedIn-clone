// server/controllers/postController.js
import Post from "../models/postModel.js";
import User from "../models/UserModel.js";

// Create a new post
export const createPostController = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user?._id;

    if (!content) {
      return res
        .status(400)
        .json({ success: false, message: "Content is required" });
    }

    const newPost = new Post({
      content,
      author: userId,
    });

    await newPost.save();

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create post",
    });
  }
};

// Get all posts
export const getAllPostsController = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username") // only populate username from User
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json({
      success: true,
      message: "All posts fetched",
      posts,
    });
  } catch (error) {
    console.error("Fetch posts error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
    });
  }
};
