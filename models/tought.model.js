const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = require('./user.model')

const Tought = db.define('Tought', {
    title:{
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
})

// relacionamentos do db
Tought.belongsTo(User)
User.hasMany(Tought)

module.exports = Tought