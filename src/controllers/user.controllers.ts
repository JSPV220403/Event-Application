import * as userServices from "../services/user.services"

import { Request, Response } from "express"

export const bookTicket = async(req:Request, res:Response)=>{
    const result= await userServices.bookTicket(req?.body, (req as any).user)
    res.status(result?.status!).json(result)
}

export const cancelTicket = async(req:Request, res:Response)=>{
    const result= await userServices.cancelTicket(req?.body, (req as any).user);
    res.status(result?.status).json(result)
}

export const bookHistory = async(req:Request, res:Response)=>{
    const result= await userServices.bookHistory((req as any).user);
    res.status(result?.status).json(result)
}
