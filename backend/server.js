
const dotenv = require("dotenv");
const express = require("express");
const chats =require("./dataDir/data.js")

const app = express();
// const PORT = 8000
dotenv.config()
 

const PORT = process.env.PORT || 8000 



// Routing Server are here
app.get("/", (req,res)=>{
    res.send("Api is running");
})

// chats API
app.get("/api/chats",(req,res)=>{
    res.send(chats)
})

app.get("/api/chats/:id",(req,res)=>{
   
    const singleChat  = chats.chats.find((c)=> c._id === req.params.id);
    res.json(singleChat)
})



app.listen(PORT,()=>{
    console.log("app is running on port no. " + PORT)
})