import { Request, Response } from "express";
import * as pdfService from "../services/pdf.service";
import { PrismaClientRustPanicError } from "@prisma/client/runtime/library";

export const downloadTicket = async (
  req: Request,
  res: Response
) => {
  try {
    const ticketId =
      req?.query?.ticketId!.toString();
    //console.log("Ticket Id: ", ticketId)
    const ticket =
      await pdfService.getTicket(
        ticketId
      );

    if (!ticket) {
      return res.status(404).json({
        message:
          "Ticket not found",
      });
    }
    //console.log(ticket)

    

    await pdfService.generateTicketPdf(
        ticket,
        res);
    //   res.status(200).json({
    //   message:"Done"
    // })
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Internal server error",
    });
  }
};

export const downloadBookings =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const scheduleId =
        req.query.scheduleId!.toString();

      const result =
        await pdfService.getSchedule(
          scheduleId
        );

      const bookings =
        result?.formattedResult;

      const totalAmount =
        result?.total;

      const eventName = result?.eventName;


      pdfService.generateBookingsPdf(
        bookings!,
        totalAmount!,
        eventName!,
        scheduleId!,
        res
      );
    } catch (e) {
      console.log(e);

      res.status(500).json({
        message:
          "Internal server error",
      });
    }
  };
