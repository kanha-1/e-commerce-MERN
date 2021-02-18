const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const productValidations = require('../validations/productValidations')
const auth = require('../middlewares/auth')
const checkrole = require('../middlewares/checkRole')

router.post('/',auth, checkrole(2), productValidations.addproduct, productController.addproduct)
router.put('/',auth, checkrole(2), productValidations.setprice, productController.setprice)
router.get('/be',auth, productController.getallproducts)

module.exports = router