import express from 'express';
import TimezonesController from './controller';

const router = express.Router()
const Timezonescontroller = new TimezonesController()

router
  .route('/')
  .get(Timezonescontroller.GetAllTimezones)

router
  .route('/:name')
  .put(Timezonescontroller.NewTimezone)
  .delete(Timezonescontroller.DeleteTimezone)

export default router;