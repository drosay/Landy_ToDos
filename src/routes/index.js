'use strict'

const Router = require('express').Router()
const pool = require('../lib/db.js')
const {isLogged} = require('../lib/helps.js')

Router.get('/', isLogged, async (req, res)=>{
        const {id} = req.user
        const data = await pool.query('SELECT * FROM task where user_id = ?',[id])
        res.render("tasks/task", {data})
})

// NAVIGATION LINKS

Router.get('/user', isLogged, (req, res)=>{
    res.render("layouts/user")
})

Router.get('/groups', isLogged, (req, res)=>{
    res.render("layouts/groups")
})

Router.get('/contacto', isLogged, (req, res)=>{
    res.send('Sección de contacto')
})

module.exports = Router
