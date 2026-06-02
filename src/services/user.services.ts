import {prisma} from "../prisma"

export const bookTicket = async(data:any, user: any)=>{
    try{
        const isExist= await prisma.event_Schedules.findUnique({
            where:{
                id: data?.id,
            }
        })
        if(!isExist){
            return {
                status:404,
                message: "Event not found",
                data:{}
            }
        }
        if(data?.seats<=0){
            return{
                status: 400,
                message: "Seat count invalid",
                data:{}
            }
        }
    const total_tickets= await prisma.event_Schedules.findFirst({
        where:{
            id: data?.id
        },
        select:{
            venue_capacity:true
        }
    })

    const tickets_sold= await prisma.sold_Tickets.aggregate({
        where:{
            schedule_id: data?.id,
            is_active: true
        },
        _sum:{
            seat_count:true
        }
    })
    let sold_seats= tickets_sold._sum.seat_count??0;

    if(Number(total_tickets?.venue_capacity!) >= (sold_seats + Number(data?.seats))){
        const res= await prisma.sold_Tickets.create(
            {
                data:{
                    schedule_id: data?.id,
                    user_id: user?.id,
                    seat_count: data?.seats
                }
            }
        )

        return {
            status: 200,
            message: "Successfully booked",
            data: res
        }
    }

    return {
        status: 400,
        message: "Not enough seats available",
        data:{}
    }
    }
    catch(e){
        console.log(e);
        return {
            status: 500,
            message: "Internal server error",
            data:{}
        }
    }
    
}

export const cancelTicket = async(data:any, user: any)=>{
    try{
        const ticket= await prisma.sold_Tickets.update({
            where:{
                id: data?.id
            },
            data:{
                is_active:false
            }
        })
        if(ticket?.user_id!= user?.id){
            return{
                status: 401,
                message: "UnAuthorized person",
                data:{}
            }
        }
        if(ticket){
            return{
                status:200,
                message: "Canceled Successfully",
                data: ticket
            }
        }
        
        return{
                status:404,
                message: "Ticket ID not found",
                data: {}
            }

    }catch(e){
        console.log(e);
        return {
            status: 500,
            message: "Internal server error",
            data:{}
        }
    }
}

export const bookHistory = async(user: any)=>{
    try{
        const history= await prisma.sold_Tickets.findMany({
            where:{
                user_id: user?.id,
                is_active:true
            },
            include:{
                schedule:{
                    include:{
                        event:true
                    }
                }
            }
        })

        if(history.length==0){
            return{
                status:200,
                message:"You not booked anything yet",
                data:[]
            }
        }

        const todayDate = new Date();
        const historyWithCancelable = await history.map(ticket=>{
            const scheduleDate =new Date(`${ticket.schedule.date.toISOString().split("T")[0]}T${ticket.schedule.time}`)

            return {
                ...ticket,
                isCancelable: scheduleDate>=todayDate
            }
        })

        return{
            status:200,
            message:"Successfull",
            data:historyWithCancelable
        }

        
    }catch(e){
        return{
            status:500,
            message:"Internal server error",
            data:{}
        }
    }
    
}