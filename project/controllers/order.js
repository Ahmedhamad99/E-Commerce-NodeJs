const productModel = require("../models/product")
const userModel = require("../models/users")
const cartModel = require("../models/cart")




let checkout = async(req,res,next)=>{
    let user = await userModel.findById(req.user.id)    
    try{
        user.cart = []
        await user.save
        return res.status(200).json({message:"Order placed",data:user});
    }
    catch(err){
        return res.status(400).json({message:"Error order not placed",data:err});

    }
}

let getOrders = async(req,res,next)=>{
    let user = await userModel.findById(req.user.id)
    try{
        return res.status(200).json({message:"Orders",data:user.orders});

        }
    catch(err){
        return res.status(400).json({message:"Error",data:err});
    }

}

let createOrder = async(req,res,next)=>{
    let user = await userModel.findById(req.user.id)
    let {productId,quantity} = req.body
   try{
    let product = await productModel.findById(productId)
    let order = {
        productId:product._id,
        quantity:quantity,
        price:product.price,
        name:product.name,
        image:product.image,
        user:user._id
    }
    user.orders.push(order)
    await user.save()
    return res.status(200).json({message:"Order created",data:user});
   }
   catch(err){
    return res.status(400).json({message:"Error order not created",data:err});
   }
}

let deleteOrder = async(req,res,next)=>{
    let user = await userModel.findById(req.user.id)
    let {orderId} = req.params
    try{
        user.orders = user.orders.filter((order)=>order._id.toString() !== orderId)
        await user.save()
        return res.status(200).json({message:"Order deleted",data:user});
    }
    catch(err){
        return res.status(400).json({message:"Error order not deleted",data:err});
    }
}


module.exports = {getOrders,createOrder,checkout,deleteOrder}