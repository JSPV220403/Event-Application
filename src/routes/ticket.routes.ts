import  express from "express";

const router = express.Router()

import authmiddleware from "../middleware/auth.middleware";
import * as ticketController from "../controllers/ticket.controller";
router.get(
  "/download",
  authmiddleware,
  ticketController.downloadTicket
);



export default router