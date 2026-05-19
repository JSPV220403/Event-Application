import {prisma} from "../prisma"

// export const eventList = async(data:any)=>{
//     try{

//         let page = data?.page??1;

//         let limit = data?.limit??10;

//         const res= await prisma.events.findMany({
//             where:{
//                 is_active: true,

//                 approval:{
//                     some:{
//                         approved_by:{
//                             not:null
//                         }
//                     }
//                 },

                

//                 category_id: data.category_id||undefined,

//                 organizer_id: data.organizer_id||undefined,

//                 OR:[

//                     {
//                         name:{
//                             contains:data.search||"",
//                             mode: "insensitive"
//                         }
//                     },
//                     {
//                         description:{
//                             contains:data.search||"",
//                             mode: "insensitive"
//                         }
//                     },
//                     {
//                         category:{
//                             name:{
//                                 contains: data.search||"",
//                                 mode:"insensitive"
//                             }
//                         }
//                     },
//                     {
//                         organizer:{
//                             name:{
//                                 contains: data.search||"",
//                                 mode:"insensitive"
//                             }
//                         }
//                     }
//                 ]
                
//             },

//             skip: (page-1)*limit,
//             take: limit,
//             include:{
//                 schedule: {
//                     where:{
//                         is_active:true
//                     }
//                 },
//                 //approval: true
//             }
//         })

//         return {
//             staus: 200,
//             message: "Successfull",
//             data: res
//         }

//     }
//     catch(e){
//         console.log(e)
//         return{
//             status: 500,
//             message: "Internal server error",
//             data:{}
//         }
//     }
// }

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
    //console.log("total tickets: ",total_tickets);
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
    
    //console.log("Sold seats: ",sold_seats);

    //console.log("Result: ",(Number(total_tickets?.venue_capacity!) >= (sold_seats + Number(data?.seats))));

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
        const user= await prisma.sold_Tickets.update({
            where:{
                id: data?.id
            },
            data:{
                is_active:false
            }
        })
        if(user){
            return{
                status:200,
                message: "Canceled Successfully",
                data: user
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

        return{
            status:200,
            message:"Successfull",
            data:history
        }

        
    }catch(e){
        return{
            status:500,
            message:"Internal server error",
            data:{}
        }
    }
    
}