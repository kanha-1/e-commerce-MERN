const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')
const orderValidations = require('../validations/orderValidations')
const auth = require('../middlewares/auth')
const checkrole = require('../middlewares/checkRole')


router.post('/',auth, orderValidations.createorder, orderController.createorder)
router.put('/:status',auth,checkrole(2), orderValidations.updateorder, orderController.updateorder)
router.get('/be',auth, orderController.getallorders)


module.exports = router