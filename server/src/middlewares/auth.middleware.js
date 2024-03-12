import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    // const cookie = req.headers.cookie;
    // return console.log(cookie);

    if (!token) {
      return res.status(401).json({
        error: "Unauthorized request: Missing access token",
      });
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decodeToken?.id).select("-password");
    // console.log(decodeToken);

    if (!user) {
      return res.status(401).json({
        error: "Invalid Access Token: User not found",
      });
    }

    // ATTENTION HERE!
    req.user = user;
    next();


    
  } catch (error) {
    console.error("Error during token verification ", error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        error: "Invalid Access Token: Token is malformed or expired",
      });
    }

    return res.status(401).json({
      error: "Invalid Access Token: Failed to verify token",
    });
  }
};

export { verifyJWT };
