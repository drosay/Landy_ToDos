'use strict'

const mysql = require('mysql2')
const {host,database,user,password,port} = require('./key')
const {promisify} = require('util')
//database error codes
const {lost,count,refuse} = {
    lost: 'PROTOCOL_CONNECTION_LOST',
    count: 'ER_CON_COUNT_ERROR',
    refuse: 'ECONNREFUSED'
}

const pool = mysql.createPool(`mysql://root:I7yhrlpymRT4KT03nkdC@containers-us-west-151.railway.app:5487/railway`)

pool.getConnection((error,connection)=>{
    if(error)
        switch(error.code){
            case lost: //TODO
                //process.stdout.write('DATABASE CONNECTION WAS LOST')
                break
            case count: //TODO
                //process.stdout.write('DATABASE CONNECTIONS IS FULL')
                break
            case refuse: //TODO
                //process.stdout.write('DATABASE CONNECTION WAS REFUSED')
                break
        }
    else if(connection){
        connection.release()
        //process.stdout.write('\nDATABASE IS CONNECTED')
    }
})

pool.query = promisify(pool.query) //pool callbacks to promises

module.exports = pool