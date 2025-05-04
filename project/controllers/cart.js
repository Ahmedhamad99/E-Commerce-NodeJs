


const productModel = require("../models/product")
const userModel = require("../models/users")



let getCart = async (req, res, next) => {
    try {
      let user = await userModel
        .findById(req.user.id)
        .populate("cart")
        .exec();
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      console.log("Cart in getCart:", user.cart);
  
      if (!user.cart || user.cart.length === 0) {
        return res.status(200).json({
          message: "Cart is empty",
          data: [],
        });
      }
  
      return res.status(200).json({
        message: "Cart retrieved",
        data: user.cart,
      });
    } catch (error) {
      console.error("Error in getCart:", error);
      return res.status(500).json({
        message: "Failed to retrieve cart",
        error: error.message,
      });
    }
  }

let addToCart = async (req, res, next) => {
    try {
      const id = req.params.id;
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
  
      let product = await productModel.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      let user = await userModel.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      console.log("Before adding to cart:", user.cart);
  
      if (!user.cart.includes(id)) {
        user.cart.push(id); 
        await user.save();
      }
  
      const savedUser = await userModel.findById(req.user.id);
      console.log("After adding to cart:", savedUser.cart);
  
      const updatedUser = await userModel
        .findById(req.user.id)
        .populate("cart")
        .exec();
  
      return res.status(200).json({
        message: "Product added to cart",
        data: updatedUser.cart || [],
      });
    } catch (err) {
      console.error("Error in addToCart:", err);
      return res.status(400).json({
        message: "Error: Product not added to cart",
        error: err.message,
      });
    }
  };

let removeFromCart = async(req,res,next)=>{
    let id = req.params.id
    try{
        let user = await userModel.findById(req.user.id)
        let product = await productModel.findById(id)
        user.cart.pull(product)
        await user.save()
        return res.status(200).json({message:"Product removed from cart",data:user});
    }
    catch(err){
        return res.status(400).json({message:"Error product not removed",data:err});
    }
}
let updateCart = async(req,res,next)=>{
    let id = req.params.id
    let updateProduct = req.body
    try{
            let user = await userModel.findById(req.user.id)
            let product = await productModel.findById(id)
            product.quantity = updateProduct.quantity
            user.cart.push(product)
    
            await product.save()
            return res.status(200).json({message:"Product updated",data:user});
    }
    catch(err){
        return res.status(400).json({message:"Error product not updated",data:err});
    }
}



module.exports = {
    getCart,
    addToCart,
    removeFromCart,
    updateCart
}