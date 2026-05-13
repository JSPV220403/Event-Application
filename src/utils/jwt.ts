import jwt from "jsonwebtoken"
import {Role} from "@prisma/client"
import {prisma} from "../prisma"

export const generateToken=async(data:any)=>{
    let user=null
    if(data?.role===Role.ADMIN || data?.role=== Role.ORGANIZER){
            user = await prisma.approvals.findFirst({
                where:{
                 user_id: data?.id
            }})
    }

    return jwt.sign(
        {
            id: data.id,
            email: data.email,
            role: data.role,
            status: user==null?"PENDING":user?.approved_by!=null?"APPROVED":"PENDING"

        },
        process.env.JWT_SECRET!,
        {
            expiresIn:"1d"
        }
    )
}