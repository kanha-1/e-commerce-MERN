const { validationResult } = require("express-validator");
const Order = require("../models/orderModel");
const Product = require('../models/productModel')
const Cart = require('../models/cartModel')
module.exports={
  createorder:async function (req, res, next) {
    try {
      Cart.find({userId:req._id},async (err, result)=>{
        console.log(result)
        const itemArray = result
        for(let i=0; i<itemArray.length; i++){
          productId = itemArray[i].productId
          quantity = itemArray[i].quantity
          const product = await Product.findOne({_id:productId})
          const amount = Number(quantity)*Number(product.cost)
         const order = new Order({userId:req._id,productId, quantity, amount})
         await order.save()
        }
        await Cart.deleteMany({userId:req._id})
        return res.status(200).json({success:true, message:"Order placed successfully"})
      })
      
     
    } catch (error) {
      next(error);
    }
  },
  updateorder:async function (req, res, next) {
    if (!validationResult(req).isEmpty()) {
      //Check if there is any validation error.
      return res
        .status(200)
        .json({ success: false, message: "VALIDATION_ERROR", error: { status: 400, errors: validationResult(req).mapped() } });
    }
    try {
      const status  = req.params.status
      const {orderId} = req.body 
      await Order.findOneAndUpdate({_id:orderId}, {status})
     return res.status(200).json({success:true, message:`Order updated successfully to ${status}`})
    } catch (error) {
      next(error);
    }
  },
  getallorders:async function (req, res, next) {
    try {
      const orders = await Order.find({userId:req._id}).select("quantity amount status").populate({
        path: "productId",
        select: "name",
      });
      return res.status(200).json({success:true, orders})
    } catch (error) {
      next(error);
    }
  }
}
