const {FlatSale} = require('../models/models')
const ApiError = require('../error/ApiError');



class FlatSaleController{
    async create(req,res,next){
        try{
       const{adres,number_house,rooms,email,name,number} = req.body
       const flatsale = await FlatSale.create({adres,number_house,rooms,email,name,number})
       return res.json(flatsale)
        }catch (e){
            next(ApiError.badRequest(e.message))
        }
 

    }
    async getALL(req,res,next){ 
        try {
        const flatsales = await FlatSale.findAll(); 
        return res.json(flatsales);
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }

    }
    async delete(req,res){
        const { id } = req.params; // Получаем идентификатор обратной связи из параметров запроса
    try {
        const flatsale = await FlatSale.findByPk(id); // Находим обратную связь по идентификатору
        if (!flatsale) {
            // Если обратная связь не найдена, возвращаем ошибку
            throw new ApiError(404, 'Flatsale not found');
        }
        await flatsale.destroy(); // Удаляем обратную связь
        return res.json({ message: 'Flatsale deleted successfully' });
    } catch (error) {
        // Если произошла ошибка, возвращаем её клиенту
        return next(error);
    }
        }
}



module.exports = new FlatSaleController()