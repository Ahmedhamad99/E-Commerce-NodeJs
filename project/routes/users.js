const express = require('express');
const router = express.Router();
let auth = require("../middelwares/auth")
let valdtion = require("../middelwares/validation")

const userFunctions = require('../controllers/users');

const registerValidation = require("../validations/registerValidtion")
router.get('/', userFunctions.getUsers);
router.post('/register', valdtion(registerValidation),userFunctions.createUser);
router.get('/:id', userFunctions.getUserById);
router.post('/login', userFunctions.login);
router.patch('/update/:id', userFunctions.updateUser);
router.delete('delete/:id',auth.auth ,userFunctions.deleteUser);
router.post("/update-password",auth.auth,userFunctions.updatpassword)
router.post('/forgot-password', userFunctions.forgotPassword);
router.post('/reset-password/:token', userFunctions.resetpassword);

router.post("/sellers", auth.auth, auth.restrictTo("admin"), userFunctions.createSeller);
router.get("/sellers/:id/products", auth.auth, auth.restrictTo("seller", "admin"), userFunctions.getSellerProducts);

module.exports = router;