import { json } from "node:stream/consumers";
import {prisma} from "../prisma"
import {Role} from "@prisma/client"

export const organizersAdminsList = async(data:any, user:any)=>{
    try{

        if(user?.status == "PENDING" || user?.role != "ADMIN"){
            return {
                status: 401,
                message: "UnAuthorized person",
                data:[]
            }
        }
        
        let whereCondition:any={
            is_active:true
        };

        const result = await prisma.users.findMany({
                where: {
                    is_active:true,
                },
                include:{
                    requested_approvals:true
                }
        })

        const filterResult = result
                                    .filter(
                                        user =>
                                        user.role === Role.ADMIN ||
                                        user.role === Role.ORGANIZER
                                    )
                                    .map(user => ({
                                        id: user.id,
                                        name: user.name,
                                        mail: user.email,
                                        role: user.role,
                                        mobileNumber: user.phone_number,
                                        is_approved:
                                        user?.requested_approvals[0]?.approved_by == null
                                            ? "unapproved"
                                            : "approved",
                                    }));
        console.log(filterResult)

        return {
            status: 200,
            message: "Successful",
            data:filterResult
        }
        
    }
    catch(e){
        console.log(e);
        return{
            status: 500,
            message: "Internal server error",
            data:[]
        }
    }
}

export const approval = async(data:any, user:any)=>{
    try{

        if(user?.status=="PENDING" || user?.role != "ADMIN"){
            return {
                status: 401,
                message: "UnAuthorized person"
            }
        }

        const event = await prisma.events.findFirst({
            where:{
                id: data?.id,
                is_active:true
            }
        })

        if(!event){
            return {
                status: 401,
                messsage: "No event found"
            }
        }

        const waiting = await prisma.approvals.findFirst({
            where:{
                event_id: data?.id
            }
        })

        if(!waiting){
            return {
                status: 404,
                message: "event not available approval queue"
            }
        }

        if(waiting.approved_by!=null){
            return{
                status: 400,
                message: "Already approved"
            }
        }

        await prisma.approvals.update({
            where:{
                event_id: data?.id,
            },
            data:{
                approver:{
                    connect:{
                        id: user?.id
                    }
                }
            }
        })

        return {
            status: 200,
            message: "Successfully approved"
        }


    }catch(e){
        return {
            status: 500,
            message: "Internal server error"
        }
    }
}

export const organizerAdminApproval = async(data:any, user:any)=>{
    try{
        if(user?.role!="ADMIN" || user?.status=="PENDING"){
            return {
                status: 401,
                message: "UnAuthorized person"
            }
        }

        const requester= await prisma.approvals.findUnique({
            where:{
                user_id: data?.id
            }
        })

        if(!requester){
            return {
                status: 404,
                message: "No user found"
            }
        }

        if(requester?.approved_by!= null){
            return {
                status: 400,
                message: "Already Approved"
            }
        }

        await prisma.approvals.update({
            where:{
                user_id: data?.id
            },
            data:{
                approver:{
                    connect:{
                        id:user?.id
                    }
                }
            }
        })

        return {
            status:200,
            message: "Approved Successfully"
        }
    }catch(e){
        console.log(e);
        return {
            status: 500,
            message: "Internal server error"
        }
    }
}