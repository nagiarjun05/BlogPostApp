const Sequelize=require('sequelize');

const sequelize=new Sequelize('blogpost','root','simran',{
    dialect:'mysql', 
    host:'localhost'
});

module.exports=sequelize;