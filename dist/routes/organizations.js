"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { check, buildCheckFunction } = require('express-validator');
const validar_campos_1 = require("../middlewares/validar-campos");
const organizations_1 = require("../controllers/organizations");
const db_validators_1 = require("../middlewares/db-validators");
const router = (0, express_1.Router)();
const checkBodyAndQuery = buildCheckFunction(['body', 'query']);
router.get('/', organizations_1.getOrganizations);
router.get('/:id', [
    check('id').custom(db_validators_1.exiteOrganizacionPorId),
    checkBodyAndQuery('id').isUUID(),
    validar_campos_1.validarCampos,
], organizations_1.getOrganization);
router.post('/', [check('name', 'El nombre es obligatorio').not().isEmpty(), validar_campos_1.validarCampos], organizations_1.postOrganizacion);
router.put('/:id', [
    check('id').custom(db_validators_1.exiteOrganizacionPorId),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    checkBodyAndQuery('id').isUUID(),
    validar_campos_1.validarCampos,
], organizations_1.putOrganizacion);
router.delete('/:id', [
    check('id').custom(db_validators_1.exiteOrganizacionPorId),
    checkBodyAndQuery('id').isUUID(),
    validar_campos_1.validarCampos,
], organizations_1.deleteOrganizacion);
exports.default = router;
//# sourceMappingURL=organizations.js.map