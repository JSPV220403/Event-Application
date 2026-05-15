import { connect } from "node:http2"
import {prisma} from "../prisma"

export const createEvent = async(data:any, user:any)=>{
    try{
        if(user?.status=="PENDING"){
            return {
                status: 401,
                message: "you are not ADMIN/ORGANIZER"
            }
        }
        const event= await prisma.events.create({
            data:{
                name: data.name,
                description: data?.description,
                category:{
                    connect:{
                        id:data?.category_id
                    }
                },
                organizer:{
                    connect:{
                        id:user?.id
                    }
                }
            }
        })

        const approval = await prisma.approvals.create({
            data:{
                events:{
                    connect:{
                        id: event?.id
                    }
                }
            }
        })

        for(const items of data.schedules){
            const schedule= await prisma.event_Schedules.create({
                data:{
                    date: new Date(items?.date),
                    time: items?.time,
                    price: items?.price,
                    venue_capacity: items?.venue_capacity,
                    event:{
                        connect:{
                            id: event?.id
                        }
                    }
                }
            })

            const address= await prisma.addresses.create({
                data:{
                    address: items?.address,
                    pincode: items?.pincode,

                    schedules:{
                        connect:{
                            id: schedule?.id
                        }
                    }
                }
            })
        }

        return {
            status: 200,
            message: "Successfully created and waiting for admin approval"
        }
    }catch(e){
        console.log(e);

        return {
        status: 500,
        message: "Internal server error"
        }
    }  
}

export const addSchedule = async(data:any, user:any)=>{
    try{  
        if(user?.status=="PENDING"){
            return {
                status: 401,
                message: "you are not ADMIN/ORGANIZER"
            }
        }
        
        const event= await prisma.events.findFirst({
            where:{
                id: data?.id,
            }
        })

        if(!event){
            return {
                status: 404,
                message: "Event not fount"
            }
        }
        if(user?.role== "ORGANIZER"){
            if(event?.organizer_id != user?.id){
                return {
                    status: 401,
                    message: "UnAuthorized person"
                }
            }
        }

        for(const items of data.schedules){
            const schedule= await prisma.event_Schedules.create({
                data:{
                    date: new Date(items?.date),
                    time: items?.time,
                    price: items?.price,
                    venue_capacity: items?.venue_capacity,
                    event:{
                        connect:{
                            id: event?.id
                        }
                    }
                }
            })

            const address= await prisma.addresses.create({
                data:{
                    address: items?.address,
                    pincode: items?.pincode,

                    schedules:{
                        connect:{
                            id: schedule?.id
                        }
                    }
                }
            })
        }

        return {
            status : 200,
            message: "Schedule added"
        }
    }
    catch(e){
        console.log(e);
        return {
            status: 500,
            message: "Internal server error"
        }
    }
}

export const cancelSchedule = async(data:any, user:any)=>{
    try{
         if(user?.status=="PENDING"){
            return {
                status: 401,
                message: "you are not ADMIN/ORGANIZER"
            }
        }
        const schedule = await prisma.event_Schedules.findUnique({
            where:{
                id: data?.id
            },

            include:{
                event:true
            }
        })

        if(!schedule){
            return {
                status: 404,
                message: "Schedule not found"
            }
        }

        if(user?.role === "ORGANIZER"){
            if(schedule?.event?.organizer_id!=user?.id){
                return {
                    status: 401,
                    message: "UnAuthorized User"
                }
            }
            else{
                await prisma.event_Schedules.update(
                    {
                        where:{
                            id: data?.id
                        },
                        data:{
                            is_active:false
                        }
                    },
                )

                return{
                    status : 200,
                    message: "Schedule cancelled"
                }
            }
        }

        else if(user?.role==="ADMIN"){
            await prisma.event_Schedules.update(
                    {
                        where:{
                            id: data?.id
                        },
                        data:{
                            is_active:false
                        }
                    },
                )

                return{
                    status : 200,
                    message: "Schedule cancelled"
                }
        }

        else{
            return {
                    status: 401,
                    message: "UnAuthorized User"
            }
        }
    }
    catch(e){
        return {
            status: 500,
            message: "Internal server error"
        }
    }
}

