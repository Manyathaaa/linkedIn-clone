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

    const existing = await UserModel.findOne({ email });
    if (!existing)
      return res.status(200).send({
        success: true,
        message: "email already registerd",
      });

    var salt = bcrypt.genSaltSync(10);

    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await UserModel.create({
      name: username,
      email,
      password: hashedPassword,
    });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(201).send({
        success: false,
        message: "password doesnt match",
      });
    }
    res.status(201).send({
      success: false,
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
