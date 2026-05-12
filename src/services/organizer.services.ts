import { connect } from "node:http2"
import {prisma} from "../prisma"

export const createEvent = async(data:any, user:any)=>{
    try{

        if(user?.status=="PENDING"){
            return {
                status: 401,
                message: "not yet approved",
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
                    time: new Date(items?.time),
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
            status: 400,
            message: "Successfully created"
        }
    }catch(e){
        console.log(e);

        return {
        status: 500,
        message: "Internal server error"
        }
    }  
}

