const { DataTypes} = require("sequelize");
const DB = require("../Server.js");

const Citation = DB.define("Citation", {
    IDENT: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    amount: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false
    },
    cadRecordID: {
        type: DataTypes.STRING,
        allowNull: false
    },
    character: {
        type: DataTypes.STRING,
        allowNull: false
    },
    issuer: {
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

    
    Citation.belongsTo(DB.models.Guilds, {foreignKey: {name: 'guild'}});
    Citation.belongsTo(DB.models.GuildMembers, {foreignKey: {name: 'violator'}});
    Citation.belongsTo(DB.models.Department, {foreignKey: {name: 'department'}});

    DB.models.Department.hasMany(Citation, {foreignKey: {name: 'department'}})
    DB.models.GuildMembers.hasMany(Citation, {foreignKey: {name: 'violator'}})
    DB.models.Guilds.hasMany(Citation, {foreignKey: {name: 'guild'}});
    module.exports = Citation