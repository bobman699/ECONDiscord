const { DataTypes} = require("sequelize");
const DB = require("../Server.js");
module.exports = DB.define("AdvTransactionLogs", {
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
        type: DataTypes.TEXT,
        allowNull: false
    },
    debitAccount: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    memo: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    creditType: {
        type: DataTypes.ENUM("Account", "Department", "Treasury"),
        allowNull: false
    },
    debitType: {
        type: DataTypes.ENUM("Account", "Department", "Treasury"),
        allowNull: false
    }
}, {
    freezeTableName: true
});