import TeamModel from "@/models/team.model";
import dbConnect from "@/utils/dbConnect.util";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest){
    try {
        await dbConnect()
        const password = req.nextUrl.searchParams.get("pass");
        
        const profile = await TeamModel.findOne({password});
        if(!profile){
            return NextResponse.json({
                message:"password is in correct",
            },{status:401});
        }
        return NextResponse.json({
            message:"profile find",
            profile
        },{status:200});
    } catch (error:any) {
        return NextResponse.json({
            success:false,
            message:error.message || "internal error"
        },{status:500})
    }
}