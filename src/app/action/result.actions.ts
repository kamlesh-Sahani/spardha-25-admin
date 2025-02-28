import SportsPoints from "@/models/result.model";
import dbConnect from "@/utils/dbConnect.util";

export async function addSportsPoints(result: any) {
  try {
    await dbConnect();
    const { event, winner, runnerUp } = result;
    const existingWinner = await SportsPoints.findOne({
      event,
      "winner.team": winner.team,
    });
    if (existingWinner && existingWinner.winner) {
      existingWinner.winner.points =
        (existingWinner.winner.points || 0) + winner.points;
      await existingWinner.save();
    } else {
      await SportsPoints.create({ event, winner, runnerUp });
    }
    const existingRunnerUp = await SportsPoints.findOne({
      event,
      "runnerUp.team": runnerUp.team,
    });
    if (existingRunnerUp && existingRunnerUp.runnerUp) {
      existingRunnerUp.runnerUp.points =
        (existingRunnerUp.runnerUp.points || 0) + runnerUp.points;
      await existingRunnerUp.save();
    } else if (!existingWinner) {
      await SportsPoints.create({ event, winner, runnerUp });
    }
    return { message: "Sports points updated successfully!" };
  } catch (error) {
    throw new Error("Internal Server Error");
  }
}
