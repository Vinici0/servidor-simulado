import { Request, Response } from "express";
import { Op } from "sequelize";
import Trybe from "../models/tribe";
import axios from "axios";

import Repository from "../models/repository";
import Metrics from "../models/matric";
import Organization from "../models/organization";

const apiUrl = "http://localhost:8006/api/status";

interface ExternalRepositoryData {
  id: number;
  state: number;
}

interface RepositoryData {
  id_repository: number;
  trybe: string;
  state: string;
  create_time: Date;
  status: string;
  metrics?: any;
  coverge?: number;
  vulnerabilities?: number;
  hostpost?: number;
  bugs?: number;
}

interface VerificationStatus {
  code: number;
  description: string;
}

export const getRepositoriesByTribe = async (req: Request, res: Response) => {


  //recuperar los nombre de organizaciones
  try {
    const { tribeId } = req.params;
    let tribe = await Trybe.findOne({
      where: {
        id_tribe: tribeId,
      },
    });

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
          trybe: repo.dataValues.name,
          state: repo.dataValues.state,
          create_time: repo.dataValues.create_time,
          status: repo.dataValues.status,
        };
      });
    });



    //recuperar los datos de metricas
    const metrics = await Metrics.findAll({
      where: {
        id_repository: {
          [Op.in]: repositories.map((repo) => repo.id_repository),
        },
      },
    });
    const metricsData = metrics.map((metric) => {
      return {
        id_repository: metric.dataValues.id_repository,
        coverge: metric.dataValues.coverge,
        vulnerabilities: metric.dataValues.vulnerabilities,
        hostpost: metric.dataValues.hostpost,
        bugs: metric.dataValues.bugs,
        name: metric.dataValues.name,
        codeSmells: metric.dataValues.codeSmells,

      };
    });

    const {vulnerabilities, hostpost, bugs, codeSmells, coverge} = metricsData[0];


    if (!repositories || repositories.length === 0) {
      return res.status(404).json({
        message: "La Tribu no tiene repositorios que cumplan con la cobertura necesaria",
      });

    }

    // repositories.length === 0? name = 'No hay repositorios': name = repositories[0].name

    const { data } = await axios.get<ExternalRepositoryData[]>(apiUrl);
    if (!data) {
      return res.status(404).json({
        message: "No se encontraron datos en la API de verificación",
      });
    }

    const repositoriesData = data.filter((r) =>
      repositories.find((repo) => repo.id_repository === r.id)
    );

    const updatedRepositories = repositoriesData.map((repo) => {
      const verificationStatus = verificationStatuses.find(
        (status) => status.code === repo.state
      );
      return {
        ...repo,
        verificationStatus: verificationStatus
          ? verificationStatus.description
          : "Desconocido",
      };
    });

    const verificationStatus = updatedRepositories[0].verificationStatus;
    console.log(verificationStatus);


    const repositoriess = {
      tribe: tribe?.dataValues.name,
      ...tribe?.dataValues,
      verificationStatus,
      vulnerabilities, hostpost, bugs, codeSmells, coverge
    };

    return res.status(200).json({
      repositoriess
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
