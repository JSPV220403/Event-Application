import express from "express"

import * as controller from "../controllers/users.controllers"
import authmiddleware from "../middleware/auth.middleware"

const router= express.Router()

router.post("/eventList", authmiddleware,controller.evenList)
router.get("/bookTicket", authmiddleware, controller.bookTicket);
router.get("/cancelTicket", authmiddleware,controller.cancelTicket);
router.get("/bookHistory", authmiddleware, controller.bookHistory)

export default router