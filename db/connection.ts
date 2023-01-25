import { Sequelize } from 'sequelize';

const db = new Sequelize('AdministradorOrganizaciones', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres',
    // logging: false,
});

export default db;
