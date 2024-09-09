const { DataTypes} = require("sequelize");
const DB = require("../Server.js");

const Shift = DB.define("Shift", {
    IDENT: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    start: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end: {
        type: DataTypes.DATE,
        allowNull: false
    },
    entityIDENT: {
        type: DataTypes.UUID,
        allowNull: false
    },
    entityType: {
        type: DataTypes.ENUM("business", "department"),
        allowNull: false
    },
    user: {
        type: DataTypes.UUID,
        allowNuLL: false,
        references: {
            model: "GuildMembers",
            key: "IDENT"
        }
    }
}, {
    freezeTableName: true
})
module.exports = Shift

Shift.belongsTo(DB.models.Guilds, {foreignKey: {name: 'GuildIDENT'}});
Shift.belongsTo(DB.models.GuildMembers, {foreignKey: {name: 'user'}});



DB.models.GuildMembers.hasMany(Shift, {foreignKey: {name: 'user'}})
DB.models.Guilds.hasMany(Shift, {foreignKey: {name: 'GuildIDENT'}});
