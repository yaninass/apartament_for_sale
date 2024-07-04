const Router=require('express')
const router = new Router()
const FeedbackController = require('../controllers/feedbackControllers')
const checkRole = require('../middleware/checkRoleMiddlware')

router.post('/',FeedbackController.create)
router.get('/',FeedbackController.getALL)
router.delete('/:id',checkRole('ADMIN'),FeedbackController.delete)



module.exports=router