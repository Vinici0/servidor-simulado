"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const tribe_1 = __importDefault(require("./tribe"));
const Repository = connection_1.default.define('repository', {
    id_repository: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: sequelize_1.DataTypes.CHAR(1),
        defaultValue: 'E',
        allowNull: false,
    },
    create_time: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    status: {
        type: sequelize_1.DataTypes.CHAR(1),
        defaultValue: 'A',
        allowNull: false,
    },
}, {
    timestamps: false,
});
tribe_1.default.hasMany(Repository, { foreignKey: 'id_tribe', sourceKey: 'id_tribe' });
Repository.belongsTo(tribe_1.default, { foreignKey: 'id_tribe', targetKey: 'id_tribe' });
exports.default = Repository;
//# sourceMappingURL=repository.js.map