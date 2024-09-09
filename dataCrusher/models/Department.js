const { DataTypes} = require("sequelize");
const DB = require("../Server.js");

const Department = DB.define("Department", {
    IDENT: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: 'No Description provided.'
    },
    balance: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: true,
        defaultValue: 0
    },
    headRole : {
        type: DataTypes.TEXT,
        allowNull: false
    },
    memberRole: {
        type: DataTypes.TEXT,
        allowNull:false
    },
    budgetTimestamp: {
        type: DataTypes.DATE,
        allowNull: true
    },
    budget: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
        defaultValue: 0
    },
    maxBalance: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: true,
        defaultValue: null,
    },
    basePay: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
        defaultValue: 0
    },
    generalLogChannel: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    activityLogChannel: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    deletedAt: {
        type:'TIMESTAMP',
        allowNull: true,
        defaultValue: null
    }

}, {
    paranoid: true,
})
module.exports = Department;
Department.belongsTo(DB.models.Guilds, {foreignKey: 'GuildIDENT'});
DB.models.Guilds.hasMany(Department);