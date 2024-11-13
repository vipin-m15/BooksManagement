import User from "./models/user.js";
import mongoose from "mongoose";
import { config } from "dotenv";
config();

export async function initializeAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const adminAvailable = await User.findOne({ role: "admin" });
    if (!adminAvailable) {
      const admin = new User({
        username: "admin",
        name: "Admin",
        email: "admin@gmail.com",
        phone: "9009009007",
        password: "admin@123",
        otpVerified: true,
        role: "admin",
        age: "40",
      });
      await admin.save();
      console.log("Admin created!");
    } else {
      console.log("Admin available");
    }
  } catch (error) {
    console.log(error);
  }
}
