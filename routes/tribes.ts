import { Router } from 'express';
const { check, buildCheckFunction } = require('express-validator');

import { gerRepositoriesTribes, tribeExists } from '../controllers/tribes';

const router = Router();

router.get('/:tribeId', gerRepositoriesTribes);

router.get('/exist/:tribeId', tribeExists);

export default router;
