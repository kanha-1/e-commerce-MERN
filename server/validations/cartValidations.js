const {body} = require('express-validator')

const cartValidation = {};

cartValidation.addtocart = [
      body("productId")
      .not()
      .isEmpty()
      .withMessage("productId is required!")
      
  ];

  module.exports = cartValidation