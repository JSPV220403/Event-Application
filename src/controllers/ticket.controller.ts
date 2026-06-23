import { Request, Response } from "express";
import * as ticketService from "../services/ticket.service";

export const downloadTicket = async (
  req: Request,
  res: Response
) => {
  try {
    const ticketId =
      req?.query?.ticketId!.toString();
    //console.log("Ticket Id: ", ticketId)
    const ticket =
      await ticketService.getTicket(
        ticketId
      );

    if (!ticket) {
      return res.status(404).json({
        message:
          "Ticket not found",
      });
    }
    //console.log(ticket)

    

    await ticketService.generateTicketPdf(
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

