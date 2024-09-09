const {Sequelize, DataTypes} = require("sequelize");
const DB = require("../Server.js");

module.exports = DB.define("DiscordUsers", {
    IDENT: {
        type: DataTypes.TEXT,
        primaryKey: true,
        allowNull: false,
    }
}, {
    freezeTableName: true
});