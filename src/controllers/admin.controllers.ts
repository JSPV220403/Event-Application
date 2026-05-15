import { Request, Response } from "express";
import * as adminService from "../services/admin.service"

export const unApprovedAdminsList = async(req:Request, res:Response)=>{
    const result = await adminService.unApprovedAdminsList((req as any).user)
    return res.status(result.status).json(result)
}

export const unApprovedOrganizerList = async(req:Request, res:Response)=>{
    const result = await adminService.unApprovedOrganizerList((req as any).user)
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