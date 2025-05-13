const { config } = require('dotenv');
const Sequelize=require('sequelize');

const DB_NAME=process.env.DB_NAME;
const DB_USERNAME=process.env.DB_USERNAME
const DB_PASSWORD=process.env.DB_PASSWORD
const HOST=process.env.HOST
const sequelize= new Sequelize(DB_NAME,DB_USERNAME,DB_PASSWORD,{
    dialect:'mysql',
    host:HOST
})

module.exports=sequelize;