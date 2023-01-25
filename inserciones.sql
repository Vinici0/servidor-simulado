-- import { DataTypes, Sequelize } from 'sequelize';
-- import db from '../db/connection';

-- const Organizacion = db.define(
--   'organizacion',
--   {
--     id_organizacion: {
--       type: DataTypes.INTEGER,
--       primaryKey: true,
--       autoIncrement: true,
--     },
--     name: {
--       type: DataTypes.STRING,
--       allowNull: false,
--     },
--     status: {
--       type: DataTypes.INTEGER,
--       defaultValue: 1,
--       allowNull: false,
--     },
--   },
--   {
--     timestamps: false,
--   }
-- );

-- export default Organizacion;



-- import { DataTypes, Sequelize } from 'sequelize';
-- import db from '../db/connection';
-- import Organizacion from './organization';

-- const Trybe = db.define(
--   'tribe',
--   {
--     id_tribe: {
--       type: DataTypes.INTEGER,
--       primaryKey: true,
--       autoIncrement: true,
--     },
--     name: {
--       type: DataTypes.STRING,
--       allowNull: false,
--     },
--     status: {
--       type: DataTypes.INTEGER,
--       defaultValue: 1,
--       allowNull: false,
--     },
--   },
--   {
--     timestamps: false,
--   }
-- );

-- Organizacion.hasMany(Trybe, {
--   foreignKey: 'id_organizacion',
--   sourceKey: 'id_organizacion',
-- });
-- Trybe.belongsTo(Organizacion, {
--   foreignKey: 'id_organizacion',
--   targetKey: 'id_organizacion',
-- });

-- export default Trybe;

-- const Repository = db.define('repository', {
--   id_repository: {
--     type: DataTypes.INTEGER,
--     primaryKey: true,
--     autoIncrement: true,
--   },
--   name: {
--     type: DataTypes.STRING,
--     allowNull: false,
--   },
--   state: {
--     type: DataTypes.CHAR(1),
--     defaultValue: 'E',
--     allowNull: false,
--   },
--   create_time: {
--     type: DataTypes.DATE,
--     allowNull: false,
--     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
--   },
--   status: {
--     type: DataTypes.CHAR(1),
--     defaultValue: 'A',
--     allowNull: false,
--   },
-- },
-- {
--   timestamps: false,
-- }
-- );

-- Trybe.hasMany(Repository, { foreignKey: 'id_tribe', sourceKey: 'id_tribe' });
-- Repository.belongsTo(Trybe, { foreignKey: 'id_tribe', targetKey: 'id_tribe' });


-- export default Repository;



INSERT INTO organizacion (name, status) VALUES ('Luis Chica', 1);

INSERT INTO tribe (name, status, id_organizacion) VALUES ('tribe1 ', 1, 1);

INSERT INTO repository (name, state, status, id_tribe) VALUES ('repository1', 'E', 'A', 1);


-- obtener los repositorios y la tribu no existe
SELECT * FROM repository r INNER JOIN tribe t ON r.id_tribe = t.id_tribe WHERE t.id_tribe = 2;
