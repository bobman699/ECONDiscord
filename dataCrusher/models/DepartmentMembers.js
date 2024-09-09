const { DataTypes} = require("sequelize");
const DB = require("../Server.js");

const DepartmentMembers = DB.define("DepartmentMembers", {
    IDENT: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    permissions: {
        type: DataTypes.ARRAY(DataTypes.ENUM('Department-Head', 'Member', 'Department-Management', 'Payroll-Management', 'Shift-Management', 'Finance-Management', 'Citation-Management','Vehicle-Management', 'Inventory-Management', 'Submit-ShiftLogs', 'Submit-Citations', 'Submit-Incidents')),
        allowNull: true
    },
    rank: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: 'null'
    }

})
module.exports = DepartmentMembers;
DepartmentMembers.belongsTo(DB.models.Guilds, {foreignKey: 'GuildIDENT'});
DB.models.Guilds.hasMany(DepartmentMembers);
DepartmentMembers.belongsTo(DB.models.Department, {foreignKey: 'DepartmentIDENT'});
DB.models.Department.hasMany(DepartmentMembers);
DB.models.GuildMembers.hasMany(DepartmentMembers);
DepartmentMembers.belongsTo(DB.models.GuildMembers, {foreignKey: 'MemberIDENT'});