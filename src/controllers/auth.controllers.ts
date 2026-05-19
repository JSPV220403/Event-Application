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

// export const updateAccountDetails = async(req:Request, res:Response)=>{
//     const result = await authService.updateAccountDetails(req?.body, (req as any)?.user);
//     res.status(result.status).json(result);
// }

