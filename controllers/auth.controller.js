const User = require('../models/user.model')
const bcrypt = require('bcryptjs')

module.exports = class AuthController {
    static login(req, res) {
        res.render(`auth/login`)
    }

    static async loginPost(req, res) {

        const { email, password } = req.body

        //achar user
        const user = await User.findOne({ where: { email: email } })

        if (!user) {
            req.flash('message', 'Usuário não existe.')
            res.render('auth/login')

            return
        }

        //checando senha
        const passwordMatch = bcrypt.compareSync(password, user.password)

        if (!passwordMatch) {
            req.flash('message', 'Senha incorreta.')
            res.render('auth/login')

            return
        }

        req.session.userid = user.id

        req.flash('message', 'Autenticação realizada com sucesso')

        req.session.save(() => {
            res.redirect('/')
        })
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

            req.flash('message', 'Cadastro realizado com sucesso')

            req.session.save(() => {
                res.redirect('/')
            })

        } catch (error) {
            console.log(error)
        }

    }

    static logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }
}