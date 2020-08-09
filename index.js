require('./dbconnection/connectdb');
const express=require('express');
const app=express();
const dotenv=require('dotenv');
const port=process.env.PORT || 3001;
const router=require('./dbconnection/routes');
const bodyparser=require("body-parser");
const cors=require('cors');
dotenv.config();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());
app.use("/user",router);
app.listen(port,()=>{
    console.log("Server is up");
});