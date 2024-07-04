const Router=require('express')
const router = new Router()
const feedbackRouter = require('./feedbackRoutes')
const applicationRouter =require('./applicationRoutes')
const userRouter = require('./userRoutes')
const flatRouter=require('./flatRoutes')
const districtRouter=require('./districtRoutes')
const flatsaleRouter=require('./flatsaleRoutes')

router.use('/user',userRouter)
router.use('/feedback',feedbackRouter)
router.use('/application',applicationRouter)
router.use('/flat',flatRouter)
router.use('/district',districtRouter)
router.use('/flatsale',flatsaleRouter)




module.exports=router