const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { accessChat } = require("../controller/chatController");

const router =  express.Router()

router.route("/").post(authMiddleware,accessChat)
// route.route("/fetchChat").get(authMiddleware,fetchChat)
// route.route("/createGroupChat").post(authMiddleware,createGroupChat)
// route.route("/renameGroup").put(authMiddleware,renameGroup)
// route.route("/removeFromGroup").put(authMiddleware,removeFromGroup)
// route.route("addToGroup").put(authMiddleware,addToGroup)


module.exports = router


