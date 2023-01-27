import { Router } from 'express';
// const { check, buildCheckFunction } = require('express-validator');

import { getRepositoriesByTribe, getRepositoriesByTribes} from '../controllers/tribes';
import { checkTribeExists } from '../middlewares/verifyTribe';

const router = Router();

router.get('/:tribeId', [checkTribeExists] ,getRepositoriesByTribe);

//getRepositoriesByTribes
router.get('/repo/:tribeId', getRepositoriesByTribes);

export default router;
