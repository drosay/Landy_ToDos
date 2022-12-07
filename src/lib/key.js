'use strict'

module.exports = {
    database: {
        host: process.env.DB_HOST || "containers-us-west-151.railway.app",
        database: process.env.DB_NAME || "railway",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "I7yhrlpymRT4KT03nkdC",
        port: process.env.DB_PORT || 5487,
        insecureAuth: true
    }
}