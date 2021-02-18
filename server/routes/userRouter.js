const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const userValidations = require('../validations/userValidations')
const auth = require('../middlewares/auth')
const checkrole = require('../middlewares/checkRole')

router.post('/register', userValidations.register, userController.register)
router.post('/login', userValidations.login, userController.login)
router.post('/logout', auth,userController.logout)
router.put('/deactivate', auth, checkrole(2), userValidations.deactivateuser, userController.deactivateuser)
router.get('/all/be',auth,checkrole(2), userController.getallusers)
router.put('/activate', auth, checkrole(2), userValidations.activateuser, userController.activateuser)

module.exports = router