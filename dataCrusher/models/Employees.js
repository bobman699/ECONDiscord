const { DataTypes} = require("sequelize");
const DB = require("../Server.js");

module.exports = DB.define("Employees", {
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
    business: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "Accounts",
            key: "IDENT"
        }
    },
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "GuildMembers",
            key: "IDENT"
        }
    },
    level: {
        type: DataTypes.ENUM("pos", "manager", "supervisor", "lead", "view-only", "admin"),
        allowNull: false,
    },
    deletedAt: {
        type: 'TIMESTAMP',
        allowNull: true,
        defaultValue: null
    }
}, {
    paranoid: true
})