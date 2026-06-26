import  express from "express";

const router = express.Router()

import authmiddleware from "../middleware/auth.middleware";
import * as pdfController from "../controllers/pdf.controller";
router.get(
  "/ticketDownload",
  authmiddleware,
  pdfController.downloadTicket
);

router.get(
  "/downloadBookings",
  pdfController.downloadBookings
)



export default router