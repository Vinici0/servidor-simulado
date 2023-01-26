import { Router } from 'express';
// const { check, buildCheckFunction } = require('express-validator');

import { getRepositoriesByTribe} from '../controllers/tribes';

const router = Router();

router.get('/:tribeId', getRepositoriesByTribe);

export default router;
