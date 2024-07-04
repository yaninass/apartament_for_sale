const {District} = require("../models/models")
class DistrictController{
async getALL(req,res,next){ 
    try {
    const districts = await District.findAll(); // Пример запроса всех записей из базы данных
    return res.json(districts);
} catch (e) {
    next(ApiError.badRequest(e.message));
}
}
async getOne(req,res,next){
    const {id}=req.params
    const district = await District.findOne({where:{id}});
    return res.json(district)
}
}
module.exports = new DistrictController()