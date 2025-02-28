import SportsPoints from "@/models/result.model";
import dbConnect from "@/utils/dbConnect.util";
import { NextRequest, NextResponse } from "next/server";

// Function to update total points across all events
const updateOverallStandings = async () => {
  const allResults = await SportsPoints.find({});
  const pointsTable: Record<string, number> = {};

  allResults.forEach(({ winner, runnerUp }: any) => {
    pointsTable[winner.college] =
      (pointsTable[winner.college] || 0) + winner.points;
    pointsTable[runnerUp.college] =
      (pointsTable[runnerUp.college] || 0) + runnerUp.points;
  });

  // Sorting colleges based on total points
  const sortedColleges = Object.entries(pointsTable)
    .sort((a, b) => b[1] - a[1]) // Sort descending
    .map(([college, points]) => ({ college, points }));

  return {
    overallWinner: sortedColleges[0] || null,
    overallRunnerUp: sortedColleges[1] || null,
  };
};

// **POST - Add/Update Sports Points**
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const result = await req.json();
    console.log("Received Data:", result);

    const { event, winner, runnerUp } = result;

    if (!event || !winner?.college || !runnerUp?.college) {
      return NextResponse.json(
        { message: "Invalid input data" },
        { status: 400 }
      );
    }

    const existingEntry = await SportsPoints.findOne({ event });

    if (existingEntry) {
      // Update existing event's points
      existingEntry.winner.points += winner.points;
      existingEntry.runnerUp.points += runnerUp.points;
      await existingEntry.save();
    } else {
      // Create new event entry
      await SportsPoints.create({ event, winner, runnerUp });
    }

    // Update overall standings
    const overallStandings = await updateOverallStandings();

    return NextResponse.json({
      message: "Sports points updated successfully!",
      overallStandings,
    });
  } catch (error) {
    console.error("Error in addSportsPoints:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// **GET - Fetch event-wise results**
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const event = req.nextUrl.searchParams.get("event");

    let results;
    if (event) {
      const singleResult = await SportsPoints.findOne({ event });
      results = singleResult ? [singleResult] : []; // Ensure array format
    } else {
      results = await SportsPoints.find({});
    }

    const overallStandings = await updateOverallStandings();

    return NextResponse.json({ results, overallStandings });
  } catch (error) {
    console.error("Error fetching results:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();

    // Extract event name from query parameters
    const { searchParams } = new URL(req.url);
    const event = searchParams.get("event");

    if (!event) {
      return NextResponse.json(
        { message: "Event name is required" },
        { status: 400 }
      );
    }

    const deletedEntry = await SportsPoints.findOneAndDelete({ event });

    if (!deletedEntry) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Event deleted successfully!" });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
