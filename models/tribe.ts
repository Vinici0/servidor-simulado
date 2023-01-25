import { DataTypes, Sequelize } from 'sequelize';
import db from '../db/connection';
import Organizacion from './organization';

const Trybe = db.define(
  'trybe',
  {
    id_tribe: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Organizacion.hasMany(Trybe, {
  foreignKey: 'id_organizacion',
  sourceKey: 'id_organizacion',
});
Trybe.belongsTo(Organizacion, {
  foreignKey: 'id_organizacion',
  targetKey: 'id_organizacion',
});

export default Trybe;
