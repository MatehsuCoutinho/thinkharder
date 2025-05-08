const User = require('../models/user.model')
const bcrypt = require('bcryptjs')

module.exports = class AuthController {
    static login(req, res) {
        res.render(`auth/login`)
    }

    static register(req, res) {
        res.render(`auth/register`)
    }

    static async registerPost(req, res) {
        const { name, email, password, confirmpassword } = req.body

        // validando senhas iguais
        if (password != confirmpassword) {
            req.flash('message', 'As senhas não conferem, tente novamente!')
            res.render('auth/register')

            return
        }

        //vendo se o usuario ja existe
        const checkIfUserExists = await User.findOne({ where: { email: email } })

        if (checkIfUserExists) {
            req.flash('message', 'O email já está em uso!')
            res.render('auth/register')

            return
        }

        //criando senha
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name,
            email,
            password: hashedPassword
        }

        try {
            const createdUser = await User.create(user)

            req.session.userid = createdUser.id
            req.session.save(() => {
                res.redirect('/')
            })

            req.flash('message', 'Cadastro realizado com sucesso')

            res.redirect('/')

        } catch (error) {
            console.log(error)
        }

    }

    static logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }
}