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
exports.getRepositoriesByTribes = exports.getRepositoriesByTribe = void 0;
const sequelize_1 = require("sequelize");
const tribe_1 = __importDefault(require("../models/tribe"));
const axios_1 = __importDefault(require("axios"));
const repository_1 = __importDefault(require("../models/repository"));
const matric_1 = __importDefault(require("../models/matric"));
const organization_1 = __importDefault(require("../models/organization"));
const apiUrl = "http://localhost:8006/api/status";
const getRepositoriesByTribe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tribeId } = req.params;
        let tribe = yield tribe_1.default.findOne({
            where: {
                id_tribe: tribeId,
            },
        });
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
                    trybe: repo.dataValues.name,
                    state: repo.dataValues.state,
                    create_time: repo.dataValues.create_time,
                    status: repo.dataValues.status,
                };
            });
        });
        //Si state es E = Enable, D = Disable, A = Archive
        let { state, id_repository } = repositories[0];
        if (state === "E")
            state = "Enable";
        const metrics = yield matric_1.default.findAll({
            where: {
                id_repository: {
                    [sequelize_1.Op.in]: repositories.map((repo) => repo.id_repository),
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
                code_smells: metric.dataValues.code_smells,
            };
        });
        const { vulnerabilities, hostpost, bugs, code_smells, coverge } = metricsData[0];
        if (!repositories || repositories.length === 0) {
            return res.status(404).json({
                message: "La Tribu no tiene repositorios que cumplan con la cobertura necesaria",
            });
        }
        const { data } = yield axios_1.default.get(apiUrl);
        if (!data) {
            return res.status(404).json({
                message: "No se encontraron datos en la API de verificación",
            });
        }
        const repositoriesData = data.filter((r) => repositories.find((repo) => repo.id_repository === r.id));
        const updatedRepositories = repositoriesData.map((repo) => {
            const verificationStatus = verificationStatuses.find((status) => status.code === repo.state);
            return Object.assign(Object.assign({}, repo), { verificationStatus: verificationStatus
                    ? verificationStatus.description
                    : "Desconocido" });
        });
        const verificationStatus = updatedRepositories[0].verificationStatus;
        console.log(verificationStatus);
        const organization = yield organization_1.default.findOne({
            where: {
                id_organizacion: tribe === null || tribe === void 0 ? void 0 : tribe.dataValues.id_organizacion,
            },
        });
        const { name } = tribe === null || tribe === void 0 ? void 0 : tribe.dataValues;
        const repositoriess = {
            id: id_repository,
            tribe: name,
            verificationStatus,
            organization: organization === null || organization === void 0 ? void 0 : organization.dataValues.name,
            vulnerabilities,
            hostpost,
            bugs,
            code_smells,
            coverge,
            state
        };
        return res.status(200).json({
            repositoriess,
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
const getRepositoriesByTribes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tribeId } = req.params;
        const repositories = yield repository_1.default.findAll({
            where: {
                id_tribe: tribeId,
            },
            include: [{
                    model: tribe_1.default,
                    include: [organization_1.default]
                }]
        });
        return res.status(200).json({
            repositories,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error al obtener los repositorios de la tribu",
            error,
        });
    }
});
exports.getRepositoriesByTribes = getRepositoriesByTribes;
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
//# sourceMappingURL=tribes.js.map