const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },role:{
        type:String,
        required:true,
        default:'User'
    },vote:{
        type:Boolean,
        required:true,
        default:false
    },votedto:{
        type:String,
        default:" "
    }
});

const user=new mongoose.model('User',UserSchema);

module.exports=user;