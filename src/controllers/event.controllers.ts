import { Request, Response } from "express";
import * as eventService from "../services/event.services"

export const createEvent = async(req: Request, res:Response)=>{
    const result= await eventService.createEvent(req?.body, (req as any).user);
    return res.status(result.status).json(result)
}

export const addSchedule = async(req: Request, res: Response)=>{
    const result = await eventService.addSchedule(req?.body, (req as any).user);
    return res.status(result.status).json(result)
}

export const cancelSchedule = async(req: Request, res: Response)=>{
    const result = await eventService.cancelSchedule(req?.body, (req as any).user);
    return res.status(result.status).json(result)
}

export const cancelEvent = async(req: Request, res: Response)=>{
    const result = await eventService.cancelEvent(req?.body, (req as any).user);
    return res.status(result.status).json(result)
}

export const eventList = async(req: Request, res: Response)=>{
    const result = await eventService.eventList(req?.body, (req as any).user)
    return res.status(result.status).json(result)
}

