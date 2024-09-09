const { DataTypes} = require("sequelize");
const DB = require("../Server.js");

const DepartmentRoles = DB.define("DepartmentRoles", {
    IDENT: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    permissions: {
        type: DataTypes.ARRAY(DataTypes.ENUM('Department-Head', 'Member', 'Department-Management', 'Payroll-Management', 'Shift-Management', 'Finance-Management', 'Citation-Management','Vehicle-Management', 'Inventory-Management', 'Submit-ShiftLogs', 'Submit-Citations', 'Submit-Incidents')),
        allowNull: false,
        defaultValue: ['Member']
    },
    id: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
})
module.exports = DepartmentRoles;
DepartmentRoles.belongsTo(DB.models.Guilds, {foreignKey: 'GuildIDENT'});
DB.models.Guilds.hasMany(DepartmentRoles);
DepartmentRoles.belongsTo(DB.models.Department, {foreignKey: 'DepartmentIDENT'});
DB.models.Department.hasMany(DepartmentRoles);
