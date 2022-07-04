//usuario.js
const Sequelize = require('sequelize');
const database = require('./bdorm');

const Usuario = database.sequelize.define('usuario', {
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
    senha: {
        type: Sequelize.STRING
    }
})

module.exports = {Usuario}
