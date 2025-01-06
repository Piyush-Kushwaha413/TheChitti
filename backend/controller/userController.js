const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("ples fill all the filds");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("user Already Exist");
  }
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: req.body.pic,
    })
  }else{
        res.status(400);
        throw new Error("Failed to crate user")
    }
});


module.exports =  {registerUser}