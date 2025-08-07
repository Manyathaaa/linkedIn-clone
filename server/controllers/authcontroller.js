import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "fill all requirements",
      });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
      return res.status(500).send({
        success: false,
        message: "email already registerd",
      });

    var salt = bcrypt.genSaltSync(10);

    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await UserModel.create({
      username: username,
      email,
      password: hashedPassword,
    });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).send({
        success: false,
        message: "password doesnt match",
      });
    }
    res.status(201).send({
      success: true,
      message: "successfully registered",
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      success: false,
      message: "something went wrong",
      error,
    });
  }
};

//login

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate JWT token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Successful login",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
