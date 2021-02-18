const {body, param} = require('express-validator')

const orderValidation = {};

orderValidation.createorder = [
      body("productId")
      .not()
      .isEmpty()
      .withMessage("productid is required!"),
      body("quantity")
      .not()
      .isEmpty()
      .withMessage("userid is required!")
      .isNumeric()
      .withMessage("Quantity must nbe numeric")
      
  ];

  orderValidation.updateorder = [
    body("orderId")
    .not()
    .isEmpty()
    .withMessage("orderId is required!"),
    param("status")
    .not()
    .isEmpty()
    .withMessage("status is required!"),
];
  module.exports = orderValidation