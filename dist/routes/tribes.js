"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { check, buildCheckFunction } = require('express-validator');
const tribes_1 = require("../controllers/tribes");
const router = (0, express_1.Router)();
router.get('/:tribeId', tribes_1.gerRepositoriesTribes);
router.get('/exist/:tribeId', tribes_1.tribeExists);
exports.default = router;
//# sourceMappingURL=tribes.js.map