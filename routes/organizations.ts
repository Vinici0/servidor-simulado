import { Router } from 'express';
const { check, buildCheckFunction } = require('express-validator');
import { validarCampos } from '../middlewares/validar-campos';

import {
  deleteOrganizacion,
  getOrganization,
  getOrganizations,
  postOrganizacion,
  putOrganizacion,
} from '../controllers/organizations';

import { exiteOrganizacionPorId } from '../middlewares/db-validators';

const router = Router();
const checkBodyAndQuery = buildCheckFunction(['body', 'query']);

router.get('/', getOrganizations);

router.get(
  '/:id',
  [
    check('id').custom(exiteOrganizacionPorId),
    checkBodyAndQuery('id').isUUID(),
    validarCampos,
  ],
  getOrganization
);

router.post(
  '/',
  [check('name', 'El nombre es obligatorio').not().isEmpty(), validarCampos],
  postOrganizacion
);

router.put(
  '/:id',
  [
    check('id').custom(exiteOrganizacionPorId),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    checkBodyAndQuery('id').isUUID(),
    validarCampos,
  ],
  putOrganizacion
);

router.delete(
  '/:id',
  [
    check('id').custom(exiteOrganizacionPorId),
    checkBodyAndQuery('id').isUUID(),
    validarCampos,
  ],
  deleteOrganizacion
);

export default router;
