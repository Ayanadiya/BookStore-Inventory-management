const Sequelize=require('sequelize');
const sequelize=require('../utils/database');

const Book= sequelize.define('book',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type:Sequelize.STRING,
        allowNull:false
    },
    author:{
        type:Sequelize.STRING,
        allowNull:false
    },
    isbn:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    price:{
        type:Sequelize.FLOAT,
        allowNull:false
    },
    stock:{
        type:Sequelize.INTEGER,
        allowNull:false,
    }
})

module.exports=Book;