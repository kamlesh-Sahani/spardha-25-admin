import {cookies} from "next/headers";
import jwt from "jsonwebtoken";
const isAdmin  = async()=>{
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    if (!token) {
      return {
        success: false,
        message: "unauthenticated admin",
      };
    }

    const decoded:any = jwt.verify(token, process.env.JWT_SECRET!);
    if (!decoded) {
      return {
        success: false,
        message: "unauthenticated admin",
      };
    }

    if(decoded.role!=="admin"){
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