export const cancelEvent = async(data:any, user:any)=>{
    try{
        if(user?.status=="PENDING"){
            return {
                status: 401,
                message: "you are not ADMIN/ORGANIZER"
            }
        }
        const event = await prisma.events.findUnique({
            where:{
                id: data?.id
            }
        })
        if(!event){
            return {
                status: 404,
                message: "Event not found"
            }
        }
        if(user?.role=="ORGANIZER"){
            if(user?.id=== event?.organizer_id){
                await prisma.events.update({
                    where:{
                        id: data?.id
                    },
                    data:{
                        is_active: false
                    }
                })
                return {
                    status: 200,
                    message: "Event cancelled Successfully"
                }
            }
            return {
                status: 401,
                message: "UnAuthorized person"
            }
        }
        if(user?.role=="ADMIN"){
            if(user?.id=== event?.organizer_id){
                await prisma.events.update({
                    where:{
                        id: data?.id
                    },
                    data:{
                        is_active: false
                    }
                })
                return {
                    status: 200,
                    message: "Event cancelled Successfully"
                }
            }
        }
        return {
            status: 401,
            message: "UnAuthorized person"
        }
    }catch(e){
        return { 
            status:500, 
            message: "Internal server error"
        }
    }
}

export const eventList = async(data:any,user:any)=>{
    try{

        if((user?.role == "ADMIN" || user?.role =="ORGANIZER") && user?.status == "PENDING" && data?.filter!="public"){
            return {
                status: 401,
                message: "UnAthorized Person",
                data:[]
            }
        }
        let filter = data?.filter??"public"
        let search= data?.search??"";
        let whereCondition:any={ 
            is_active: true
        }

        whereCondition.category={
            is_active: true
        }

        if(data?.search){
            whereCondition.OR=[
                {
                    name: {
                        contains:search,
                        mode: "insensitive"
                    }
                },

                {
                    description: {
                        contains:search,
                        mode: "insensitive"
                    }   
                },
            ]
        }

        if(data?.category_id){
            whereCondition.category={
                id:  data?.category_id,
            }
        }

        if(data?.time || data?.date){
            whereCondition.schedule={
                some:{
                    date: data?.date?new Date(data?.date):undefined,
                    time: data?.time??undefined,
                    is_active:true
                }
            }
        }

        if(user?.role=="USER"){
            whereCondition.approval={
                some:{
                    approved_by:{
                        not:null
                    }
                }
            }
        }

        else if(user?.role=="ORGANIZER"){
            if(filter == "all"){
                
                whereCondition.organizer_id= user?.id;
            }
            else if(filter=="approved"){
                
                whereCondition.organizer_id= user?.id,
                whereCondition.approval={
                    some:{
                        approved_by:{
                            not:null,
                        }
                    }
                }
            }
            else if(filter == "unapproved"){
                
                whereCondition.organizer_id= user?.id,
                whereCondition.approval={
                    some:{
                        approved_by:null,
                    }
                }
            }
            else if(filter == "public"){
                whereCondition.approval={
                    some:{
                        approved_by:{
                            not: null,
                        }
                    }
                }
            }
        }

        else if(user?.role=="ADMIN"){
            if(filter == "all"){
                
            }
            else if(filter=="approved"){
                
                //whereCondition.organizer_id= user?.id,
                whereCondition.approval={
                    some:{
                        approved_by:{
                            not:null,
                        }
                    }
                }
            }
            else if(filter == "unapproved"){
                
                //whereCondition.organizer_id= user?.id,
                whereCondition.approval={
                    some:{
                        approved_by:null,
                    }
                }
            }
            else if(filter == "public"){
                whereCondition.approval={
                    some:{
                        approved_by:{
                            not: null,
                        }
                    }
                }
            }
        }

        const result = await prisma.events.findMany({
            where: whereCondition,

            include:{
                organizer:true,
                category:true,
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
            data:result
        }
    }catch(e){
        return {
            status: 500,
            message:"Internal server error",
            data:[]
        }
    }
}


