'use strict'

const Router = require('express').Router()
const pool = require('../lib/db.js')
const {isLogged} = require('../lib/helps.js')

// add task
Router.post('/add', isLogged, async (req, res)=>{
    const {title, description } = req.body
    const {id:user_id} = req.user
    const task = {
        user_id,
        title,
        description
    }
    await pool.query('INSERT INTO task SET ?', [task])
    req.flash('good','Task has been inserted')
    res.redirect("/")
})

//updated task
Router.post('/up/:id&:user_id', isLogged, async (req, res)=>{
    const {id, user_id} = req.params
    const data = {...req.body}
    await pool.query(`
    UPDATE task
    SET ?
    WHERE id=${id} AND user_id=${user_id}
    `, [data])
    req.flash('good','Task has been updated :)')
    res.redirect('/')
})

//delete task
Router.get('/del/:id&:user_id', isLogged, async (req, res)=>{
    const {id, user_id} = req.params
    await pool.query(`
    DELETE
    FROM task
    WHERE id=${id} AND user_id=${user_id}
    `)
    req.flash('not_good','Task has been deleted :\'(')
    res.redirect('/')
})

//finish task
Router.get('/finish/:id&:user_id', isLogged, async (req, res)=>{
    const {id, user_id} = req.params
    await pool.query(`
    UPDATE task
    SET end_date = CURRENT_TIMESTAMP
    WHERE id=${id} AND user_id=${user_id}
    `)
    req.flash('good','Task has been finished :D')
    res.redirect('/')
})

//edit task
Router.get('/up/:id&:user_id', isLogged, async (req, res)=>{
    const {id, user_id} = req.params
    const task = await pool.query(`
    SELECT id, user_id, title, description
    FROM task
    WHERE id=${id} AND user_id=${user_id}
    `)
    res.render('tasks/task_edit', {task:task[0]})
})

module.exports = Router