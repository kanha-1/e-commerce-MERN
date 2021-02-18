const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    category: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      cost: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      about: {
        type: String,
        required: true,
      },
      
},{ timestamps: true })

const Product = mongoose.model("product", productSchema);

module.exports = Product;