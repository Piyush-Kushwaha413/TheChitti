
const dotenv = require("dotenv");
const express = require("express");
const connectDB  = require("./config/connection");
const userRoutes = require("./routes/userRoutes")
const generateToken = require('./config/jwtoken')
dotenv.config()






// middelwares
const app = express();


app.use(express.json())

// constance values 
// const PORT = 8000 
const PORT = process.env.PORT || 8000 

// connect to Data base
connectDB();

// Routing Server are here
app.get("/", (req,res)=>{
    res.send("Api is running");
})

// middelware 
app.use("/api/user",userRoutes)





app.listen(PORT,()=>{
    console.log(`app is running on port no.  + ${PORT}`)
})
