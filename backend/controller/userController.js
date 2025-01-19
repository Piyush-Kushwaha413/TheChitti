const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const genrerateToken = require("../config/jwtoken.js")



// function to singup
const registerUser = asyncHandler(async (req, res) => {
  // genrerateToken(user._id)
  const { name, email, password, pic , isAdmin } = req.body;

  // if have the data or not 
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("ples fill all the filds");
  }

  // check user is exist or not
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(201).json({
      _id: userExists._id,
      name: userExists.name,
      email: userExists.email,
      token: genrerateToken(userExists._id),
    })
    throw new Error("user Already Exist");
  }


  const user = await User.create({
    name,
    email,
    password,
    pic,
    isAdmin
    
  })

   if (user) {
    // const token = genrerateToken(user._id)

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,

      token: genrerateToken(user._id),
      

    })
  }else{
        res.status(400);
        throw new Error("Failed to crate user")
    }
});


const authUser = asyncHandler(async(req,res)=>{
  const { email, password } = req.body;

  const userExists =  await User.findOne({email})
  if (userExists && (await userExists.matchPassword(password))) {
    res.status(201).json({
      _id:userExists._id,
      name: userExists.name,
      email: userExists.email,
      pic: userExists.pic,
    })

    
  }else{
    res.status(401)
    throw new Error("user not exist : register first ");
    
  }
})

module.exports =  {registerUser, authUser}