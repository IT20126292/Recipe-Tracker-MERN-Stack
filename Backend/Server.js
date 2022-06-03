//import npm packages
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

//middleware
app.use(cors());
app.use(bodyParser.json());


//assign localhost port number 
const PORT = process.env.PORT || 8070;


//database configuration
const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}, err=>{
    if(err) throw err;
    console.log("Database connected sucessfully");
});


//start mongodb connection
// const connection = mongoose.connection;
// connection.once("open", ()=>{
//     console.log("Database connected sucessfully");
// });

app.listen(PORT, ()=>{
    console.log(`server is currently running on port number:${PORT}`);
});

const userRoutes = require("./Routes/userRoutes");

app.use("/recipe",userRoutes);