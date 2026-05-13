import { Request, Response } from "express";
import * as authzService from "../services/authz.services"

export const createEvent = async(req: Request, res:Response)=>{
    const result= await authzService.createEvent(req?.body, (req as any).user);
    return res.status(result.status).json(result.message)
}

export const addSchedule = async(req: Request, res: Response)=>{
    const result = await authzService.addSchedule(req?.body, (req as any).user);
    return res.status(result.status).json(result.message)
}

export const cancelSchedule = async(req: Request, res: Response)=>{
    const result = await authzService.cancelSchedule(req?.body, (req as any).user);
    return res.status(result.status).json(result.message)
}

export const cancelEvent = async(req: Request, res: Response)=>{
    const result = await authzService.cancelEvent(req?.body, (req as any).user);
    return res.status(result.status).json(result.message)
}

export const createCategory = async(req: Request, res: Response)=>{
    const result = await authzService.createCategory(req?.body, (req as any).user);
    return res.status(result.status).json(result.message)
}

export const deleteCategory = async(req: Request, res: Response)=>{
    const result = await authzService.deleteCategory(req?.body, (req as any).user);
    return res.status(result.status).json(result.message)
}