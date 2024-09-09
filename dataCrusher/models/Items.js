const { DataTypes} = require("sequelize");
const DB = require("../Server.js");

module.exports = DB.define("Items", {
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
    createdBy: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "GuildMembers",
            key: "IDENT"
        }
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ownMultiple: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false
    },
    quickAccess:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: null
    },
    deletedAt: {
        type: 'TIMESTAMP',
        allowNull: true,
        defaultValue: null
    }
}, {
    paranoid: true
    })