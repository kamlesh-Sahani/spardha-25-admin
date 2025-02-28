import SportsPoints from "@/models/result.model";
import dbConnect from "@/utils/dbConnect.util";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const results = await SportsPoints.find({});
    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching sports points:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
