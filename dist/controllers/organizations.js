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
exports.deleteOrganizacion = exports.putOrganizacion = exports.postOrganizacion = exports.getOrganization = exports.getOrganizations = void 0;
const organization_1 = __importDefault(require("../models/organization"));
const getOrganizations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const organizations = yield organization_1.default.findAll({ where: { status: 1 } });
    res.json({ organizations });
});
exports.getOrganizations = getOrganizations;
const getOrganization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const organization = yield organization_1.default.findOne({ where: { id_organizacion: id, status: 1 } });
    if (organization) {
        res.json(organization);
    }
    else {
        res.status(404).json({
            msg: `No existe una organización con el id ${id}`,
        });
    }
});
exports.getOrganization = getOrganization;
const postOrganizacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const existeNombre = yield organization_1.default.findOne({
            where: {
                name: body.name
            }
        });
        if (existeNombre) {
            return res.status(400).json({
                msg: 'Ya existe una organización con el nombre ' + body.name
            });
        }
        const organizacion = organization_1.default.build(body);
        yield organizacion.save();
        res.json(organizacion);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.postOrganizacion = postOrganizacion;
const putOrganizacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const organizacion = yield organization_1.default.findOne({ where: { id_organizacion: id, status: 1 } });
        if (!organizacion) {
            return res.status(404).json({
                msg: 'No existe una organización con el id ' + id
            });
        }
        yield organizacion.update(body);
        res.json(organizacion);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putOrganizacion = putOrganizacion;
const deleteOrganizacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const organizacion = yield organization_1.default.findByPk(id);
    if (!organizacion) {
        return res.status(404).json({
            msg: 'No existe una organización con el id ' + id
        });
    }
    yield organizacion.update({ status: 0 });
    res.json(organizacion);
});
exports.deleteOrganizacion = deleteOrganizacion;
//# sourceMappingURL=organizations.js.map