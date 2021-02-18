const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId:{
        type:String,
        require:true
    },
    productId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref:"product"
      },
    quantity: {
        type: Number,
        required: true,
      }
      
},{ timestamps: true })

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;