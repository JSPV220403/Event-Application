import PDFDocument from "pdfkit";
import {prisma} from "../prisma"

import QRCode from "qrcode";
import { Response } from "express";

export const generateTicketPdf = async (
  ticket: any,
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
    `attachment; filename=ticket-${ticket.ticket.id}.pdf`
  );

  doc.pipe(res);

  /*
  =========================
  HEADER
  =========================
  */

  doc
    .rect(0, 0, doc.page.width, 120)
    .fill("#4F46E5");

  doc
    .fillColor("white")
    .fontSize(26)
    .font("Helvetica-Bold")
    .text(
      "EVENT BOOKING PLATFORM",
      0,
      35,
      {
        align: "center",
      }
    );

  doc
    .fontSize(18)
    .text(
      "EVENT TICKET",
      {
        align: "center",
      }
    );

  /*
  =========================
  TICKET CARD
  =========================
  */

  doc
    .roundedRect(
      50,
      150,
      500,
      550,
      15
    )
    .lineWidth(2)
    .strokeColor("#E5E7EB")
    .stroke();

  /*
  =========================
  TICKET ID
  =========================
  */

  doc
    .font("Helvetica-Bold")
    .fontSize(18)
    .fillColor("#4F46E5")
    .text(
      "Ticket ID",
      80,
      180
    );

  doc
    .font("Helvetica")
    .fontSize(13)
    .fillColor("black")
    .text(
      ticket.ticket.id,
      80,
      210
    );

  doc
    .moveTo(80, 250)
    .lineTo(520, 250)
    .strokeColor("#D1D5DB")
    .stroke();

  /*
  =========================
  EVENT DETAILS
  =========================
  */

  let y = 280;

  const addRow = (
    label: string,
    value: string
  ) => {
    doc
      .font("Helvetica-Bold")
      .fontSize(13)
      .fillColor("#111827")
      .text(
        label,
        80,
        y
      );

    doc
      .font("Helvetica")
      .text(
        value,
        240,
        y,
        {
          width: 250,
        }
      );

    y += 40;
  };

  addRow(
    "Event",
    ticket.event.name
  );

  addRow(
    "Date",
    new Date(
      ticket.schedule.date
    ).toLocaleDateString()
  );

  addRow(
    "Time",
    ticket.schedule.time
  );

  addRow(
    "Seats Booked",
    ticket?.ticket?.seat_count.toString()
  );

  addRow(
    "Venue",
    ticket.schedule.address?.[0]
      ?.address ??
      "Venue Not Available"
  );

  /*
  =========================
  ATTENDEE SECTION
  =========================
  */

  doc
    .moveTo(80, 500)
    .lineTo(520, 500)
    .strokeColor("#D1D5DB")
    .stroke();

  doc
    .font("Helvetica-Bold")
    .fontSize(18)
    .fillColor("#4F46E5")
    .text(
      "Attendee Information",
      80,
      530
    );

  doc
    .font("Helvetica")
    .fontSize(13)
    .fillColor("black")
    .text(
      `Name : ${ticket.user.name}`,
      80,
      570
    );

  doc.text(
    `Email : ${ticket.user.email}`,
    80,
    600
  );

  /*
  =========================
  QR CODE
  =========================
  */

  const qrData =
    await QRCode.toDataURL(
      ticket.ticket.id
    );

  const qrBuffer =
    Buffer.from(
      qrData.replace(
        /^data:image\/png;base64,/,
        ""
      ),
      "base64"
    );

  doc.image(
    qrBuffer,
    420,
    540,
    {
      width: 90,
    }
  );

  doc
    .fontSize(10)
    .fillColor("gray")
    .text(
      "Scan to verify ticket",
      405,
      640
    );

  /*
  =========================
  FOOTER
  =========================
  */

  doc
    .rect(
      0,
      750,
      doc.page.width,
      50
    )
    .fill("#F3F4F6");

  doc
    .fillColor("#374151")
    .fontSize(11)
    .text(
      "Please carry this ticket during entry. Thank you for booking with Event Booking Platform.",
      40,
      770,
      {
        align: "center",
      }
    );

  doc.end();
};

export const getTicket= async (ticketId:string)=>{
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