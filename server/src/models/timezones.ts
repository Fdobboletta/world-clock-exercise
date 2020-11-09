import mongoose, { Schema , Document } from 'mongoose';

export interface ITimezones extends Document {
  name: string;
}

const TimezonesSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    }
  }
)

export default mongoose.model<ITimezones>('Timezones', TimezonesSchema)