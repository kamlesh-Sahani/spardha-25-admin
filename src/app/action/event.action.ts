"use server";

import dbConnect from "@/utils/dbConnect.util";
import eventModel from "@/models/event.model";
export const newEvent = async(eventData:any)=>{
    try {
        await dbConnect();
        const { name, type, hovername, fee, image, cashReward, coordinators, rules, description } = eventData;
        if( !name || !type || !hovername || !fee  || !cashReward || !coordinators || !rules || !description ){
            return{
                message:"please fill the all fields",
                success:false
            }
        }
       

        const event = await eventModel.create({ name, type, hovername, fee, image, cashReward, coordinators, rules, description });
        if(!event){
            return{
                message:"failed to create try again",
                success:false
            }
        }
        return{
            message:"successfuly created",
            success:true
        }
        
      } catch (error:any) {
        return {
            success:false,
            message:error.message || "internal error"
        }
      }
}

export const allEvents = async()=>{
    try{
        await dbConnect();
const events = await eventModel.find({});
return {
    message:"successfuly find",
    success:true,
    events:JSON.stringify(events)
}
    }catch(error:any){
        return {
            success:false,
            message:error.message || "internal error"
        }
    }
}


