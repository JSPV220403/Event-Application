import {prisma} from "../prisma"
import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import { Response } from "express";

export const generateTicketPdf = async (
  ticket: any,
  res: Response
) => {
  const doc = new PDFDocument({
    size: "A4",
    margin: 0,
  });

  res.setHeader(
    "Content-Type",
    "application/pdf"
  );

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=ticket-${ticket.ticket.id}.pdf`
  );

  doc.pipe(res);

  /*
  =====================================
  PAGE BACKGROUND
  =====================================
  */

  doc.rect(0, 0, 595, 842).fill("#F3F4F6");

  /*
  =====================================
  MAIN TICKET CARD
  =====================================
  */

  const x = 40;
  const y = 120;
  const width = 515;
  const height = 560;

  doc
    .roundedRect(
      x,
      y,
      width,
      height,
      25
    )
    .fill("#111827");

  /*
  =====================================
  HEADER
  =====================================
  */

  doc
    .font("Helvetica-Bold")
    .fontSize(24)
    .fillColor("#FFFFFF")
    .text(
      "EVENT BOOKING",
      70,
      160
    );

  doc
    .fontSize(14)
    .fillColor("#A78BFA")
    .text(
      "Your Experience Starts Here",
      70,
      195
    );

  /*
  =====================================
  PREMIUM BADGE
  =====================================
  */

  doc
    .roundedRect(
      410,
      160,
      100,
      35,
      18
    )
    .fill("#FBBF24");

  doc
    .fillColor("#111827")
    .fontSize(12)
    .font("Helvetica-Bold")
    .text(
      "PREMIUM",
      432,
      172
    );

  /*
  =====================================
  EVENT NAME
  =====================================
  */

  doc
    .font("Helvetica-Bold")
    .fontSize(34)
    .fillColor("white")
    .text(
      ticket.event.name,
      70,
      250,
      {
        width: 320,
      }
    );

  /*
  =====================================
  EVENT DETAILS
  =====================================
  */

  doc
    .fontSize(14)
    .font("Helvetica")
    .fillColor("#D1D5DB");

  doc.text(
    `Date: ${new Date(
      ticket.schedule.date
    ).toLocaleDateString()}`,
    70,
    360
  );

  doc.text(
    `Time: ${ticket.schedule.time}`,
    70,
    390
  );

  doc.text(
    `Address: ${
      ticket.schedule.address?.[0]
        ?.address ??
      "Venue Not Available"
    }`,
    70,
    420,
    {
      width: 260,
    }
  );

  doc.text(
    `Seats: ${ticket.ticket.seat_count}`,
    70,
    485
  );

  /*
  =====================================
  ATTENDEE SECTION
  =====================================
  */

  doc
    .fillColor("#A78BFA")
    .font("Helvetica-Bold")
    .fontSize(16)
    .text(
      "ATTENDEE",
      70,
      550
    );

  doc
    .fillColor("white")
    .font("Helvetica")
    .fontSize(14)
    .text(
      ticket.user.name,
      70,
      585
    );

  doc
    .fillColor("#D1D5DB")
    .text(
      ticket.user.email,
      70,
      615
    );

  /*
  =====================================
  DASHED DIVIDER
  =====================================
  */

  for (
    let i = 360;
    i <= 360;
    i++
  ) {
    doc
      .moveTo(360, 180)
      .lineTo(360, 640)
      .dash(8, {
        space: 5,
      })
      .strokeColor("#6B7280")
      .stroke();
  }

  doc.undash();

  /*
  =====================================
  QR CODE
  =====================================
  */

  const qr =
    await QRCode.toDataURL(
      ticket.ticket.id
    );

  const qrBuffer =
    Buffer.from(
      qr.replace(
        /^data:image\/png;base64,/,
        ""
      ),
      "base64"
    );

  doc.image(
    qrBuffer,
    400,
    250,
    {
      width: 120,
    }
  );

  doc
    .fontSize(11)
    .fillColor("#D1D5DB")
    .text(
      "Scan To Verify",
      425,
      380
    );

  /*
  =====================================
  TICKET ID
  =====================================
  */

  doc
    .fontSize(11)
    .fillColor("#A78BFA")
    .font("Helvetica-Bold")
    .text(
      "TICKET ID",
      410,
      450
    );

  doc
    .fontSize(9)
    .fillColor("#D1D5DB")
    .font("Helvetica")
    .text(
      ticket.ticket.id,
      385,
      475,
      {
        width: 150,
        align: "center",
      }
    );

  /*

  /*
  =====================================
  FOOTER
  =====================================
  */

  doc
    .fontSize(11)
    .fillColor("#9CA3AF")
    .text(
      "Please carry this ticket during entry.",
      0,
      730,
      {
        align: "center",
      }
    );

  doc
    .fillColor("#A78BFA")
    .font("Helvetica-Bold")
    .fontSize(12)
    .text(
      "www.eventbooking.com",
      0,
      755,
      {
        align: "center",
      }
    );

  doc.end();
};

export const getTicket = async (ticketId:string)=>{
  try{
    const ticket= await prisma.sold_Tickets.findFirst({
      where:{
        id: ticketId
      }
    })
    const user = await prisma.users.findFirst({
      where:{
        id: ticket?.user_id
      }
    })
    const schedule = await prisma.event_Schedules.findFirst({
      where:{
        id: ticket?.schedule_id
      },
      include:{
        address:true
      }
    })

    const event = await prisma.events.findFirst({
      where:{
        id: schedule?.event_id
      }
    })

    return {
      ticket,
      user,
      schedule,
      event
    }
  }catch(e){
    console.log(e);
    return;
  }
}

export const generateBookingsPdf = (
  bookings: any[],
  totalAmount: number,
  eventName:string,
  scheduleId:string,
  res: Response
) => {
  const doc = new PDFDocument({
    size: "A4",
    margin: 50,
  });

  res.setHeader(
    "Content-Type",
    "application/pdf"
  );

  res.setHeader(
    "Content-Disposition",
    "attachment; filename=bookings-report.pdf"
  );

  doc.pipe(res);

  /*
  ==========================
  HEADER
  ==========================
  */

  doc
    .fontSize(24)
    .font("Helvetica-Bold")
    .fillColor("#1f2937")
    .text(
      "Event Booking Platform",
      {
        align: "center",
      }
    );

  doc
    .moveDown(0.5)
    .fontSize(18)
    .fillColor("#4f46e5")
    .text(
      "Booking Details Report",
      {
        align: "center",
      }
    );

  doc.moveDown(2);

  /*
  ==========================
  SUMMARY
  ==========================
  */

  doc
    .fontSize(12)
    .fillColor("black")
    .font("Helvetica");

  doc.text(
    `Generated On : ${new Date().toLocaleString()}`
  );
  doc.text(
    `Event Name : ${eventName}`
  );
  doc.text(
    `Schedule ID : ${scheduleId}`
  );
  doc.text(
    `Total Bookings : ${bookings.length}`
  );

  doc.text(
    `Total Revenue : ${totalAmount}`
  );

  

  doc.moveDown(2);

  /*
  ==========================
  TABLE HEADER
  ==========================
  */

  let y = doc.y;

  const columns = {
    sno: 50,
    ticketId: 85,
    name: 170,
    email: 220,
    phone: 340,
    seats: 440,
    amount: 490,
  };

  doc
    .rect(45, y - 5, 550, 25)
    .fill("#4f46e5");

  doc
    .fillColor("white")
    .font("Helvetica-Bold")
    .fontSize(11);

  doc.text(
    "S.No",
    columns.sno,
    y
  );

 
  doc.text(
  "Ticket ID",
  columns.ticketId,
  y
);

  doc.text(
    "Name",
    columns.name,
    y
  );

  doc.text(
    "Email",
    columns.email,
    y
  );

  doc.text(
    "Mobile",
    columns.phone,
    y
  );

  doc.text(
    "Seats",
    columns.seats,
    y
  );

  doc.text(
    "Paid",
    columns.amount,
    y
  );

  y += 30;

  /*
  ==========================
  TABLE DATA
  ==========================
  */

  doc
    .font("Helvetica")
    .fillColor("black");

bookings.forEach((booking, index) => {
  /*
  Create new page if needed
  */
  if (y > 730) {
    doc.addPage();
    y = 50;
  }

  /*
  Split UUID into multiple lines
  */
  const formattedId =
    booking.ticketId
      .match(/.{1,12}/g)
      ?.join("\n") ?? "";

  /*
  Calculate how much height UUID needs
  */
  const ticketHeight =
    doc.heightOfString(
      formattedId,
      {
        width: 80,
      }
    );

  /*
  Row height should fit UUID
  */
  const rowHeight =
    Math.max(
      25,
      ticketHeight + 10
    );

  /*
  Zebra background
  */
  if (index % 2 === 0) {
    doc
      .rect(
        45,
        y - 5,
        510,
        rowHeight
      )
      .fill("#f9fafb");

    doc.fillColor("black");
  }

  /*
  S.No
  */
  doc.text(
    (index + 1).toString(),
    columns.sno,
    y
  );

  /*
  Ticket ID
  */
  doc.text(
    formattedId,
    columns.ticketId,
    y,
    {
      width: 80,
    }
  );

  /*
  Name
  */
  doc.text(
    booking.name,
    columns.name,
    y,
    {
      width: 90,
    }
  );

  /*
  Email
  */
  doc.text(
    booking.email,
    columns.email,
    y,
    {
      width: 110,
    }
  );

  /*
  Mobile
  */
  doc.text(
    booking.phoneNumber,
    columns.phone,
    y
  );

  /*
  Seats
  */
  doc.text(
    booking.seats.toString(),
    columns.seats,
    y
  );

  /*
  Amount
  */
  doc.text(
    `${booking.paid}`,
    columns.amount,
    y
  );

  /*
  Move to next row
  */
  y += rowHeight + 5;
});

  /*
  ==========================
  TOTAL SECTION
  ==========================
  */

  y += 20;

  doc
    .moveTo(350, y)
    .lineTo(550, y)
    .strokeColor("#d1d5db")
    .stroke();

  y += 15;

  doc
    .font("Helvetica-Bold")
    .fontSize(13)
    .fillColor("#111827")
    .text(
      `Total Revenue : ${totalAmount}`,
      350,
      y,
      {
        width: 200,
        align: "right",
      }
    );

  /*
  ==========================
  FOOTER
  ==========================
  */

  doc
    .fontSize(10)
    .font("Helvetica")
    .fillColor("gray")
    .text(
      "Generated by Event Booking Platform",
      50,
      780,
      {
        align: "center",
      }
    );

  doc.end();
};

export const getSchedule = async(scheduleId:string)=>{
  try{
    const fans = await prisma.sold_Tickets.findMany({
      where:{
        is_active:true,
      },
      include:{
        user:true,
        schedule:{
          include:{
            event:true
          }
        }
      }
    })

    let total =0;
    let eventName = fans[0]?.schedule?.event?.name;
    let formattedResult = fans.map(user=>{
      total+= (user?.seat_count * (user?.schedule?.price as any))
      return{
        ticketId: user?.id,
        name: user?.user?.name,
        email: user?.user?.email,
        phoneNumber: user?.user?.phone_number,
        seats: user?.seat_count,
        paid: (user?.seat_count * (user?.schedule?.price as any))
      }
    })

    return{formattedResult, total, eventName};
    
  }catch(e){
    console.log(e);
    return{
      formattedResult:[],
      total:0}
  }
}