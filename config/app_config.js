/**
 * Handle config for application server api
 */
require('dotenv').config({path:__dirname+'/../.env'});

const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    database: process.env.DB_NAME
}

module.exports = {
    dbConfig
}
