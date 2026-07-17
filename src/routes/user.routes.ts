import express from "express"

import * as controller from "../controllers/user.controllers"
import authmiddleware from "../middleware/auth.middleware"
import { apiLimiter } from "../middleware/rateLimitter.middleware"

const router= express.Router()

router.post("/bookTicket", apiLimiter, authmiddleware, controller.bookTicket);
router.patch("/cancelTicket",apiLimiter, authmiddleware,controller.cancelTicket);
router.get("/bookHistory",apiLimiter, authmiddleware, controller.bookHistory);
router.get("/myTransactions",apiLimiter, authmiddleware, controller.transactionHistory);
router.get("/unsubscribe", apiLimiter, controller.unSubscribe)

export default router