const {body} = require('express-validator')

const categoryValidation = {};

categoryValidation.addcategory = [
    body("name")
      .not()
      .isEmpty()
      .withMessage("Name is required!")
      .isLength({
        min: 2,
        max: 50,
      })
      .withMessage("Name must be between 2 to 50 characters."),
      body("about")
      .not()
      .isEmpty()
      .withMessage("About is required!")
      .isLength({
        min: 10,
        max:100
      })
      .withMessage("About must be minimum 10 and max 100 characters.")
  ];
  module.exports = categoryValidation