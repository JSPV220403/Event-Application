import {NextFunction, Request, Response} from "express"

import jwt from "jsonwebtoken"

const authmiddleware= async(req:Request, res:Response,next:NextFunction)=>{
    try{
        const authHeader = req.headers.authorization

        if(!authHeader){
            return res.status(401).json({
                success: false,
                message: "Token missing"
            })
        }
        const token = await authHeader.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        (req as any).user=decoded

        next()
    }
    catch(e){
        return res.status(500).json({
            success:false,
            message:"Invalid token"
        })
    }
}

export default authmiddleware
