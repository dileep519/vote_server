const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
mongoose.connect(`mongodb+srv://dileep_519:${process.env.PASSWORD_REQ}@usersdata-f8xkd.mongodb.net/Vote_DB?retryWrites=true&w=majority`,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:true}).then((res)=>{
    console.log("Connection Established");
}).catch((err)=>{
    console.log("Error in Connection");
});