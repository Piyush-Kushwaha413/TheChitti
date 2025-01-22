const AsyncHandler = require("express-async-handler");
const Chat = require("../models/chat.model");
const User = require("../models/user.model");

//  controller to accessChat
const accessChat = AsyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("user_id not send with req.");
    res.sendStatus(401);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemntMatch: { $eq: userId } } },
      { users: { $elemntMatch: { $eq: req.body.user._id } } },
    ],
  })
    .populate("users", "-passowrd")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: " name pic email",
  });
  if (isChat.length > 0) {
    res.status(200).send(isChat[0]);
  } else {
    // create new chat document
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };
    try {
      const createChat = await Chat.create(chatData); // get chat_id
      const fullChat = await Chat.findOne({ _id: createChat._id }).populate(
        "users",
        "-passowrd"
      );
      res.status(200).send(fullChat);
    } catch (error) {
        res.send(error)
    }
  }
});

//  controller to fetchChat

const fetchChat = AsyncHandler(async () => {});

//  controller to createGroupChat

const createGroupChat = AsyncHandler(async () => {});

//  controller to renameGroup
const renameGroup = AsyncHandler(async () => {});

//  controller to removeFromGroup
const removeFromGroup = AsyncHandler(async () => {});

//  controller to addToGroup
const addToGroup = AsyncHandler(async () => {});

module.exports = {
  accessChat,
  fetchChat,
  accessChat,
  createGroupChat,
  removeFromGroup,
  renameGroup,
  addToGroup,
};
