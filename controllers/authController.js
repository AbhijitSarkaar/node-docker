const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

exports.signUp = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      username,
      password: hashPassword,
    });

    res.status(201).json({
      status: "success",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "user not found",
      });
    }

    const isCorrect = await bcrypt.compare(password, user.password);

    if (isCorrect) {
      res.status(200).json({
        status: "login success",
      });
    } else {
      return res.status(400).json({
        status: "fail",
        message: "incorrect password",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
    });
  }
};
