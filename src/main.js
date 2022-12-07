'use strict'

// inits
const express = require('express')
const {engine} = require('express-handlebars')
const path = require('path')
const morgan = require('morgan')
const session = require('express-session')
const mysql_session = require('express-mysql-session')
const passport = require('passport')
const flash = require('connect-flash')
const {database} = require('./lib/key.js')
const helpers = require('./lib/helpers.js')
const routes = require('./routes/index.js')
const auth = require('./routes/auth.js')
const tasks = require('./routes/tasks.js')

// constants
const PORT = 5500

// inits
const app = express()
require('./lib/authentication.js')


// settings
app.set('views',path.join(__dirname, 'views')) //if i change set name views to view throws "View is not a function" error
app.set('port', process.env.PORT || PORT)
app.engine('hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs',
    helpers
}))
app.set('view engine','hbs')

// middlewares
app.use(session({
    secret: 'bigbbadbear',
    resave: false,
    saveUninitialized: false,
    store: new mysql_session(database)
}))
app.use(flash())
app.use(morgan('dev')) // Show server console messages
app.use(express.urlencoded({extended:false})) // Accept only basic text formats
// app.use(express.json)
app.use(passport.initialize())
app.use(passport.session())

// global
app.use((req,res,next)=>{
    app.locals.good = req.flash('good')
    app.locals.not_good = req.flash('not_good')
    app.locals.user = req.user
    next()
})

// routes
app.use(routes)
app.use('/tasks',tasks)
app.use(auth)

// public
app.use(express.static(path.join(__dirname,'public')))

// server
app.listen(app.get('port'), ()=>{
    //process.stdout.write(`Servidor en puerto ${app.get('port')}`)
})
