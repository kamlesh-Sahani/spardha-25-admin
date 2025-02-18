import TeamModel from "@/models/team.model";
import dbConnect from "@/utils/dbConnect.util";
import { NextResponse } from "next/server";


export async function GET(){
    try {
        await dbConnect()
        const teams = await TeamModel.find({});
        return NextResponse.json({
            message:"team get ",
            teams
        },{status:201});
    } catch (error:any) {
        return NextResponse.json({
            success:false,
            message:error.message || "internal error"
        },{status:500})
    }
}