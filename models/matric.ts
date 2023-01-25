import { DataTypes, Sequelize } from 'sequelize';
import db from '../db/connection';
import Repository from './repository';

const Metrics = db.define(
  'metrics',
  {
    id_repository: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    coverge: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    bugs: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    vulnerabilities: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hostpost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    code_smells: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Repository.hasOne(Metrics, {
  foreignKey: 'id_repository',
  sourceKey: 'id_repository',
});
Metrics.belongsTo(Repository, {
  foreignKey: 'id_repository',
  targetKey: 'id_repository',
});

export default Metrics;
