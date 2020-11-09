import express from 'express';
import timezones from './timezones'

const router = express.Router();

router.use('/timezones', timezones);

export default router;