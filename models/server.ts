import express, { Application } from 'express';
import organizationRoutes from '../routes/organizations';
import tribesRoutes from '../routes/tribes';
import cors from 'cors';
import db from '../db/connection';
import './matric';
import './organization';
import './tribe';
import './usuario';
import './repository';

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    usuarios: '/api/usuarios',
    organizationPath: '/api/organizations',
    tribePath: '/api/tribes',
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8000';

    //Conectar a base de datos
    this.dbConnection();

    //Definir middlewares
    this.milddlewares();

    //Definir rutas
    this.routes();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      // await db.sync();
      // await db.sync({ force: true });
      console.log('Database online');
    } catch (error: any) {
      throw new Error(error);
    }
  }

  //Son funciones que se ejecutan antes de que lleguen a las rutas
  milddlewares() {
    //CORS
    this.app.use(cors());

    //Lectura y parseo del body
    this.app.use(express.json());

    //Directorio publico
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.apiPaths.organizationPath, organizationRoutes);
    this.app.use(this.apiPaths.tribePath, tribesRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running on port ' + this.port);
    });
  }
}

export default Server;
