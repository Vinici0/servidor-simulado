import { Request, Response } from "express";
import { Op } from "sequelize";
import Trybe from "../models/tribe";
import axios from "axios";

import Repository from "../models/repository";
import Metrics from "../models/matric";

const apiUrl = "http://localhost:8006/api/repositories";

interface ExternalRepositoryData {
  id: number;
  state: number;
}

interface RepositoryData {
  id_repository: number;
  name: string;
  state: string;
  create_time: Date;
  status: string;
  metrics?: any;
}

interface VerificationStatus {
  code: number;
  description: string;
}

export const getRepositoriesByTribe = async (req: Request, res: Response) => {
  try {
    const { tribeId } = req.params;
    let tribe = await Trybe.findOne({
      where: {
        id_tribe: tribeId,
      },
    });
    if (!tribe) {
      return res.status(404).json({
        message: "La Tribu no se encuentra registrada",
      });
    }
    const currentYear = new Date().getFullYear();

    const repositories: RepositoryData[] = await Repository.findAll({
      where: {
        id_tribe: tribeId,
        state: "E",
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
    }).then((repositories) => {
      return repositories.map((repo) => {
        return {
          id_repository: repo.dataValues.id_repository,
          name: repo.dataValues.name,
          state: repo.dataValues.state,
          create_time: repo.dataValues.create_time,
          status: repo.dataValues.status,
          metrics: repo.dataValues.metrics,
        };
      });
    });

    const { data } = await axios.get<ExternalRepositoryData[]>(apiUrl);

    const repositoriesData = data.filter((r) =>
      repositories.find((repo) => repo.id_repository === r.id)
    );

    const updatedRepositories = repositoriesData.map((repo) => {
      const verificationStatus = verificationStatuses.find((status) => status.code === repo.state);
      return {
        ...repo,
        verificationSate: verificationStatus ? verificationStatus.description : 'Desconocido'
      }
    });

    const verificationSate = updatedRepositories[0].verificationSate

    tribe = {
      ...tribe.dataValues,
      verificationSate
    }

    return res.status(200).json({
      tribe,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener los repositorios de la tribu",
      error,
    });
  }
};

const verificationStatuses: VerificationStatus[] = [
  {
    code: 604,
    description: "Verificado",
  },
  {
    code: 605,
    description: "No verificado",
  },
  {
    code: 606,
    description: "Aprobado",
  },
];


// export const tribeExists = async (req: Request, res: Response) => {
//   const specificTribeId = req.params.tribeId;
//   const tribe = await Trybe.findOne({
//     where: {
//       id_tribe: specificTribeId,
//     },
//   });
//   if (!tribe) {
//     return res.status(404).json({
//       message: "La Tribu no se encuentra registrada",
//     });
//   }
//   const repositories = await Repository.findAll({
//     include: [
//       {
//         model: Trybe,
//         required: true,
//         where: {
//           id_tribe: specificTribeId,
//         },
//       },
//     ],
//   });
//   return res.status(200).json(repositories);
// };
