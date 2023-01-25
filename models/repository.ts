import { DataTypes, Sequelize } from 'sequelize';
import db from '../db/connection';
import Trybe from './tribe';

const Repository = db.define('repository', {
  id_repository: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.CHAR(1),
    defaultValue: 'E',
    allowNull: false,
  },
  create_time: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  status: {
    type: DataTypes.CHAR(1),
    defaultValue: 'A',
    allowNull: false,
  },
},
{
  timestamps: false,
}
);

Trybe.hasMany(Repository, { foreignKey: 'id_tribe', sourceKey: 'id_tribe' });
Repository.belongsTo(Trybe, { foreignKey: 'id_tribe', targetKey: 'id_tribe' });


export default Repository;
