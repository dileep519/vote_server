const mongoose=require('mongoose');

const hackerSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    csolved:{
        type:Number,
        required:true
    },
    elevel:{
        type:String,
        required:true
    },
    expertin:[
    ],
    count:{
        type:Number,
        default:0
    }
});

const hacker=new mongoose.model('hacker',hackerSchema);

module.exports=hacker;