import TeamModel from "@/models/team.model";
import dbConnect from "@/utils/dbConnect.util";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect();
    try {
        // Fetch distinct college names
        const colleges = await TeamModel.find({}).distinct("college");
        // Fetch distinct event names
        const events = await TeamModel.find({}).distinct("event");

        return NextResponse.json({
            message: "Data retrieved successfully",
            success: true,
            data: { colleges, events } // Returning both colleges and events separately
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message || "Internal server error"
        }, { status: 500 });
    }
}
