const jwt = require("jsonwebtoken")
const Utils = require("util")

const productModel = require("../models/product")



async function auth(req, res, next) {
    let authorization = req.headers.authorization
    console.log(authorization)
    if (!authorization){
        return res.status(401).json({ error: "Unauthorized" })
    }
    else{
        try{
            let decoded = await Utils.promisify(jwt.verify)(authorization, process.env.SECRET);
        
        req.user = {
            id: decoded.id,
            role: decoded.role,
            email: decoded.email, 
          };
          console.log("Hello from auth")
        next()
        }
        catch(err){
          
                 return res.status(401).json({ message: "Unauthorized" })
        }

    }
    
}


const restrictTo = (...roles) => (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: "Unauthorized: User data missing" });
    }
  
    if (roles.includes(req.user.role)) {
      next();
    } else {
      return res.status(403).json({ message: "You don't have permission" });
    }
  };


const restrictToOwnProduct =async (req, res, next) => {
    const productId = req.params.id;
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(401).json({ message: "Product not found" });
    }
  
    if (  product.user.toString() !== req.user.id   &&req.user.role !== "admin") {
      return res.status(403).json({ message: "You can see your product only" });
    }
  
    next();
  };
module.exports = {auth, restrictTo,restrictToOwnProduct}