const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId:{
        type:String,
        require:true
    },
    productId: {
        type: String,
        required: true,
        ref:"product"
      },
    quantity: {
        type: Number,
        required: true,
      },
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:String, default:"placed"
    },
      
},{ timestamps: true })

const Order = mongoose.model("order", orderSchema);

module.exports = Order;