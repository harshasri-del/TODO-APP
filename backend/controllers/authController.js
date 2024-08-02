const User = require("../models/User");
const generateToken = require("../config/generateToken");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("Please Enter All Fields");
  }
  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(400);
    throw new Error("User Already exits with this Username");
  }
  const user = await User.create({
    username,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      username: username,
      password: password,
      token: generateToken(user._id),
      message: "Registed successfully!!",
    });
  } else {
    res.status(400);
    throw new Error("Failed to create a User");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("Please Enter All Fields");
  }
  const user = await User.findOne({ username });
  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      token: generateToken(user._id),
      message: "Logged In successfully!!",
    });
  } else {
    res.status(401);
    throw new Error("Invalid Username or Password");
  }
});
module.exports = { registerUser, loginUser };
