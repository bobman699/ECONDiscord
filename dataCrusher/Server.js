const { Sequelize } = require("sequelize");
const connectionString = process.env.DATABASE_URL;
const SQL = new Sequelize(connectionString, {logging: false, dialectOptions: {
        ssl: {
            require: true
        }
    }});
module.exports = SQL;
