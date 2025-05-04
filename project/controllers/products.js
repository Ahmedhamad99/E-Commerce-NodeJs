const productModel = require("../models/product")
const userModel = require("../models/users")
const cartModel = require("../models/cart")
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");


let getAllProducts = async(req,res,next)=>{


    try{
        let products = await productModel.find()
        return res.status(200).json({message:"All Products",data:products});
    }
    catch(err){
        return res.status(400).json({message:"Error",data:err});

    }


}

let addProduct = async(req,res,next)=>{

    let newProduct = req.body;
    let {token} = req.params;

    try{
        
        let user = await userModel.findById(req.user.id);
        newProduct.photo = `/uploads/${req.file.filename}`;
        newProduct.user = user._id
        console.log(newProduct);
        let product = await productModel.create({...newProduct});
        return res.status(200).json({message:"Product added",data:product});
    }
    catch(err){
        return res.status(400).json({message:"product not added ",data:err.message});
    }
}

let getProductById = async(req,res,next)=>{
    let id = req.params.id
    try{
        let product = await productModel.findById(id);
        return res.status(200).json({message:"Product",data:product});
    }
    catch(err){
        return res.status(400).json({message:"Error",data:err});
    }

}

let deleteProduct = async(req,res,next)=>{
    let id = req.params.id
    try{
        let product = await productModel.findByIdAndDelete(id);
        return res.status(200).json({message:"Product deleted",data:product});
    }
    catch(err){
        return res.status(400).json({message:"Error",data:err});
    }
}

let updateProduct = async(req,res,next)=>{
    let id = req.params.id
    let updateProduct = req.body
    try{
        let product = await productModel.findByIdAndUpdate(id,updateProduct);
        return res.status(200).json({message:"Product updated",data:product});
    }
    catch(err){
        return res.status(400).json({message:"Error",data:err});
    }
}

let searchProduct = async(req,res,next)=>{
    let query = req.params.query
    try{
        let product = await productModel.find({name:{$regex:query}});
        return res.status(200).json({message:"Product",data:product});
    }
    catch(err){
        return res.status(400).json({message:"Error",data:err});
    }
}

let getProductsByCategory = async(req,res,next)=>{
    let category = req.params.category 
    try{
        let product = await productModel.find({category:category});
        return res.status(200).json({message:"Product",data:product});
    }
    catch(err){
        return res.status(400).json({message:"Error",data:err});
    }
}








module.exports = {getAllProducts,addProduct,getProductById,deleteProduct,updateProduct,searchProduct,getProductsByCategory};
