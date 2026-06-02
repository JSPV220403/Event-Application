import { Request, Response } from "express";
import * as adminService from "../services/admin.service"

export const organizersAdminsList = async(req:Request, res:Response)=>{
    const result = await adminService.organizersAdminsList(req?.body,(req as any).user)
    return res.status(result.status).json(result)
}

export const approval = async(req:Request, res:Response)=>{
    const result = await adminService.approval(req?.body,(req as any).user)
    return res.status(result.status).json(result)
}

export const organizerAdminApproval = async(req:Request, res:Response)=>{
    const result = await adminService.organizerAdminApproval(req?.body, (req as any).user)
    return res.status(result?.status).json(result)
}