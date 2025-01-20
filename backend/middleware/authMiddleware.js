const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const genrerateToken = require("../config/jwtoken.js")
const jwt  = require('jsonwebtoken')





const authMiddleware = async(req,res,next)=>{



}

module.exports = {authMiddleware}