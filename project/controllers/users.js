const userModel = require("../models/users")
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const res = require("express/lib/response");



let getUsers = async(req,res)=>{
    try{
          let users = await userModel.find().select("username email _id")
          res.status(200).json(users)
    }catch(err){
        console.log(err);
    
    }
} 


let createUser = async(req,res)=>{
    let newUser = req.body;
    console.log("new user ==>",newUser);


    try{
        const saveUser = await userModel.create(newUser);
        res.status(200).json({message:"user created",data:saveUser})
        
    }
    catch(err){
        res.status(400).json({message:"user not created",error:err})
    }
}

let getUserById = async(req,res)=>{
    let id = req.params.id;
    try{
        let user = await userModel.findById(id)
        res.status(200).json({message:"user found",data:user})
    }
    catch(err){
        res.status(400).json({message:"user not found",error:err})
    }
}
let login = async(req,res)=>{
    let {email,password} = req.body;

    if(!email || !password){
        res.status(400).json({message:"please fill all the fields"})
    }
    try{
        let user = await userModel.findOne({email:email})
       if(!user){
            return res.status(400).json({message:"user not found"})
       }
       let isVlaid = await bcrypt.compare(password,user.password);
       if(isVlaid){
        let token = jwt.sign({id:user._id,email:user.email,role:user.role},process.env.SECRET);
        return res.status(200).json({message:"login success",token:token})
       }
       else{
        return res.status(400).json({message:"Please cheeck email or passeord and try again"})
       }

    }
    catch(err){
        res.status(400).json({message:"login failed",error:err})
    }

}

let updateUser = async(req,res)=>{
    let userUpdat = req.body
    let id = req.params.id

   try{
    let user = await userModel.findByIdAndUpdate(id,userUpdat);
    if(user){
        return res.status(200).json({message:"Updated Successfully",data:user});
    }
    else{
        return res.status(404).json({message:"user not found"})
    }

   }
   catch(err){
    return res.status(400).json({messsage:err.message})
   }

}

let deleteUser = async(req,res)=>{
    let id = req.params.id;

    try{
            let userTodelete = await userModel.findByIdAndDelete(id);
            if(userTodelete){
                return res.status(200).json({message:"Deleted Successgfully"});
            }
            else{
                return res.status(404).json({message:"User not found"});
            }
    }
    catch(err){
        return res.status(400).json({message:err.message});
    }
}


let updatpassword = async(req,res)=>{
   let {currentpassword,newpassword} = req.body;

   if(!currentpassword || !newpassword){
        return res.status(401).json({messsage:"You must provid Current or new password"});
   }
   else{
    let user = await userModel.findById(req.id);
    if(user){
        let validatPass = await bcrypt.compare(currentpassword,user.password);
        if(validatPass){
            user.password = newpassword
            await user.save()
            let token  = jwt.sign({id:user._id,email:user.email,role:user.role},process.env.SECRET);
            return res.status(200).json({message:"Changed Password Successfully",token:token});
        }
    }
    else{
        return res.status(401).json({message:"Invalid current password"})
    }
   }
}


let forgotPassword = async(req,res)=>{
 let {email} = req.body;
 if(!email){
    return res.status(400).json({message:"Email is required"})
 }
 else{
    let user = await userModel.findOne({email:email})
    if(user){
        let token = jwt.sign({id:user._id,email:user.email,role:user.role},process.env.SECRET);
        let url = `http://localhost:3330/reset-password/${token}`
        return res.status(200).json({message:"Please click on the link to reset password",url:url})
    }
    else{
        return res.status(400).json({message:"Invalid email"})
    }
 }
}


let resetpassword =async(req,res)=>{
    let {token} = req.params;
    let {newpassword} = req.body

    if(!newpassword){
        return res.status(400).json({message:"New password is required"});
    }
    try{
               let user = await userModel.findOne(token);
               if(user){
                user.password = newpassword
                user.resetPasswordToken = undefined
                await user.save()
                return res.status(200).json({message:"Password Canged Successfully"});
               }
    }
    catch(err){
        return res.status(400).json({message:err.message});

    }
};

let createSeller = async(req,res)=>{
    let seller = req.body;
    console.log("seller==>",seller);
    try{
        const saveSeller = await userModel.create(seller);
        res.status(200).json({message:"seller created",data:saveSeller})
        
    }
    catch(err){
        res.status(400).json({message:"seller not created",error:err})
    }
}


let getSellerProducts = async(req,res)=>{
    let id = req.params.id;
    try{
        let user = await userModel.findById(id);
        if(user){
            let products = await user.products.find();
            res.status(200).json({message:"products found",data:products})
        }
    }
    catch(err){
        res.status(400).json({message:"products not found",error:err})
    }
}



module.exports = {resetpassword,forgotPassword,getUsers,createUser,getUserById,login,updateUser,deleteUser,updatpassword,createSeller,getSellerProducts}