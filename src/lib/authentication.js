'use strict'

const { use } = require('passport')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const pool = require('./db.js')
const { encriptPass, matchPass } = require('./helps.js')

const RegStrategy = new LocalStrategy({
    usernameField: 'username',
    passwordField: 'pass',
    passReqToCallback: true
}, regVerify)
const SigStrategy = new LocalStrategy({
    usernameField: 'username',
    passwordField: 'pass',
    passReqToCallback: true
}, sigVerify)

async function regVerify(req, username, password, done) {

    const { full_name, email } = req.body
    const user = {
        username,
        full_name,
        email,
        pass: await encriptPass(password)
    }
    try{
        const result = await pool.query('INSERT INTO user SET ?', [user])
        user.id = result.insertId
        return done(null ,user,req.flash('good','User successfully registered'))
    }catch(e){
        return done(false,false,req.flash('not_good',`An error occurred: ${e.code}` ))
    }

    //TODO: Handle sql error codes
    /*
    {
  code: 'ER_DUP_ENTRY',
  errno: 1062,
  sqlMessage: "Duplicate entry 'bigbbadbear' for key 'user.username_UNIQUE'",
  sqlState: '23000',
  index: 0,
  sql: "INSERT INTO user SET `username` = 'bigbbadbear', `full_name` = 'e', `email` = 'drosay@unicartagena.edu.co', `pass` = '$2a$10$WEWflpNJt3Tx0xCkj4H6JOle023WJquXdksP.J7EF.YeglDjXqM8y'"
}
    */ 
}

async function sigVerify(req, username, password, done) {
    const result = await pool.query(`SELECT * FROM user WHERE username=${username}`)
    if (result[0]) {
        const user = result[0]
        const match = await matchPass(password, user.pass)
        if (!match) {
            done(null, false, req.flash('not_good', 'Error: Incorrect user or password'))
            return
        }
        else return done(null, user)
    }
    return done(null, false, req.flash('not_good', 'Error: username does not exist'))
}

passport.use('register', RegStrategy)
passport.use('signin', SigStrategy)

passport.serializeUser((user, done) => {
    return done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const user = await pool.query(`SELECT * FROM user WHERE id=${id}`)
    return done(null, user[0])
})