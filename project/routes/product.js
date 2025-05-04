const express = require('express');
const router = express.Router();
const productFunction = require('../controllers/products');
let auth = require("../middelwares/auth")
const upload = require("../utils/imageUpload")


router.get('/', productFunction.getAllProducts);

router.post("/add-product",auth.auth,auth.restrictTo("seller","admin"),upload.single("photo"), productFunction.addProduct);

router.get('/:id', productFunction.getProductById);

router.delete('/:id',auth.auth,auth.restrictTo("seller","admin"), productFunction.deleteProduct);

router.patch('/:id',auth.auth,auth.restrictTo("seller","admin"), productFunction.updateProduct);

router.get('/search/:query',auth.auth, productFunction.searchProduct);

router.get('/category/:category', productFunction.getProductsByCategory);




module.exports = router;