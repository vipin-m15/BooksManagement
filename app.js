import express from "express";
import mongoose, { mongo } from "mongoose";
import { config } from "dotenv";
import { initializeAdmin } from "./intializeAdmin.js";
import { router as authRouter } from "./routes/auth.js";
import { router as adminRouter } from "./routes/admin.js";
import { router as userRouter } from "./routes/user.js";
config();

// This should run only once
// initializeAdmin();

const app = express();
const port = 3000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => {
    console.log(error);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({ status: "Health Ok" });
});

app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
