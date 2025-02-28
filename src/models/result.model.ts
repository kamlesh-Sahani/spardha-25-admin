import mongoose, { Schema, Document, Model } from "mongoose";

// Interface for individual event results
interface IWinnerEntry {
  college: string;
  points: number;
}

// Define main document interface
export interface ISportsPoints extends Document {
  event: string;
  winner: IWinnerEntry;
  runnerUp: IWinnerEntry;
  createdAt?: Date;
  updatedAt?: Date;
}

// Schema definition
const SportsPointsSchema = new Schema<ISportsPoints>(
  {
    event: { type: String, required: true, unique: true },
    winner: {
      college: { type: String, required: true },
      points: { type: Number, required: true, default: 0 },
    },
    runnerUp: {
      college: { type: String, required: true },
      points: { type: Number, required: true, default: 0 },
    },
  },
  { timestamps: true }
);

// Model creation
const SportsPoints: Model<ISportsPoints> =
  mongoose.models?.SportsPoints ||
  mongoose.model<ISportsPoints>("SportsPoints", SportsPointsSchema);

export default SportsPoints;
