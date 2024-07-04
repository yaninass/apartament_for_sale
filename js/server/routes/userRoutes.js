const Router=require('express')
const router = new Router()
const UserController = require('../controllers/userControllers')
const authMiddleware = require("../middleware/authMiddleware")

router.post('/registration',UserController.registration)
router.post('/login',UserController.login)
router.get('/auth',authMiddleware,UserController.check)
router.get('/users', authMiddleware, UserController.getAllUsers);
router.delete('/users/:id', authMiddleware, UserController.deleteUser);
router.put('/users/:id/role', authMiddleware, UserController.changeUserRole);


module.exports=router