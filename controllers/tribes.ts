import { Request, Response } from 'express';
import { Op, Sequelize } from 'sequelize';
import Trybe from '../models/tribe';
import Repository  from '../models/repository';
import Metrics   from '../models/matric';

//sequelize
export const gerRepositoriesTribes = async (req: Request, res: Response) => {
  try {
    const { tribeId } = req.params;
    console.log(tribeId);

    const currentYear = new Date().getFullYear();
    const repositories = await Repository.findAll({
      where: {
        id_tribe: tribeId,
        state: 'E',
        create_time: {
          [Op.gte]: new Date(currentYear, 0, 1),
          [Op.lt]: new Date(currentYear + 1, 0, 1),
        },
      },
      include: [
        {
          model: Metrics,
          where: {
            coverge: {
              [Op.gte]: 75,
            },
          },
        },
      ],
    });
    res.json(repositories);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }

};


export const tribeExists =  async  (req: Request, res: Response) => {
  const specificTribeId = req.params.tribeId;
  const tribe = await Trybe.findOne({
      where: {
          id_tribe: specificTribeId
      }
  });
  if (!tribe) {
      return res.status(404).json({
          message: 'La Tribu no se encuentra registrada'
      });
  }
  const repositories = await Repository.findAll({
      include: [{
          model: Trybe,
          required: true,
          where: {
              id_tribe: specificTribeId
          }
      }]
  });
  return res.status(200).json(repositories);
};

// const repositoriPorTribu = async (req: Request, res: Response) => {
//   //Sequelize


//   try {
//     const { id } = req.params;

//     // buscar la tribu en la base de datos
//     const tribe = await Trybe.findByPk(id);

//     // si la tribu no existe, retornar un error
//     if (!tribe) {
//       return res.status(404).json({ error: 'La Tribu no se encuentra registrada' });
//     }

//     // obtener los repositorios de la tribu
//     const query = `
//         SELECT r.name, r.coverage
//         FROM repositories r
//         WHERE r.id_tribe = :id AND r.state = 'E' AND r.create_time >= :year
//     `;
//     const repositories = await sequelize.query(query, {
//       replacements: { id: id, year: new Date().getFullYear() + "-01-01" },
//       type: sequelize.QueryTypes.SELECT
//     });

//     // si no se encuentran repositorios, retornar un error
//     if (repositories.length === 0) {
//       return res.status(404).json({ error: 'La Tribu no tiene repositorios que cumplan con la cobertura necesaria' });
//     }

//      // filtrar los repositorios por cobertura
//      const filteredRepositories = repositories.filter(repo => {
//       // obtener el estado de verificación del repositorio desde una API simulada (mock)
//       const verificationStatus = getVerificationStatusFromApi(repo.id);
//       return repo.coverage > 75 && verificationStatus === 'Verified';
//   });

//   // si no se encuentran repositorios que cumplan con la cobertura, retornar un error
//   if (filteredRepositories.length === 0) {
//       return res.status(404).json({ error: 'La Tribu no tiene repositorios que cumplan con la cobertura necesaria' });
//   }

//   // retornar los detalles de las métricas de los repositorios
//   return res.json({
//       tribe: tribe.name,
//       repositories: filteredRepositories.map(repo => ({
//           name: repo.name,
//           coverage: repo.coverage,
//           verificationStatus: getVerificationStatusFromApi(repo.id)
//       }))
//   });
// });


// export const repositoriPorTribu = async (req: Request, res: Response) => {
//     // obtener el id de la tribu desde el parámetro de la ruta
//     const { id } = req.params;

//     // buscar la tribu en la base de datos
//     const tribe = await Trybe.findByPk(id);

//     // si la tribu no existe, retornar un error
//     if (!tribe) {
//         return res.status(404).json({ error: 'La Tribu no se encuentra registrada' });
//     }

//     // obtener los repositorios de la tribu
//     const repositories = await Repository.findAll({
//         where: {
//             id_tribe: id,
//             state: 'E',
//             create_time: { [Op.gte]: new Date(new Date().getFullYear(), 0, 1) }
//         },
//         include: [{
//             model: Trybe,
//             attributes: ['name']
//         }]
//     });

//     // si no se encuentran repositorios, retornar un error
//     if (repositories.length === 0) {
//         return res.status(404).json({ error: 'La Tribu no tiene repositorios que cumplan con la cobertura necesaria' });
//     }

//     // filtrar los repositorios por cobertura
//     const filteredRepositories = repositories.filter(repo => {
//         // obtener el estado de verificación del repositorio desde una API simulada (mock)
//         const verificationStatus =  getVerificationStatusFromApi(repo.id);
//         return repo.coverge >= 75 && verificationStatus === 'Verified';
//     });

//     // si no se encuentran repositorios que cumplan con la cobertura, retornar un error
//     if (filteredRepositories.length === 0) {
//         return res.status(404).json({ error: 'La Tribu no tiene repositorios que cumplan con la cobertura necesaria' });
//     }

//     // retornar los detalles de las métricas de los repositorios
//     return res.json({
//         tribe: tribe.name,
//         repositories: filteredRepositories.map(repo => ({
//             name: repo.name,
//             coverage: repo.coverge,
//             verificationStatus: getVerificationStatusFromApi(repo.id)
//         }))
//     });
// }

// function getVerificationStatusFromApi(repoId: number): string {
//     // aquí deberías colocar la lógica para obtener el estado de verificación desde una API simulada (mock)
//     return 'Verified';
// }



