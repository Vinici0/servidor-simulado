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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../models/server"));
const Se = new server_1.default();
Se.listen();
describe("GET /organizations", () => {
    test("should return 200 OK", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(Se.app).get("/api/organizations").send();
        expect(response.statusCode).toBe(200);
    }));
    test("should return with a body", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(Se.app).get("/api/organizations").send();
        expect(response.body).not.toBeNull();
    }));
    test("shuld have content-type application/json ", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, supertest_1.default)(Se.app)
            .get("/api/organizations")
            .set("Content-Type", "application/json")
            .expect(200);
    }));
});
describe("POST /organizations", () => {
    test("shuld have content-type application/json", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, supertest_1.default)(Se.app)
            .post("/api/organizations")
            .set("Content-Type", "application/json")
            .expect(200);
    }));
});
describe("PUT /organizations", () => {
    test("shuld have content-type application/json", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, supertest_1.default)(Se.app)
            .put("/api/organizations")
            .set("Content-Type", "application/json")
            .expect(200);
    }));
});
describe("GET /getRepositoriesByTribe", () => {
    test("shuld have content-type application/json", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, supertest_1.default)(Se.app)
            .get("/api/tribes")
            .set("Content-Type", "application/json")
            .expect(200);
    }));
    test("should return with a body", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(Se.app).get("/api/organizations").send();
        expect(response.body).not.toBeNull();
    }));
    test("should return 200 OK", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(Se.app).get("/api/organizations").send();
        expect(response.statusCode).toBe(200);
    }));
});
//# sourceMappingURL=app.spec.js.map