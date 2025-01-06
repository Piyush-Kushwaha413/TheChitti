
const dotenv = require("dotenv");
const express = require("express");
const connectDB  = require("./config/connection");
const userRoutes = require("./routes/userRoutes")
dotenv.config()



const app = express();
// const PORT = 8000
 
// constance values 
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