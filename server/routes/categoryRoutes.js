const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')
const categoryValidations = require('../validations/categoryValidations')
const auth = require('../middlewares/auth')
const checkrole = require('../middlewares/checkRole')

router.post('/',auth, checkrole(2), categoryValidations.addcategory, categoryController.addcategory)
router.get('/be',auth, checkrole(2), categoryController.getallcategory)

module.exports = router