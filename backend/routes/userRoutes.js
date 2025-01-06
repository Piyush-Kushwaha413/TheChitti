const express = require("express");
const { registerUser } = require("../controller/userController");

const router =  express.Router()

router.route("/").post(registerUser)
router.post("/login",()=>{

})

module.exports = router


