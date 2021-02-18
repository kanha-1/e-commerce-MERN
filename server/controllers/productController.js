const { validationResult } = require("express-validator");
const Product = require("../models/productModel");

module.exports={
  addproduct:async function (req, res, next) {
    if (!validationResult(req).isEmpty()) {
      //Check if there is any validation error.
      return res
        .status(200)
        .json({ success: false, message: "VALIDATION_ERROR", error: { status: 400, errors: validationResult(req).mapped() } });
    }
    try {
     const product = new Product({...req.body})
     await product.save()
     res.status(200).json({success:true, message:"Product added successfully"})
    } catch (error) {
      next(error);
    }
  },
  setprice:async function (req, res, next) {
    if (!validationResult(req).isEmpty()) {
      //Check if there is any validation error.
      return res
        .status(200)
        .json({ success: false, message: "VALIDATION_ERROR", error: { status: 400, errors: validationResult(req).mapped() } });
    }
    try {
      const {productid, cost} = req.body
     await Product.findOneAndUpdate({_id:productid}, {cost})
     res.status(200).json({success:true, message:"Product updated successfully"})
    } catch (error) {
      next(error);
    }
  },
  getallproducts:async function (req, res, next) {
    try {
      const query = req.query.name
      if(!query){
        const products =await Product.find({})
        return res.status(200).json({success:true, products})
      }
      const products = await Product.find({ name: new RegExp(query, "i")})
      return res.status(200).json({success:true, products})
      
    } catch (error) {
      next(error);
    }
  },
}
