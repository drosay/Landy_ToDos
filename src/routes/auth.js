'use strict'

const Router = require('express').Router()
const passport = require('passport')
const {notLogged, isLogged} = require('../lib/helps.js')
//register a new user
Router.post('/reg', notLogged,
passport.authenticate('register',{
        successRedirect:'/',
        successFlash: true,
        failureRedirect: '/register',
        failureFlash: true
}))

//signin user route
Router.post('/sig', notLogged, (req, res, next)=>{
    passport.authenticate('signin',{
        successRedirect: '/',
        successFlash:true,
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next)
})

Router.post('/logout', isLogged, (req, res)=>{
    req.logOut(err=>{
        if(err){
            req.flash('not_good','Error: something wrong happens, try again')
        }
            res.redirect('/')
    })
})
//register form
Router.get('/register', notLogged, (req, res)=>{
    res.render('auth/reg')
})

//signin form
Router.get('/signin', notLogged, (req, res)=>{
    res.render('auth/sign')
})

Router.get('/logout', (req, res)=>{ //prevents malicious logout
    req.flash('not_good','What are you doin? . . .')
    res.redirect('/')
})

module.exports = Router