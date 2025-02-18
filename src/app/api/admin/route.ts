import adminModel from "@/models/admin.model";
import dbConnect from "@/utils/dbConnect.util";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function GET() {
  try {
    await dbConnect();
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    if (!token) {
      cookieStore.delete("auth-token");
      return NextResponse.json(
        {
          success: false,
          message: "unauthenticated user",
        },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (!decoded || typeof decoded !== "object" || !decoded.email) {
      cookieStore.delete("auth-token");
      return NextResponse.json(
        {
          success: false,
          message: "Invalid token or token expired",
        },
        { status: 401 }
      );
    }

    const admin = await adminModel.findOne({ email: decoded.email });

    if (!admin) {
      cookieStore.delete("auth-token");
      return NextResponse.json(
        {
          success: false,
          message: "Admin is not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Admin found successfully",
        admin: decoded,
      },
      { status: 200 }
    );
  } catch (error: any) {
    const cookieStore = await cookies();
    cookieStore.delete("auth-token");
    return NextResponse.json(
      {
        success: false,
        message: error.message || "internal error",
      },
      { status: 500 }
    );
  }
}
