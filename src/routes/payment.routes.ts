import  express from "express";

const router = express.Router()

import authmiddleware from "../middleware/auth.middleware";
import * as paymentController from "../controllers/payment.controller"

router.post(
    "/createOrder",
    authmiddleware,
    paymentController.createOrder
);

router.post(
  "/verifyPayment",
  authmiddleware,
  paymentController.verifyPayment
);

export default router