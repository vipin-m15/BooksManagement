import { config } from "dotenv";
import Jwt from "jsonwebtoken";
import User from "../models/user.js";
config();
export const adminMiddleware = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    token = token.replace("Bearer ", "");
    if (!token) {
      return res.status(401).send({ message: "Access Denied - No token" });
    }
    const decodedToken = Jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decodedToken.id });
    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }
    if (decodedToken.role !== "admin") {
      return res.status(401).send({ message: "You are not admin!" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).send({ message: "Invalid Token" });
  }
};
