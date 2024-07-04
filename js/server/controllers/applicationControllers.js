const {Application} = require('../models/models')
const ApiError = require('../error/ApiError');
const { application } = require('express');



class ApplicationController{
    async create(req,res,next){
        try{
       const{status,userId,flatId} = req.body
       const application = await Application.create({status, userId, flatId})
       return res.json(application)
        }catch (e){
            next(ApiError.badRequest(e.message))
        }


    }
    async getALL(req,res,next){ 
        try {
        const applications = await Application.findAll(); // Пример запроса всех записей из базы данных
        return res.json(applications);
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }

    }
    async getOne(req,res,next){
        const { userId } = req.params; // Получаем userId из параметров запроса
        try {
            // Находим все заявки для указанного пользователя
            const applications = await Application.findAll({ where: { userId } });
            return res.json(applications); // Возвращаем найденные заявки в формате JSON
        } catch (error) {
            next(ApiError.badRequest(e.message)); // Передаем ошибку обработчику ошибок
        }
    
    }
    async update(req,res){
        const { id } = req.params;
        const { status } = req.body;
        const updatedApplication = await Application.update(
            { status },
            { where: { id }, returning: true }
        );

        if (updatedApplication[0] === 0) {
            return res.status(404).json({ message: 'Application not found' });
        }

        return res.json(updatedApplication[1][0]);
        
    }
    async delete(req,res,next){
        try {
            const { id } = req.params;
            const application = await Application.findByPk(id);
            if (!application) {
                return res.status(404).json({ message: 'Application not found' });
            }
            await application.destroy(); // Удаляем обратную связь
        return res.json({ message: 'Application deleted successfully' });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}


module.exports = new ApplicationController()