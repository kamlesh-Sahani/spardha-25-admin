import mongoose, { Schema, Document, Model } from "mongoose";

interface ITeamId extends Document {
  teamId: number;
}

const TeamIdSchema = new Schema<ITeamId>({
  teamId: {
    type: Number,
    required: true,
    unique: true,
    default: 10000,
  },
});

const teamIdModel: Model<ITeamId> =
  mongoose.models.TeamId || mongoose.model<ITeamId>("TeamId", TeamIdSchema);

export default teamIdModel;
