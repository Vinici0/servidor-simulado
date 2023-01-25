import { DataTypes, Sequelize } from 'sequelize';
import db from '../db/connection';

const Organizacion = db.define(
  'organizacion',
  {
    id_organizacion: {
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

export default Organizacion;
