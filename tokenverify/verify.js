const dotenv=require('dotenv');
const jwt =require("jsonwebtoken");
dotenv.config();

const verify=async(req,res,next)=>{
    const token=req.header('token');
    if(!token){
        req.error="Access Denied";
    }
    try{
        const result=await jwt.verify(token,process.env.TOKEN_SECRET);
        req.user=result;
    }catch{
        req.error="Invalid token";
    }
    next();
}

module.exports=verify;