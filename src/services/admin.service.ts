import {prisma} from "../prisma"
import {Role} from "@prisma/client"

export const unApprovedEventList = async(user:any)=>{
    try{
        if(user?.status == "PENDING" || user?.role != "ADMIN"){
            
            return {
                status: 401,
                message: "UnAuthorized person",
                data:[]
            }
        }

        const events = await prisma.events.findMany({
                where:{
                    is_active: true,
                    approval:{
                        some:{
                            approved_by:null
                        }
                    }
                },

                include:{
                    organizer:true,
                    schedule:{
                        where:{
                            is_active:true
                        }
                    }
                }
        })

        return {
            status: 200,
            message: "Successful",
            data:events
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

export const unApprovedAdminsList = async(user:any)=>{
    try{
        if(user?.status == "PENDING" || user?.role != "ADMIN"){
            
            return {
                status: 401,
                message: "UnAuthorized person",
                data:[]
            }
        }

        const admins = await prisma.users.findMany({
                where:{
                    is_active: true,
                    role: Role.ADMIN,
                    requested_approvals:{
                        some:{
                            approved_by:null
                        }
                    }
                },
        })

        return {
            status: 200,
            message: "Successful",
            data:admins
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

export const unApprovedOrganizerList = async(user:any)=>{
     try{
        if(user?.status == "PENDING" || user?.role != "ADMIN"){
            
            return {
                status: 401,
                message: "UnAuthorized person",
                data:[]
            }
        }

        const organizers = await prisma.users.findMany({
                where:{
                    is_active: true,
                    role: Role.ORGANIZER,
                    requested_approvals:{
                        some:{
                            approved_by:null
                        }
                    }
                },
        })

        return {
            status: 200,
            message: "Successful",
            data:organizers
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

export const eventApproval = async(data:any, user:any)=>{
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
                message: "event not in waiting for approval queue"
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
                approved_by: user?.id,
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