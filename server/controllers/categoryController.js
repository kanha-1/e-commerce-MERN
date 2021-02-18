const { validationResult } = require("express-validator");
const Category = require("../models/categoryModel");

module.exports={
  addcategory:async function (req, res, next) {
    if (!validationResult(req).isEmpty()) {
      //Check if there is any validation error.
      return res
        .status(200)
        .json({ success: false, message: "VALIDATION_ERROR", error: { status: 400, errors: validationResult(req).mapped() } });
    }
    try {
     const category = new Category({...req.body})
     await category.save()
     res.status(200).json({success:true, message:"Category added successfully"})
    } catch (error) {
      next(error);
    }
  },
  getallcategory:async function (req, res, next) {
    try {
     const categories = await Category.find({})
     res.status(200).json({success:true, categories})
    } catch (error) {
      next(error);
    }
  },
}
