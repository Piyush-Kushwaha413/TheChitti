const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const genrerateToken = require("../config/jwtoken.js")
const jwt  = require('jsonwebtoken')


const authMiddleware = async(req,res,next)=>{
let token ;
//  req.headers.authorization
if ( req.headers.authorization && 
    req.headers.authorization.startsWith("Bearer")) {
        console.log(req.headers.authorization, "token");
        try {
            // if header have token , verify the the user
            let token ;

            token = req.headers.authorization.split(" ")[1]
            console.log(token);
            const decode = jwt.verify(token , process.env.JWT_SECRET);
            req.user = await User.findById(decode.id).select("-password");
            
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