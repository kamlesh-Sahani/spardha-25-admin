import mongoose from "mongoose";

const SportsPointsSchema = new mongoose.Schema({
  event: { type: String, required: true },
  winner: {
    college: { type: String, required: true },
    team: { type: String, required: true },
    points: { type: Number, required: true },
  },
  runnerUp: {
    college: { type: String, required: true },
    team: { type: String, required: true },
    points: { type: Number, required: true },
  },
}, { timestamps: true });

const SportsPoints = mongoose.model("SportsPoints", SportsPointsSchema);

export default SportsPoints;
