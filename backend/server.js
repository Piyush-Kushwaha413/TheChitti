
const dotenv = require("dotenv");
const express = require("express");
const connectDB  = require("./config/connection");
const userRoutes = require("./routes/userRoutes");
const generateToken = require('./config/jwtoken');
const cors = require("cors");
const {notFound, errorHandler} = require('./middleware/errorMiddleware')
dotenv.config()



// middelwares
const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
}))


app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))

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
app.use(notFound)
app.use(errorHandler)





app.listen(PORT,()=>{
    console.log(`app is running on port no.  + ${PORT}`)
})
