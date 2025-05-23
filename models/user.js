const Sequelize=require('sequelize');
const sequelize=require('../utils/database');


const User= sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    username:{
        type:Sequelize.STRING,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    role:{
        type:Sequelize.STRING,
        allowNull:false,
    }
});

module.exports=User;