const { response } = require("express");

const User = require("../models/user");

const getAll = async (req, res = response) => {
  const from = Number(req.query.from) || 0;
  try {

    const users = await User
      .find({ _id: { $ne: req.uid } })
      .sort('-online')
      .skip(from)
      .limit(20);
      
    res.json({
      ok: true,
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: "Some error ocurred while create user",
    });
  }
};

module.exports = {
  getAll,
};
