'use strict'

module.exports = {
    database: {
        host: process.env.DB_HOST || "us-east.connect.psdb.cloud",
        database: process.env.DB_NAME || "landy_todos",
        user: process.env.DB_USER || "2cgu65xnje0dguhyks63",
        password: process.env.DB_PASSWORD || "pscale_pw_tM7mIyuh5GHZbuInfMjckGjUSQMDgNtrKzteUDm3aBA",
        ssl:{
            rejectUnauthorized:false
        }
    }
}