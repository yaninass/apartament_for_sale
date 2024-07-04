const Router=require('express')
const router = new Router()
const flatControllers =require('../controllers/flatControllers')
const checkRole = require('../middleware/checkRoleMiddlware')

router.post('/',flatControllers.create)
router.get('/',flatControllers.getALL)
router.get('/:id',flatControllers.getOne)
router.delete('/:id',checkRole('ADMIN'),flatControllers.delete)



module.exports=router