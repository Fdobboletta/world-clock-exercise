import { ITimezones } from '../models/timezones'

export const parseDBTimezones = (doc: ITimezones) => ({
  name: doc.name
});