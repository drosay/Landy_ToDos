'use strict'

const bcrypt = require('bcryptjs')

const helps = {}

helps.encriptPass = async pass => await bcrypt.hash(pass, await bcrypt.genSalt(10))

helps.matchPass = async (pass, dbPass)=>{
    try{
       return await bcrypt.compare(pass,dbPass)
    }catch(e){ //TODO
        //console.log(e)
        return null
    }
    
}

helps.isLogged = (req, res, next) => req.isAuthenticated() ? next() : res.redirect('/signin')

helps.notLogged = (req, res, next) => req.isAuthenticated() ? res.redirect('/') : next()

module.exports = helps