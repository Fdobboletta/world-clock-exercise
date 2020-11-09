import express from 'express';
import TimezonesController from './controller';

const router = express.Router()
const Timezonescontroller = new TimezonesController()


router
  .route('/externalAPI')
  .get(Timezonescontroller.FetchAllFromTimezoneAPI)

router
  .route('/db')
  .get(Timezonescontroller.GetAllTimezones)

router
  .route('/db/:zone/:name')
  .put(Timezonescontroller.NewTimezone)
  .delete(Timezonescontroller.DeleteTimezone)

router
  .route('/externalAPI/:zone/:name')
  .get(Timezonescontroller.FetchOneFromTimezoneAPI)
  
export default router;