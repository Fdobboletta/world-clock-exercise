import express from 'express';
import TimezonesController from './controller';

const router = express.Router()
const Timezonescontroller = new TimezonesController()


// added more endpoints than required to save the timezones chosen by the user in the DB

router
  .route('/externalAPI')
  .get(Timezonescontroller.FetchAllFromTimezoneAPI)

router
  .route('/db')
  .get(Timezonescontroller.GetAllTimezones)

router
  .route('/db/:name(*)')
  .put(Timezonescontroller.NewTimezone)
  .delete(Timezonescontroller.DeleteTimezone)

router
  .route('/externalAPI/:name(*)')
  .get(Timezonescontroller.FetchOneFromTimezoneAPI)
  
export default router;