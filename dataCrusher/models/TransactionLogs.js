const { DataTypes} = require("sequelize");
const DB = require("../Server.js");
module.exports = DB.define("TransactionLogs", {
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
    creditAccount: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "Accounts",
            key: "IDENT"
        }
    },
    debitAccount: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "Accounts",
            key: "IDENT"
        }
    },
    memo: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    freezeTableName: true
});