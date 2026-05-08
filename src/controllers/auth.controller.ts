import { Request, Response } from "express";

import * as authService from "../services/auth.services"

export const register = async(req: Request, res:Response)=>{
    const result = await authService.register(req?.body)
    res.status(result.status).json(result)
}

export const login= async(req:Request, res: Response)=>{
    const result= await authService.login(req?.body);
    res.status(result.status).json(result);
}

export const decode = async(req:Request, res:Response)=>{
    res.status(200).json((req as any).user)
}
