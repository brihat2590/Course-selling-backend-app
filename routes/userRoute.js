const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userMiddleware } = require("../middleware/userMiddleware");

require("dotenv").config();
const userRouter = express.Router();
const { z } = require("zod");
const { UserModel } = require("../db");


userRouter.post("/signup", async (req, res) => {
  const requiredBody = z.object({
    name: z.string().min(4).max(12),
    email: z.string().email(),
    password: z.string().min(4).max(22),
    course: z.string(),
  });
  const parsedData = requiredBody.safeParse(req.body);
  if (!parsedData.success) {
    res.status(403).send({
      message: parsedData.error.message,
    });
    return;
  }
  const { name, email, password, course } = req.body;
  const hashedPassword = await bcrypt.hash(password, 5);
  await UserModel.create({
    name: name,
    password: hashedPassword,
    email: email,
    course: course,
  });
  res.json({
    message: "you have succesfull signed up",
  });
});
userRouter.post("/login", async (req, res) => {
  const { name, password, email } = req.body;
  const user = await UserModel.findOne({
    email: email,
  });
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (user && passwordMatch) {
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      process.env.JWT_SECRET
    );
    res.json({
      token: token,
    });
  }
});
userRouter.get("/user",userMiddleware, async(req, res) => {
  try {
    const user = await UserModel.find({}); // Array
    console.log(user);

    res.json({
      message: "hey",
      message: user,
      // message:user
    });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = {
  userRouter: userRouter,
};
