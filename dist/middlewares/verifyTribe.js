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
exports.checkTribeExists = void 0;
const tribe_1 = __importDefault(require("../models/tribe"));
const checkTribeExists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        next();
    }
    catch (error) {
        return res.status(500).json({
            message: "Error al verificar la existencia de la tribu",
            error,
        });
    }
});
exports.checkTribeExists = checkTribeExists;
//# sourceMappingURL=verifyTribe.js.map