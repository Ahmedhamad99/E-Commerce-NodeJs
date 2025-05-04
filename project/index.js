const mongoose = require('mongoose');
const cors = require("cors")
const express = require('express');
const app = express();
const dotenv = require("dotenv")

let usersRouter = require("./routes/users")
let productsRouter = require("./routes/product")
let cartRouter = require("./routes/cart")
let orderRouter = require("./routes/order")

dotenv.config()
app.use(express.json()); 
app.use(cors());

mongoose.connect(`${process.env.DB_URL}`).then((res)=>{
    console.log("Connected to MongoDB");
   }).catch((err)=>{
    console.log(err);
})

app.use("/uploads", express.static("uploads"));

app.use("/users",usersRouter);
app.use("/products",productsRouter);
app.use("/cart",cartRouter);
app.use("/order",orderRouter);




app.listen(process.env.PORT , function () {
    console.log('Server is running on port 3330');
});