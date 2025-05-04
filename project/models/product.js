const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { type } = require("express/lib/response");

const productSchema = mongoose.Schema({

    name:{
        type:String,
        required:true,
        index:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    photo:{
        type:String,
        required:false
    },
    category:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
    
},{timestamps:true});


productSchema.index({name:'text','seller.name':'text'});


module.exports = mongoose.model('Product',productSchema);