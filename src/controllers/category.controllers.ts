import { Request, Response } from "express";

import * as categoryService from "../services/category.services"

export const createCategory = async(req: Request, res: Response)=>{
    const result = await categoryService.createCategory(req?.body, (req as any).user);
    return res.status(result.status).json(result)
}

export const listCategory = async(req:Request, res:Response)=>{
       const result = await categoryService.listCategory()
       return res.status(result.status).json(result)
}

export const getCategoryById = async(req:Request, res:Response)=>{
    const result = await categoryService.getCategoryById(req?.body, (req as any)?.user);
    return res.status(result?.status).json(result)
}

export const updateCategory = async(req:Request, res:Response)=>{
    const result = await categoryService.updateCategory(req?.body, (req as any).user);
    return res.status(result.status).json(result)
}

export const deleteCategory = async(req: Request, res: Response)=>{
    const result = await categoryService.deleteCategory(req?.body, (req as any).user);
    return res.status(result.status).json(result)
}