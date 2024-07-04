const {Feedback} = require('../models/models')
const ApiError = require('../error/ApiError');


class FeedbackController{
    async create(req,res){
        const {feedback,userId} = req.body
        const feedBack = await Feedback.create({feedback,userId})
        return res.json(feedBack)

    }
    async getALL(req,res){
        const feedbacks = await Feedback.findAll()
        return res.json(feedbacks)
    }
    async delete(req,res){
        const { id } = req.params; // Получаем идентификатор обратной связи из параметров запроса
    try {
        const feedback = await Feedback.findByPk(id); // Находим обратную связь по идентификатору
        if (!feedback) {
            // Если обратная связь не найдена, возвращаем ошибку
            throw new ApiError(404, 'Feedback not found');
        }
        await feedback.destroy(); // Удаляем обратную связь
        return res.json({ message: 'Feedback deleted successfully' });
    } catch (error) {
        // Если произошла ошибка, возвращаем её клиенту
        return next(error);
    }
        }
    }



module.exports = new FeedbackController()