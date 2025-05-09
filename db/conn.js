const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize('thinkharderdb', 'root', process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
})

try {
    sequelize.authenticate()
    console.log('DB conectado')
} catch (error) {
    console.log('Não foi possivel conectar', error)
}

module.exports = sequelize