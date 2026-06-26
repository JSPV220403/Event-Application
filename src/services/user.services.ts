import {prisma} from "../prisma"

import { ticketBookingTemplate } from "../../templates/ticketBooking.template";
import { ticketCancellationTemplate } from "../../templates/ticketCancellation.template";
import { unsubscribeTemplate } from "../../templates/unsubscribe.template";

import { sendMail } from "./mail.service";
import { trace } from "node:console";

export const bookTicket = async(data:any, user: any)=>{
    try{

        console.log("Data: ",data," User: ",user);

        const isExist= await prisma.event_Schedules.findUnique({
            where:{
                id: data?.id,
            },
           
        })
        if(!isExist){
            return {
                status:404,
                message: "Event not found",
                data:{}
            }
        }
        console.log("Schedule: ",isExist);
        const actualEvent= await prisma.events.findFirst(
            {
                where:{
                    id: isExist?.event_id
                }
            }
        )
        console.log("Event: ",actualEvent);
        const scheduleAddress= await prisma.addresses.findFirst({
            where:{
                schedule_id:data?.id
            }
        })
        console.log("Actual Address: ",scheduleAddress);
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
        const eventDate= `${isExist?.date.getDate()}-${isExist?.date.getMonth()}-${isExist?.date.getFullYear()}` 
        console.log("Actual Date: ",eventDate);
        const html= await ticketBookingTemplate(user?.name??"", actualEvent?.name??"", eventDate, isExist?.time, data?.seats, scheduleAddress?.address??"" )
        await sendMail("Enjoyment on the way!!!", html)
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
        const eventSchedule = await prisma.event_Schedules.findFirst({
            where:{
                id: ticket?.schedule_id
            },
            include:{
                address:true
            }
        })
        const actualEvent = await prisma.events.findFirst({
            where:{
                id: eventSchedule?.event_id,
            }
        })


        console.log("Event Schedule: ",eventSchedule,"\nActual Event: ",actualEvent);
        if(ticket){
            const eventDate = `${eventSchedule?.date.getDate()}-${eventSchedule?.date.getMonth()}-${eventSchedule?.date.getFullYear()}` 
            const html= await ticketCancellationTemplate(user?.name,actualEvent?.name??"", eventDate, eventSchedule?.time??"", ticket?.seat_count, eventSchedule?.address[0]?.address??"");
            await sendMail("Ticket Cancellation Mail", html);
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
                        event:true,
                        address:true,
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
        const historyWithCancelable = await history.map((ticket:any)=>{
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

export const transactionHistory= async(user:any)=>{
   try{
    console.log(user)
     const transactions =
      await prisma.payments.findMany({
        where: {
          initiatedBy: user.userId,
        },

        orderBy:{
            createdAt:'desc'
        },

        include: {
          schedule: {
            include: {
              event: true,
              address: true,
            },
          },
        },
      });

      console.log(transactions)

      const formatedResult = transactions.map(transaction=>{
        const metaData= JSON.parse(JSON.stringify(transaction?.metaData));

        let res=  {
            transactionId: transaction?.id,
            orderId: transaction?.order_id,
            amount: Number(metaData?.amount)/100,
            seat: transaction?.seat,
            status: transaction?.status,
            transactionCreatedAt: (transaction?.createdAt).toDateString(),
            address: transaction?.schedule?.address[0]?.address,
            eventDate: (transaction?.schedule?.date).toDateString(),
            eventTime: transaction?.schedule?.time,
            eventName: transaction?.schedule?.event?.name
        }
        return res;
      })

      return {
        status:200,
        message: 'Successfull',
        data: formatedResult
      }
   }
   catch(e){
        console.log(e);
        return{
            status:500,
            message:"Internal server error"
        }
    }
}

export const unSubscribe = async(userId:any)=>{
    try{
        const user= await prisma.users.findUnique({
            where:{
                id: userId,
                is_active: true,
            }
        })

        if(!user){
            return{
                status: 404,
                message: "User not found",
            }
        }
        await prisma.users.update({
            data:{
                is_subscribed:false
            },
            where:{
                id:userId
            },
        })
        const html= await unsubscribeTemplate(user?.name);
        sendMail("We miss you lot", html);
        return{
            status:200,
            message:"Unsubscribe successfull"
        }
    }catch(e){
        console.log(e);
        return{
            status: 500,
            message: "Internal server error"
        }
    }
}