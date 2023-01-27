"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// const { check, buildCheckFunction } = require('express-validator');
const tribes_1 = require("../controllers/tribes");
const verifyTribe_1 = require("../middlewares/verifyTribe");
const router = (0, express_1.Router)();
router.get('/:tribeId', [verifyTribe_1.checkTribeExists], tribes_1.getRepositoriesByTribe);
//getRepositoriesByTribes
router.get('/repo/:tribeId', tribes_1.getRepositoriesByTribes);
exports.default = router;
//# sourceMappingURL=tribes.js.map