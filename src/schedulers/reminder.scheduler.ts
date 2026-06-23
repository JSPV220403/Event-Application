// import cron, { schedule } from "node-cron";
import { prisma } from "../prisma";
import { sendMail } from "../services/mail.service";
import { remainderEmailTemplate } from "../../templates/remainder.template";
import { trace } from "node:console";
// import nodeCron from "node-cron";

export const startRemainderJob =async()=>{
    const cron = await import("node-cron");
    cron.default.schedule("* * * * *", async ()=>{
        try{
            let tomorrow:any= new Date();
            const today = new Date();

            tomorrow.setDate(today.getDate()+1);

            //tomorrow = `${tomorrow.getFullYear()}-${tomorrow.getMonth()}-${tomorrow.getDate()}`;

            const eventSchedules = await prisma.event_Schedules.findMany({
                where:{
                    date:tomorrow,
                    is_active:true
                },
                include:{
                    address:true
                }
            })

            if(eventSchedules.length>0){
                eventSchedules.map(async (schedule:any)=>{
                    const tickets= await prisma.sold_Tickets.findMany({
                        where:{
                            schedule_id: schedule?.id,
                            is_active:true,
                            is_remainded:false
                        }
                    })
                    const actualEvent = await prisma.events.findFirst({
                        where:{
                            id:schedule?.event_id,
                        }
                    })
                    if(tickets.length>0){
                        tickets.map(async (ticket:any)=>{
                            console.log(ticket);
                            const user = await prisma.users.findFirst({
                                where:{
                                    id: ticket?.user_id,
                                    is_active:true
                                }
                            })
                            const eventDate= `${schedule?.date.getDate()}-${schedule?.date.getMonth()}-${schedule?.date.getFullYear()}` 

                            const html= await remainderEmailTemplate(user?.name!, user?.email!, actualEvent?.name!, ticket?.seat_count, schedule?.address[0]?.address, eventDate,schedule?.time);
                            
                            await sendMail("Remainder for tomorrow event!!!",html)

                            await prisma.sold_Tickets.update({
                                data:{
                                    is_remainded:true
                                },
                                where:{
                                    id: ticket?.id
                                }
                            })
                        })
                    }
                    else{
                        console.log("People not interested on tomorrow event")
                        
                    }
                })
            }
            //console.log("Tomorrow: ",tomorrow);
        }catch(e){
            console.log(e);
        }
    })
}