"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const organization_1 = __importDefault(require("./organization"));
const Trybe = connection_1.default.define('trybe', {
    id_tribe: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
    },
}, {
    timestamps: false,
});
organization_1.default.hasMany(Trybe, {
    foreignKey: 'id_organizacion',
    sourceKey: 'id_organizacion',
});
Trybe.belongsTo(organization_1.default, {
    foreignKey: 'id_organizacion',
    targetKey: 'id_organizacion',
});
exports.default = Trybe;
//# sourceMappingURL=tribe.js.map