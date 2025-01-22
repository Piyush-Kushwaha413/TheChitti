const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const genrerateToken = require("../config/jwtoken.js")
const jwt  = require('jsonwebtoken')


const authMiddleware = async(req,res,next)=>{
    console.log("authMeddleware run ");
let token ;
//  req.headers.authorization
if ( req.headers.authorization && 
    req.headers.authorization.startsWith("Bearer")) {
        try {
            // if header have token , verify the the user
            let token ;

            token = req.headers.authorization.split(" ")[1]
            
            // bug get wrong id
            const decode = jwt.verify(token , process.env.JWT_SECRET);
            req.user = await User.findById(decode.id).select("-password");
            console.log(req.user);
            console.log(req.user._id);
            next()
        } catch (error) {
            res.status(401).send("user is not authorizes, user not find")
            console.log("user is not authorizes, user not find");
            throw new Error(error)
            
        }
    
} else {
   

 console.log("not get the token");   
}

}

module.exports = {authMiddleware}