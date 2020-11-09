import DBTimezones, { ITimezones } from '../../models/timezones'
import { parseDBTimezones } from '../../parsers/parseDBTimezones';
import { Response as ExpressResponse , Request, response } from 'express'

interface ResponseParams {
  data: object | object[] | ITimezones | null;
  status?: number;
  message?: string;
}

interface Response extends ExpressResponse {
  success: (params: ResponseParams) => void;
}

class TimezonesController {
  public async GetAllTimezones(res: Response) {
    try {
      const response = await DBTimezones.find({})
      return res.success({
        data: response.map(parseDBTimezones)
      })
    } catch {
      return  res.status(500).send('Timezones not found')
    }
  }
  public async NewTimezone(req: Request,res: Response) {
    try {
      const { name } = req.body
      const NewTimezone = new DBTimezones({name})
      await NewTimezone.save()
      res.success({
        data: parseDBTimezones(NewTimezone),
        status: 201
      })
    } catch {
        res.status(500).send('Cannot create a new timezone')
    }
  }
  public async DeleteTimezone(req: Request,res: Response) {
    try {
      const response = await DBTimezones.findOneAndDelete({ name:req.params.name })
      res.success({
        data: response,
        message: 'Timezone Deleted'
      })
    } catch {
        res.status(500).send('Timezone not found')
    }
  }
}

export default TimezonesController;