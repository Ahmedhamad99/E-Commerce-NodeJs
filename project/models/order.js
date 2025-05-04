const { status } = require("express/lib/response");
const mongoose = require("mongoose");


const orderSchema =mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }],
    status:{
        type:String,
        enum:['pending','compelted','Canceled'],
        default:"pending"
    }
    
});


module.exports = mongoose.model('Order',orderSchema);
