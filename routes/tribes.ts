import { Router } from 'express';
// const { check, buildCheckFunction } = require('express-validator');

import { getRepositoriesByTribe} from '../controllers/tribes';
import { checkTribeExists } from '../middlewares/verifyTribe';

const router = Router();

router.get('/:tribeId', [checkTribeExists] ,getRepositoriesByTribe);

export default router;
