import express from "express"

import * as controller from "../controllers/user.controllers"
import authmiddleware from "../middleware/auth.middleware"

const router= express.Router()

router.post("/bookTicket", authmiddleware, controller.bookTicket);
router.patch("/cancelTicket", authmiddleware,controller.cancelTicket);
router.get("/bookHistory", authmiddleware, controller.bookHistory)

export default router