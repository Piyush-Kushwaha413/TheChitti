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


// function to login
const authUser = asyncHandler(async(req,res)=>{
  console.log("authUser run ");
  console.log(req.body
    );
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
    console.log("user not exist");
    throw new Error("user not exist : register first ");
    
  }
})

const allUsers = asyncHandler(async (req, res)=>{
  // /api/user?search=name
  console.log(req.query.search);

  try {
    const keyword = req.query.search ? {
      $or: [
        { name: { $regex: req.query.search, $options: 'i' } },
        // { email: { $regex: req.query.search, $options: 'i' } }
      ]
    } : {};
    const users = keyword ? (await User.find(keyword)) :{}
    res.send(users)
    console.log(users);
  } catch (error) {
    res.send("not found any user this is credencital")
    console.log("not found user");
  }
} )
module.exports =  {registerUser, authUser, allUsers}