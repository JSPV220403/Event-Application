import { Request, Response } from "express";
import * as eventService from "../services/event.services"

export const createEvent = async(req: Request, res:Response)=>{
    const data= req?.body;
    if(req?.file){
        data.image= req?.file?.filename;
    }
    const result= await eventService.createEvent(data, (req as any).user);
    return res.status(result.status).json(result)
}

export const eventById= async(req:Request, res:Response)=>{
    const result = await eventService.eventById(req?.query);
    res.status(result?.status).json(result);
}

export const cancelEvent = async(req: Request, res: Response)=>{
    const result = await eventService.cancelEvent(req?.body, (req as any).user)
    return res.status(result.status).json(result)
}

export const updateEvent = async(req:Request, res: Response)=>{
     const data= req?.body;
    if(req?.file){
        data.image= req?.file?.filename;
    }
    const result = await eventService.updateEvent(data, (req as any).user);
    return res.status(result.status).json(result)
}

export const eventList = async(req: Request, res: Response)=>{
    const result = await eventService.eventList(req?.query, (req as any).user)
    return res.status(result.status).json(result)
}

