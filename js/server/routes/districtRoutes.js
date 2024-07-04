const Router=require('express')
const router = new Router()

const districtControllers = require('../controllers/districtControllers')


router.get('/',districtControllers.getALL)
router.get('/:id',districtControllers.getOne)




module.exports=router