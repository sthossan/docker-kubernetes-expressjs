const appConfig = require('../config/app_config')
const dbConfig = appConfig.dbConfig

const { Sequelize } = require('sequelize');

module.exports = {
    checkDbConnectivitty:async function() {
        try {
            const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.pass, {
                dialect: 'mssql', /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
                host: dbConfig.host,
                port: dbConfig.port,
                logging: false,
                dialectOptions: {
                    requestTimeout: 60,
                    encrypt: true
                }
            });

            await sequelize.authenticate();
            sequelize.close();
            return 'Connection has been established successfully.';
        } catch (error) {
            return'Unable to connect to the database:', error;
        }
    }

};