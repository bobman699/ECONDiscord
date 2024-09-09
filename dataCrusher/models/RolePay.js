const { DataTypes} = require("sequelize");
const DB = require("../Server.js");

const RolePay = DB.define("RolePay", {
    IDENT: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    id: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    entityIDENT: {
        type: DataTypes.UUID,
        allowNull: false
    },
    entityType: {
        type: DataTypes.ENUM("business", "department"),
        allowNull: false
    },
    additionalPay: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
        defaultValue: 0
    }
})
module.exports = RolePay;
RolePay.belongsTo(DB.models.Guilds, {foreignKey: 'GuildIDENT'});
DB.models.Guilds.hasMany(RolePay);

