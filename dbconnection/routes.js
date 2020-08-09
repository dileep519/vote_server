const router=require('express').Router();
const bcryptjs=require('bcryptjs');
const user=require('../Schema/userschema');
const hacker=require('../Schema/hackerschema');
const verify=require('../tokenverify/verify');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();

router.post('/login',(req,res)=>{
    user.findOne({email:req.body.email}).then(async (response)=>{
        if(!response){
            res.send({error:"User Does Not Exist",data:""});
        }else{
            const val=await bcryptjs.compare(req.body.password,response.password);
            if(val){
                const token=jwt.sign({_id:response._id},process.env.TOKEN_SECRET);
                const data={};
                data.token=token;
                data.voted=response.vote;
                data.votedto=response.votedto;
                data.role=response.role;
                res.status(200).send({error:"",data:data});
            }else{
                res.status(200).send({error:"Invalid Enail/Password",data:""})
            }   
        }
    }).catch((err)=>{
        console.log(err);
        res.status(200).send({error:"",data:""});
    })
})

router.post('/signup',(req,res)=>{
    user.find({email:req.body.email}).then((response)=>{
        if(response.length===0){
            var newuser;
            if(req.body.role){
                newuser= new user({
                    email:req.body.email,
                    password:req.body.password,
                    role:req.body.role
                })
            }else{
                 newuser=new user({
                    email:req.body.email,
                    password:req.body.password
                });
            }
            newuser.save().then((data)=>{
                res.status(200).send({error:"",data:"SignUp Done"});
            });
        }else{
            res.status(200).send({error:"Email Taken",data:""});
        }
    }).catch((err)=>{
        res.status(200).send({error:"Please Check Connection",data:""});
    })
});

router.post('/add',verify,(req,res)=>{
    try{
        if(req.error!==undefined){
            res.status(200).send({error:`${req.error}`,data:""})
        }
        else{
            const newhacker=new hacker({
                name:req.body.name,
                csolved:parseInt(req.body.solved),
                elevel:req.body.level,
                expertin:req.body.expert
            });
            newhacker.save().then((response)=>{
                res.status(200).send({error:"",data:true});
                
            }).catch((err)=>{
                res.status(400).send(err);
            })
        }
    }catch{
        // res.status(200).send({error:`${req.error}`,data:""})
        console.log("Err");
    }
})

router.post('/hackers',verify,(req,res)=>{
    
    hacker.find({}).then((response)=>{
        res.status(200).send({error:"",data:response});
    }).catch((err)=>{
        res.status(200).send({error:"",data:""});
    })
    
})

router.post('/votedtohacker',verify,async (req,res)=>{
    try{
        if(req.error){
            res.status(200).send({error:`${req.error}`,data:""})
        }else{
                await hacker.findByIdAndUpdate(req.body._id,{$set:{
                    count:req.body.count
                }}).then((response)=>{
                    res.status(200).send({error:"",data:true});
                }).cathc((err)=>{
                    res.status(200).send({error:"",data:false});
                })  
        }
    }catch{
        console.log("Errr");
    }
})

router.post('/voted',verify,(req,res)=>{
    try{
        if(req.error){
            res.status(200).send({error:`${req.error}`,data:""})
        }else{
            user.findByIdAndUpdate(req.user._id,{$set:{
                vote:true
            }}).then((response)=>{

                if(response._id){
                    res.status(200).send({error:"",data:true});
                }else{
                    res.status(200).send({error:"",data:false});
                }
            }).catch((err)=>{
                res.status(200).send({error:"",data:false});
            })
        }
    }catch{
        console.log("Errr");
    }
})

router.post("/delete",verify,(req,res)=>{
    try{
        if(req.error){
            res.status(200).send({error:`${req.error}`,data:""})
        }else{
            hacker.findByIdAndDelete({_id:req.body._id}).then((response)=>{
                console.log(response);
                res.status(200).send({error:"",data:true});
            }).cath((err)=>{
                res.status(200).send({error:"",data:false});
            })
        }
    }catch{
        console.log("Errr");
    }
})

router.post("/saveedit",verify,(req,res)=>{
    try{
        if(req.error){
            res.status(200).send({error:`${req.error}`,data:""})
        }else{
            hacker.findByIdAndUpdate({_id:req.body._id},{$set:{
                    name:req.body.name,
                    elevel:req.body.elevel,
                    csolved:req.body.csolved
                }
            }).then((response)=>{
                res.status(200).send({error:"",data:true});
            }).cath((err)=>{
                res.status(200).send({error:"",data:false});
            })
        }
    }catch{
        console.log("Errr");
    }
})

module.exports=router;