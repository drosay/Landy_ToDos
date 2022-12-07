'use strict'

module.exports = {
    database: {
        host: process.env.DB_HOST || "localhost",
        database: process.env.DB_NAME || "tasks",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "12345",
        port: process.env.DB_PORT || 3306
    }
}