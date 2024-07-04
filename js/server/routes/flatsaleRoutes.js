const Router=require('express')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddlware')
const flatsaleController = require('../controllers/flatsaleControllers')

router.post('/',flatsaleController.create)
router.get('/',checkRole('ADMIN'),flatsaleController.getALL)
router.delete('/:id',checkRole('ADMIN'),flatsaleController.delete)




module.exports=router