"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const repository_1 = __importDefault(require("./repository"));
const Metrics = connection_1.default.define('metrics', {
    id_repository: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    coverge: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
    bugs: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    vulnerabilities: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    hostpost: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    code_smells: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
});
repository_1.default.hasOne(Metrics, {
    foreignKey: 'id_repository',
    sourceKey: 'id_repository',
});
Metrics.belongsTo(repository_1.default, {
    foreignKey: 'id_repository',
    targetKey: 'id_repository',
});
exports.default = Metrics;
//# sourceMappingURL=matrics.js.map