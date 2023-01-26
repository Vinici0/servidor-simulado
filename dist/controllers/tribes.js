"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRepositoriesByTribe = void 0;
const sequelize_1 = require("sequelize");
const tribe_1 = __importDefault(require("../models/tribe"));
const axios_1 = __importDefault(require("axios"));
const repository_1 = __importDefault(require("../models/repository"));
const matric_1 = __importDefault(require("../models/matric"));
const apiUrl = "http://localhost:8006/api/repositories";
const getRepositoriesByTribe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tribeId } = req.params;
        let tribe = yield tribe_1.default.findOne({
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
        const repositories = yield repository_1.default.findAll({
            where: {
                id_tribe: tribeId,
                state: "E",
                create_time: {
                    [sequelize_1.Op.gte]: new Date(currentYear, 0, 1),
                    [sequelize_1.Op.lt]: new Date(currentYear + 1, 0, 1),
                },
            },
            include: [
                {
                    model: matric_1.default,
                    where: {
                        coverge: {
                            [sequelize_1.Op.gte]: 75,
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
        const { data } = yield axios_1.default.get(apiUrl);
        const repositoriesData = data.filter((r) => repositories.find((repo) => repo.id_repository === r.id));
        const updatedRepositories = repositoriesData.map((repo) => {
            const verificationStatus = verificationStatuses.find((status) => status.code === repo.state);
            return Object.assign(Object.assign({}, repo), { verificationSate: verificationStatus ? verificationStatus.description : 'Desconocido' });
        });
        const verificationSate = updatedRepositories[0].verificationSate;
        tribe = Object.assign(Object.assign({}, tribe.dataValues), { verificationSate });
        return res.status(200).json({
            tribe,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error al obtener los repositorios de la tribu",
            error,
        });
    }
});
exports.getRepositoriesByTribe = getRepositoriesByTribe;
const verificationStatuses = [
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
//# sourceMappingURL=tribes.js.map