import {cookies} from "next/headers";
import jwt from "jsonwebtoken";
import adminModel from "@/models/admin.model";
const isAdmin  = async()=>{
    const cookieStore = await cookies();
    const token = cookieStore.get("world-token")?.value;
    if (!token) {
      return {
        success: false,
        message: "unauthenticated admin",
      };
    }

    const decoded:any = jwt.verify(token, process.env.JWT_SECRET!);
    if (!decoded || !decoded._id) {
      return {
        success: false,
        message: "unauthenticated admin",
      };
    }


    const admin = await adminModel.findById(decoded._id);
    if(!admin || !admin.active || !admin.email){
      cookieStore.delete("world-token");
      return { success: false, message: "Invalid token or admin" };
    }

    if(admin.role!=="admin"){
      cookieStore.delete("world-token");
      return {
        success: false,
        message: "unauthenticated admin",
      };
    }


    return{
        success: true,
        message: "admin goted",
    }
}

export default isAdmin;