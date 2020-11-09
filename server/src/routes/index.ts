import express from 'express';
import dbTimezones from './dbTimezones'
import externalTimezones from './externalTimezones';

const router = express.Router();

router.use('/dbtimezones', dbTimezones);
router.use('/externaltimezones', externalTimezones);

export default router;