const uuid = require('uuid')
const path = require('path')
const {Flat} = require('../models/models')
const ApiError = require('../error/ApiError')
const { where } = require('sequelize')
class FlatController{
    async create(req,res,next){
        try{
        const {street,number_house,floor,rooms,qr_meters,price,districtId} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname,'..','static',fileName))

        const flat = await Flat.create({street,number_house,floor,rooms,qr_meters,price,districtId,img: fileName})

        return res.json(flat)}
        catch (e){
            next(ApiError.badRequest(e.message))
        }

    }
    async getALL(req,res){
        let {districtId, rooms, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let flats;
        if(!districtId ){
            flats = await Flat.findAndCountAll({limit,offset})
        }
        if( districtId ){
            flats = await Flat.findAndCountAll({ where:{districtId}},limit,offset)

        }
        return res.json(flats)

    }
    async getOne(req,res){
        const {id}=req.params
        const flat = await Flat.findOne({where:{id}});
        return res.json(flat)
       
    }
    async delete(req,res){
        const { id } = req.params;
        try {
            const deleted = await Flat.destroy({ where: { id } });
            if (!deleted) {
                return res.status(404).json({ error: 'Flat not found' });
            }
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}


module.exports = new FlatController()