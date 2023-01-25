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
exports.exiteOrganizacionPorId = void 0;
const organization_1 = __importDefault(require("../models/organization"));
const exiteOrganizacionPorId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const organizacion = yield organization_1.default.findOne({ where: { id_organizacion: id, status: 1 } });
    if (!organizacion) {
        throw new Error(`El id no existe ${id}`);
    }
});
exports.exiteOrganizacionPorId = exiteOrganizacionPorId;
//# sourceMappingURL=db-validators.js.map