const { DataTypes} = require("sequelize");
const DB = require("../Server.js");
//interaction, transaction, quantity, amount, business, employee
module.exports = DB.define("SellRecords", {
    IDENT: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    transaction: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "TransactionLogs",
            key: "IDENT"
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false
    },
    business: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "Accounts",
            key: "IDENT"
        }
    },
    employee: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "GuildMembers",
            key: "IDENT"
        }
    }
}, {
    freezeTableName: true
});