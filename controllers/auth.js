const { response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        ok: false,
        msg: "The email already exists",
      });
    }

    const user = new User(req.body);

    const salt = bcrypt.genSaltSync();
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const token = await generateJWT(user.id);
    res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: "Some error ocurred while create user",
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const find = await User.findOne({ email });
    if (!find) {
      return res.status(404).json({
        ok: false,
        msg: "The email does not exist",
      });
    }

    const validatePassword = await bcrypt.compare(password, find.password);
    if (!validatePassword) {
      return res.status(400).json({
        ok: false,
        msg: "The password does not match",
      });
    }

    const token = await generateJWT(find.id);
    res.json({
      ok: true,
      user: find,
      token,
    });
  } catch (error) {
    res.statusCode(500).json({
      ok: false,
      message: "Some error ocurred while login user",
    });
  }
};

const refreshToken = async (req, res = response) => {
  const uid = req.uid;
  try {
    const token = await generateJWT(uid);
    const user = await User.findById(uid);

    res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Some error ocurred while refresh token",
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  refreshToken,
};
