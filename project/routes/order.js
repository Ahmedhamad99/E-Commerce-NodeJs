const express = require('express');
const router = express.Router();

let auth = require("../middelwares/auth")

let orderFunction = require("../controllers/order");



router.get("/",auth.auth,auth.restrictTo("user","admin"),orderFunction.getOrders);

router.post('/checkout',auth.auth,auth.restrictTo("user","admin"),orderFunction.checkout);


router.post("/order",auth.auth,auth.restrictTo("user","admin"),orderFunction.createOrder);

router.delete("/order/:id",auth.auth,auth.restrictTo("user","admin"),orderFunction.deleteOrder);




module.exports = router;