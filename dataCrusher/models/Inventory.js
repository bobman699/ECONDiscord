const { DataTypes} = require("sequelize");
const DB = require("../Server.js");

const Inventory = DB.define("Inventory", {
    IDENT: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    item: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "Items",
            key: "IDENT"
        },
    },
    owner: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
          model: "GuildMembers",
          key: "IDENT"
      }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    value: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false
    },
    sellRecord: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "SellRecords",
            key: "IDENT"
        }
    }
},
    {
        freezeTableName: true
    })
module.exports = Inventory;