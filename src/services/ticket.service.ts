import {prisma} from "../prisma"
import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import bwipjs from "bwip-js";
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

