const Tought = require('../models/tought.model')
const User = require('../models/user.model')

module.exports = class ToughtsController{
    static async showToughts(req, res){
        res.render('toughts/home')
    }

    static async dashboard(req, res){
        res.render('toughts/dashboard')
    }
}