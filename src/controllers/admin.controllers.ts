import { Request, Response } from "express";
import * as adminService from "../services/admin.service"

export const adminsList = async(req:Request, res:Response)=>{
    const result = await adminService.adminsList(req?.body,(req as any).user)
    return res.status(result.status).json(result)
}

export const organizersList = async(req:Request, res:Response)=>{
    const result = await adminService.organizersList(req?.body,(req as any).user)
    return res.status(result.status).json(result)
}

export const eventApproval = async(req:Request, res:Response)=>{
    const result = await adminService.eventApproval(req?.body,(req as any).user)
    return res.status(result.status).json(result)
}

export const organizerAdminApproval = async(req:Request, res:Response)=>{
    const result = await adminService.organizerAdminApproval(req?.body, (req as any).user)
    return res.status(result?.status).json(result)
}