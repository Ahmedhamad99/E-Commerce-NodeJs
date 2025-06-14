const mongoose = require("mongoose");


const cartSchema =mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [
        {
        
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
});

module.exports = mongoose.model('Cart',cartSchema);