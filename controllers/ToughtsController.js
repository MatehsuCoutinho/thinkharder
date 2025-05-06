const Tought = require('../models/tought.model')
const User = require('../models/user.model')

module.exports = class ToughtsController{
    static async showToughts(req, res){
        res.render('toughts/home')
    }
}