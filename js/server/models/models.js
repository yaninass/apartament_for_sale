const { application } = require('express')
const sequelize =require('../db')
const{DataTypes} =require('sequelize')

const User =sequelize.define( 'user',{
    id:{type: DataTypes.INTEGER, primaryKey:true,autoIncrement:true},
    email:{type:DataTypes.STRING,unique:true,},
    password:{type:DataTypes.STRING,},
    famname:{type:DataTypes.STRING,},
    number:{type:DataTypes.STRING,unique:true,},
    role:{type:DataTypes.STRING,defaultValue:"USER"},
})


const Feedback =sequelize.define( 'feedback',{
    id:{type: DataTypes.INTEGER, primaryKey:true,autoIncrement:true},
    feedback:{type:DataTypes.TEXT,allowNull:false,},
   
}, {
    tableName: 'feedbacks' // Указываем название таблицы в базе данных
})

const Application =sequelize.define( 'application',{
    id:{type: DataTypes.INTEGER, primaryKey:true,autoIncrement:true},
    status:{type:DataTypes.STRING,allowNull:false},
   
})

const Flat =sequelize.define( 'flat',{
    id:{type: DataTypes.INTEGER, primaryKey:true,autoIncrement:true},
    street:{type:DataTypes.STRING,allowNull:false},
    number_house:{type:DataTypes.INTEGER,allowNull:false},
    floor:{type:DataTypes.INTEGER,allowNull:false},
    rooms:{type:DataTypes.INTEGER,allowNull:false},
    qr_meters:{type:DataTypes.FLOAT,allowNull:false},
    price:{type:DataTypes.INTEGER,allowNull:false},
    img:{type:DataTypes.STRING,allowNull:false},
   
}, {
    tableName: 'flats' // Указываем название таблицы в базе данных
})
const District =sequelize.define( 'district',{
    id:{type: DataTypes.INTEGER, primaryKey:true,autoIncrement:true},
    district_name:{type:DataTypes.STRING,allowNull:false},
   
})
const FlatSale=sequelize.define('flatsale',{
    id:{type: DataTypes.INTEGER, primaryKey:true,autoIncrement:true},
    adres:{type:DataTypes.STRING,allowNull:false},
    number_house:{type:DataTypes.INTEGER,allowNull:false},
    rooms:{type:DataTypes.INTEGER,allowNull:false},
    name:{type:DataTypes.STRING,allowNull:false},
    email:{type:DataTypes.STRING},
    number:{type:DataTypes.STRING,}
})
User.hasMany(Feedback, { onDelete: 'CASCADE' })
Feedback.belongsTo(User)

User.hasMany(Application, { onDelete: 'CASCADE' })
Application.belongsTo(User)

Flat.hasMany(Application, { onDelete: 'CASCADE' })
Application.belongsTo(Flat)

District.hasMany(Flat, { onDelete: 'CASCADE' })
Flat.belongsTo(District)

module.exports={
    User,Feedback,Application,Flat,District,FlatSale
}