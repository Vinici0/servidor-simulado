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
const express_1 = __importDefault(require("express"));
const organizations_1 = __importDefault(require("../routes/organizations"));
const tribes_1 = __importDefault(require("../routes/tribes"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
require("./matric");
require("./organization");
require("./tribe");
require("./repository");
class Server {
    constructor() {
        this.apiPaths = {
            organizationPath: '/api/organizations',
            tribePath: '/api/tribes',
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8110';
        this.dbConnection();
        this.milddlewares();
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                // await db.sync();
                // await db.sync({ force: true });
                console.log('Database online');
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    milddlewares() {
        //CORS
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.organizationPath, organizations_1.default);
        this.app.use(this.apiPaths.tribePath, tribes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map