const Sequelize = require('sequelize');
const database = require('./dborm.js');

const Produto = database.sequelize.define('produto',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false, 
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    preco:{
        type:Sequelize.FLOAT,
        allowNull:false
    }
});

module.exports = {Produto}