const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()

const conn = require('./db/conn')

// models
const Tought = require('./models/tought.model')
const User = require('./models/user.model')

// import routes
const toughtsRoutes = require('./routes/toughtsRoutes')

// import controller
const ToughtsController = require('./controllers/ToughtsController')

//template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//receber resposta do body
app.use(
    express.urlencoded({
        extended: true
    })
)
//app.use(express.json) nao sei pq mas se eu descomento isso aq fica dando loading infinito

//session middleware
app.use(
    session({
        name: "session",
        secret: "nosso_secret",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {},
            path: require('path').join(require('os').tmpdir(), 'sessions')
        }),
        cookie: {
            secure: false,
            maxAge: 86400000,
            expires: new Date(Date.now() + 86400000),
            httpOnly: true
        }
    }),
)

// flash messages
app.use(flash())

// public path
app.use(express.static('public'))

// set session to res
app.use((req, res, next) =>{
    if(req.session.userid){
        res.locals.session = req.session
    }

    next()
})

//routes
app.use('/toughts', toughtsRoutes)

app.get('/', ToughtsController.showToughts)

conn
    .sync()
    .then(() => {
        app.listen(3000)
    })
    .catch((err) => console.log(err))