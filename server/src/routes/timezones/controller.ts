import DBTimezones from '../../models/timezones'
import { parseDBTimezones } from '../../parsers/parseDBTimezones';
import { Response as ExpressResponse , Request } from 'express'
import got from 'got';

class TimezonesController {
  public async GetAllTimezones(_: Request, res: ExpressResponse) {
    try {
      const response = await DBTimezones.find({})
      res.status(200).send({
        data: response.map(parseDBTimezones)
      })
    } catch {
      res.status(500).send('Timezones not found')
    }
  }
  public async NewTimezone(req: Request,res: ExpressResponse) {
    try {
      const name = req.params.name
      const NewTimezone = new DBTimezones({name:`${name}`})
      await NewTimezone.save()
      res.status(200).send({
        data: parseDBTimezones(NewTimezone),
        status: 200
      })
    } catch(error) {
        res.status(500).send(error.toString())
    }
  }
  public async DeleteTimezone(req: Request,res: ExpressResponse) {
    try {
      const name = req.params.name
      const response = await DBTimezones.findOneAndDelete({name: `${name}`})
      res.status(200).send({
        data: response,
        message: 'Timezone Deleted'
      })
    } catch {
        res.status(500).send('Timezone not found')
    }
  }
  public async FetchAllFromTimezoneAPI (_: Request, res: ExpressResponse) {
    try{
      const data = await got('http://worldtimeapi.org/api/timezone')
      res.status(200).send({data: JSON.parse(data.body)})
    } catch (error) {
      res.status(500).send(error.toString())
    }
  }
  public async FetchOneFromTimezoneAPI (req: Request, res: ExpressResponse) {
    try{
      const data = await got(`http://worldtimeapi.org/api/timezone/${req.params.name}`)
      res.status(200).send({data: JSON.parse(data.body)})
    } catch (error) {
      res.status(500).send({error})
    }
  }


}

export default TimezonesController;