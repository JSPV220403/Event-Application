import  express from "express";

const router = express.Router()

import authmiddleware from "../middleware/auth.middleware";
import * as pdfController from "../controllers/pdf.controller";
import { apiLimiter } from "../middleware/rateLimitter.middleware";
router.get(
  "/ticketDownload",
  apiLimiter
,authmiddleware,
  pdfController.downloadTicket
);

router.get(
  "/downloadBookings",
  apiLimiter,
  authmiddleware,
  pdfController.downloadBookings
)



export default router