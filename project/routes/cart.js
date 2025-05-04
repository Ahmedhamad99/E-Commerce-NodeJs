const express = require('express');
const router = express.Router();
let auth = require("../middelwares/auth")

let cartFunction = require("../controllers/cart")

router.get('/',auth.auth,auth.restrictTo("user","admin"), cartFunction.getCart);

router.post('/add-to-cart/:id',auth.auth,auth.restrictTo("user","admin"), cartFunction.addToCart);
router.delete('/remove-from-cart/:id',auth.auth,auth.restrictTo("user","admin"),auth.restrictToOwnProduct, cartFunction.removeFromCart);


router.patch('/update-cart/:id',auth.auth,auth.restrictTo("user","admin"),auth.restrictToOwnProduct, cartFunction.updateCart);


module.exports = router;