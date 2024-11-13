import User from "../models/user.js";
import Jwt from "jsonwebtoken";
import { generateOtp } from "../utils/helper.js";

const createToken = (id, email, role) => {
  const token = Jwt.sign({ id, email, role }, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 60,
  });
  return token;
};

export async function register(req, res) {
  try {
    const { email } = req.body;
    const available = await User.findOne({ email });
    if (available) {
      throw new Error("User already available!");
    }
    const otp = generateOtp();
    const user = await User.create({ ...req.body, otp });
    const createdUser = user.toObject();
    delete createdUser.password;
    delete createdUser.otp;
    res.status(201).send(createdUser);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

export async function verifyOtp(req, res) {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email, otp });
    if (user) {
      const verified = otp == user.otp;
      if (verified) {
        await User.updateOne({ email }, { $set: { otpVerified: true } });
        res.status(200).send({ message: "OTP verified Successfully" });
      } else {
        throw new Error("Otp mismatched!");
      }
    } else {
      throw new Error("Email not found.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user.otpVerified);
    if (!user) {
      throw new Error(`User with email ${email} not found!`);
    } else if (!!user) {
      if (user.otpVerified && user.password === password) {
        const token = createToken(user._id, user.email, user.role);
        res.cookie("_token", token);
        res.status(200).send({ message: "Login successfull", token });
      } else {
        res
          .status(500)
          .send({ message: "User not verified or Password mismatched!" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}
