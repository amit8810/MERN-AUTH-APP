import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // CHECK IF THE USER ALREADY REGISTERED WITH AN EMAIL ?
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: "User with the provided email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });
    return res.status(201).json({
      user,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error while registering the user:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        error: "User with email doesn't exist",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isPasswordValid) {
      // CREATING A TOKEN
      const token = jwt.sign(
        { id: existingUser._id },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );

      return res
        .status(200)
        .cookie("jwt", token, {
          path: "/",
          expiresIn: new Date(Date.now() + 1000 * 30),
          httpOnly: true,
          sameSite: "lax",
        })
        .json({
          message: `Login Successful : Welcome back, ${existingUser.name}!`,
        });

    } else {
      return res.status(400).json({
        error: "Please enter correct password",
      });
    }
  } catch (error) {
    console.error("Error while login", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = req.user; // it coming from auth.middlware.js

    return res.status(200).json({
      user,
      message: "user fetched successfully",
    });
  } catch (error) {
    console.error("Error while fetching current user", error);
    return res.status(500).json({
      error: "Error while fetching current user",
      message: error.message,
    });
  }
};

export { registerUser, login, getCurrentUser };
