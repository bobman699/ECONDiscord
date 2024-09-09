const { DataTypes} = require("sequelize");
const DB = require("../Server.js");

module.exports = DB.define("MoneyPrints", {
    IDENT: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    guild: {
        type: DataTypes.TEXT,
        allowNull: false,
        references: {
            model: "Guilds",
            key: "IDENT"
        }
    },
    amount: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false
    },
    authorizer: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "GuildMembers",
            key: "IDENT"
        }
    },
    newBalance: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false
    },
    memo: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    freezeTableName: true
})