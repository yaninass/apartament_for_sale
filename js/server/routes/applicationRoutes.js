const Router=require('express')
const router = new Router()
const applicationController = require('../controllers/applicationControllers')
const checkRole = require('../middleware/checkRoleMiddlware')

router.post('/',applicationController.create)
router.get('/',checkRole('ADMIN'),applicationController.getALL)
router.get('/:userId',applicationController.getOne)
router.put('/:id',checkRole('ADMIN'),applicationController.update)
router.delete('/:id',checkRole('ADMIN'),applicationController.delete)



module.exports=router