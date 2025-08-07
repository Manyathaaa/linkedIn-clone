import express from "express";
import bcrypt from "bcryptjs";
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
      res.status(500).send({
        success: false,
        message: "user not found",
      });
    }

    user.password = undefined;

    return res.status(200).send({
      sucess: true,
      user,
      message: "got user successfully",
    });
  } catch (error) {
    console.log("error", error);
    return res.status(404).send({
      success: false,
      message: "not able to find user",
    });
  }
};
