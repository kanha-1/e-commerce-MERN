const {body, param} = require('express-validator')

const productValidation = {};

productValidation.addproduct = [
    body("name")
      .not()
      .isEmpty()
      .withMessage("Name is required!")
      .isLength({
        min: 2
      })
      .withMessage("Name must be minimum 2 characters."),
      body("category")
      .not()
      .isEmpty()
      .withMessage("Category is required!"),
      body("image")
      .not()
      .isEmpty()
      .withMessage("Image is required!")
      .isLength({
        min: 2,
      })
      .withMessage("Image must be min 2 characters."),
      body("cost")
      .not()
      .isEmpty()
      .withMessage("Cost is required!")
      .isNumeric()
      .withMessage("Cost must be a number"),
      body("quantity")
      .not()
      .isEmpty()
      .withMessage("Quantity is required!")
      .isNumeric()
      .withMessage("Quantity must be a number"),
      body("rating")
      .not()
      .isEmpty()
      .withMessage("Rating is required!")
      .isNumeric({min: 0, max: 5})
      .withMessage("Rating must be a number between 0 to 5")
      ,
      body("about")
      .not()
      .isEmpty()
      .withMessage("About is required!")
      .isLength({
        min: 10,
      })
      .withMessage("About must be minimum 50 characters.")
  ];
  productValidation.setprice = [
    body("productid")
      .not()
      .isEmpty()
      .withMessage("Product Id is required!"),
      body("cost")
      .not()
      .isEmpty()
      .withMessage("Cost is required!")
      .isNumeric()
      .withMessage("Cost must be numeric!")
     
  ];
  module.exports = productValidation