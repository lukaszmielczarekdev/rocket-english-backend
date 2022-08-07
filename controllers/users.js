import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/userModel.js";
import { v4 as uuidv4 } from "uuid";
import {
  transporter,
  passwordResetRequestMailTemplate,
  passwordChangeConfirmationMailTemplate,
} from "../services/mail.js";

export const externalSignin = async (req, res) => {
  try {
    const { credential } = req.body;
    const decodedData = jwt.decode(credential);

    const existingUser = await User.findOne({ email: decodedData.email });
    if (!existingUser) {
      if (decodedData.name.toLowerCase() === "admin") {
        return res.status(400).json({ message: "Invalid username" });
      }

      const hashedPassword = await bcrypt.hash(uuidv4(), 12);

      const user = await User.create({
        name: decodedData.name,
        password: hashedPassword,
        email: decodedData.email,
      });

      await user.save();

      res.status(200).json({
        user: {
          name: user.name,
          email: user.email,
          progress: user.progress,
          external: true,
        },
        token: credential,
      });
    } else {
      res.status(200).json({
        user: {
          name: existingUser.name,
          email: existingUser.email,
          progress: existingUser.progress,
        },
        token: credential,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    const isPasswordCorect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorect)
      return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      user: {
        name: existingUser.name,
        email: existingUser.email,
        progress: existingUser.progress,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { username, email, password, confirmpassword } = req.body;

  try {
    if (username.toLowerCase() === "admin") {
      return res.status(400).json({ message: "Invalid username" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    if (password !== confirmpassword)
      return res.status(400).json({ message: "Passwords don't match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: username,
      password: hashedPassword,
      email,
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        progress: user.progress,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteUser = async (req, res) => {
  if (req.userId.includes("@")) {
    try {
      await User.findOneAndDelete({ email: req.userId }).exec();

      res.json({ user: null });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.userId))
        return res.status(404).json({ message: "User not found" });

      await User.findOneAndDelete({ _id: req.userId }).exec();

      res.json({ user: null });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const updateProgress = async (req, res) => {
  const update = req.body;

  if (req.userId.includes("@")) {
    try {
      const existingUser = await User.findOne({ email: req.userId });
      const updatedUser = await User.findOneAndUpdate(
        { email: req.userId },
        { progress: { ...existingUser.progress, ...update } },
        {
          new: true,
        }
      ).exec();

      res.json(updatedUser.progress);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    if (!mongoose.Types.ObjectId.isValid(req.userId))
      return res.status(404).json({ message: "User not found" });

    try {
      const existingUser = await User.findOne({ _id: req.userId });
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.userId },
        { progress: { ...existingUser.progress, ...update } },
        {
          new: true,
        }
      ).exec();

      res.json(updatedUser.progress);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const saveGame = async (req, res) => {
  const save = req.body;

  if (req.userId.includes("@")) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { email: req.userId },
        { progress: save },
        {
          new: true,
        }
      ).exec();

      res.json(updatedUser.progress);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    if (!mongoose.Types.ObjectId.isValid(req.userId))
      return res.status(404).json({ message: "User not found" });

    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.userId },
        { progress: save },
        {
          new: true,
        }
      ).exec();

      res.json(updatedUser.progress);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const resetProgress = async (req, res) => {
  try {
    const defaultUser = await User.findOne({
      _id: "62e30223de701f0177adeb17",
    });

    res.json(defaultUser.progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser || existingUser.external)
      return res.status(404).json({ message: "User not found" });

    const USER_SECRET = process.env.SECRET;

    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      USER_SECRET,
      {
        expiresIn: "15m",
      }
    );

    const link = `https://rocket-english.pages.dev/passwordreset/#access_token=${token}`;

    await transporter.sendMail({
      from: "rocket.english.service@gmail.com",
      to: email,
      subject: "Rocket English - Password Reset Request",
      html: passwordResetRequestMailTemplate(
        link,
        existingUser.name,
        existingUser.email
      ),
    });

    res.json({ message: "Password reset link sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const changePassword = async (req, res) => {
  const { password, confirmpassword } = req.body;
  const { token } = req.params;

  if (password !== confirmpassword)
    return res.status(400).json({ message: "Passwords don't match" });

  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!decodedToken) {
    return res.status(400).send("Access denied");
  }

  if (decodedToken.exp * 1000 < new Date().getTime()) {
    return res.status(400).json({ message: "Password reset link has expired" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const existingUser = await User.findOne({ _id: decodedToken.id });
    if (!existingUser || existingUser.external)
      return res.status(404).json({ message: "User not found" });

    await User.findOneAndUpdate(
      { _id: decodedToken.id },
      { password: hashedPassword },
      {
        new: true,
      }
    ).exec();

    const link = `https://rocket-english.pages.dev/`;

    await transporter.sendMail({
      from: "rocket.english.service@gmail.com",
      to: existingUser.email,
      subject: "Rocket English - Password Successfully Changed",
      html: passwordChangeConfirmationMailTemplate(
        link,
        existingUser.name,
        existingUser.email
      ),
    });

    res.json({ message: "Password successfully changed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserAccount = async (req, res) => {
  const { username, email, oldPassword, newPassword, confirmNewPassword } =
    req.body;

  if (req.userId.includes("@")) {
    try {
      res.json(null);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    try {
      const otherUser = await User.findOne({ email });
      if (otherUser) {
        return res.status(400).json({ message: "Email is already used" });
      }
      const existingUser = await User.findOne({ _id: req.userId });

      const emailCopy = email ? email : existingUser.email;
      const userNameCopy = username ? username : existingUser.name;
      const oldPasswordCopy = oldPassword ? oldPassword : null;
      const newPasswordCopy = newPassword ? newPassword : null;
      const confirmNewPasswordCopy = confirmNewPassword
        ? confirmNewPassword
        : null;

      if (newPasswordCopy !== confirmNewPasswordCopy)
        return res.status(400).json({ message: "Passwords don't match" });

      if (!mongoose.Types.ObjectId.isValid(req.userId))
        return res.status(404).json({ message: "User not found" });

      let hashedPassword;

      if (oldPasswordCopy && newPasswordCopy && confirmNewPasswordCopy) {
        const isPasswordCorect = await bcrypt.compare(
          oldPasswordCopy,
          existingUser.password
        );

        if (!isPasswordCorect)
          return res.status(400).json({ message: "Invalid password" });

        hashedPassword = await bcrypt.hash(newPasswordCopy, 12);
      }

      const dataToUpdate = hashedPassword
        ? { name: userNameCopy, email: emailCopy, password: hashedPassword }
        : { name: userNameCopy, email: emailCopy };

      const updatedUser = await User.findOneAndUpdate(
        { _id: req.userId },
        dataToUpdate,
        {
          new: true,
        }
      ).exec();

      const token = jwt.sign(
        { id: updatedUser._id, email: updatedUser.email },
        process.env.SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.json({
        user: { name: updatedUser.name, email: updatedUser.email },
        token,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
