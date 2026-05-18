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

        const filter = data?.filter;
        const role = data?.role;

        let whereCondition:any={
            is_active:true
        };

        whereCondition.role= role == "organizer"? Role.ORGANIZER :  Role.ADMIN;

        if(filter == "approved"){
            whereCondition.request_approvals={
                some:{
                    approved_by:{
                        not:null
                    }
                }
            }
        }

        if(filter== "unapproved"){
            whereCondition.request_approvals={
                some:{
                    approved_by:null
                }
            }
        }



        const result = await prisma.users.findMany({
                where: whereCondition,
        })

        return {
            status: 200,
            message: "Successful",
            data:result
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

// export const organizersList = async(data:any, user:any)=>{
//      try{

//         if(user?.status == "PENDING" || user?.role != "ADMIN"){    
//             return {
//                 status: 401,
//                 message: "UnAuthorized person",
//                 data:[]
//             }
//         }

//         let filter= data?.filter;

//         let whereCondition:any={
//             role: Role.ORGANIZER,
//             is_active:true,
//         }

//         if(filter=="approved"){
//             whereCondition.request_approvals={
//                 some:{
//                     approved_by:{
//                         not:null
//                     }
//                 }
//             }
//         }

//         if(filter =="unapproved"){
//             whereCondition.requested_approvals={
//                 some:{
//                     approved_by:null,
//                 }
//             }
//         }


//         const organizers = await prisma.users.findMany({
//                 where: whereCondition,
//         })

//         return {
//             status: 200,
//             message: "Successful",
//             data:organizers
//         }
//     }
//     catch(e){
//         console.log(e);
//         return{
//             status: 500,
//             message: "Internal server error",
//             data:[]
//         }
//     }
// }
//merge above two


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
//merge above two