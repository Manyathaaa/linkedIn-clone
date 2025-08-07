import UserModel from "../models/UserModel.js";

export const getuserController = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(500).send({
        success: false,
        message: "userId not found",
      });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "user not found",
      });
    }

    user.password = undefined;

    return res.status(200).send({
      success: true,
      message: "Got user successfully",
      user,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(404).send({
      success: false,
      message: "Not able to find user",
    });
  }
};

export const UpdateUserController = async (req, res) => {
  try {
    //find user
    const user = await UserModel.findById({ _id: req.user.id });

    //validation
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "user not found",
        error,
      });
    }

    //update
    const { name, bio } = req.body;
    if (name) user.name = name;
    if (bio) user.bio = bio;

    //save

    await user.save();
    return res.status(200).send({
      success: true,
      message: "saved successfully",
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      success: false,
      message: "update failure",
      error,
    });
  }
};

import Post from "../models/postModel.js";

// Get all posts by a specific user
export const getUser = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.id })
      .populate("author", "username")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (err) {
    console.error("Error fetching user posts:", err);
    res.status(500).json({ message: "Failed to get posts" });
  }
};
