const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
const {User, Application, Feedback}=require('../models/models')

const generatejwt = (id,email,role) =>{
   return jwt.sign(
        {id,email,role},
         process.env.SECRET_KEY,
         {expiresIn: '24h'}
         )

}
class UserController{
    async registration(req,res,next){
    const {email,password,number,famname,role} =req.body
        if (!email || !password || !number){
            return next(ApiError.badRequest("Некорректный email или параль или номер"))
        }
        const candidate = await User.findOne({where:{email}})
        if (candidate){
            return next(ApiError.badRequest("Пользователь с таким email уже существует"))
        }
        const hashPassword = await bcrypt.hash(password,5)
        const user = await User.create({email, number,famname, role, password:hashPassword})
        const token =  generatejwt( user.id, user.email,user.famname,user.number, user.role)
        return res.json({token})

    }
    async login(req,res,next){
        const {email,password}=req.body
        const user = await User.findOne({where:{email} })
        if(!user){
            return next(ApiError.internal("Пользователь не найден"))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.internal("Неверный пароль"))
        }
        const token = generatejwt(user.id,user.email,user.role)
        return res.json({token})
    }
    async check(req,res,next){
      const token = generatejwt(req.user.id,req.user.email,req.user.role)
      return res.json({token})
    }
    async getAllUsers(req, res, next) {
        try {
            const users = await User.findAll();
            return res.json(users);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async deleteUser(req, res, next) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) {
                return next(ApiError.notFound("Пользователь не найден"));
            }
            await user.destroy();
            return res.json({ message: 'Пользователь успешно удален' });
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async changeUserRole(req, res, next) {
        try {
            const { id } = req.params;
            const { role } = req.body;
            const user = await User.findByPk(id);
            if (!user) {
                return next(ApiError.notFound("Пользователь не найден"));
            }
            user.role = role;
            await user.save();
            return res.json({ message: 'Роль пользователя успешно изменена' });
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
}


module.exports = new UserController()