import { Schema, model, Document,models,Model } from 'mongoose';

interface ICashReward {
  winner: string;
  runnerUp: string;
}

interface ICoordinator {
  name: string;
  phone: string;
}

export interface IEvent extends Document {
  name: string;
  type: string;
  hovername: string;
  fee: string;
  image?: string; // This could be a URL or a path to an image file
  cashReward: ICashReward;
  coordinators: ICoordinator[];
  rules: string[];
  description?: string;
  active:boolean
}

const cashRewardSchema = new Schema<ICashReward>({
  winner: { type: String, required: true },
  runnerUp: { type: String, required: true },
});

const coordinatorSchema = new Schema<ICoordinator>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
});

const eventSchema = new Schema<IEvent>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  hovername: { type: String, required: true },
  fee: { type: String, required: true },
  image: { type: String, default:'' }, // Image can be a string (URL) or file path
  cashReward: { type: cashRewardSchema, required: true },
  coordinators: { type: [coordinatorSchema], required: true },
  rules: { type: [String], required: true },
  description: { type: String },
  active:{
    type:Boolean,
    default:true
  }
},{timestamps:true});

const eventModel = models.event as Model<IEvent> || model<IEvent>('event', eventSchema);

export default eventModel;
