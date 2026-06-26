import express from "express";
import  authRoutes from "./routes/auth.routes"
import eventRoutes from "./routes/event.routes"
import userRoutes from "./routes/user.routes"
import adminRoutes from "./routes/admin.routes"
import categoryRoutes from "./routes/category.routes"
import paymentRoutes from "./routes/payment.routes"
import pdfRoutes from "./routes/pdf.routes"

const router = express.Router()

router.use("/auth", authRoutes)
router.use("/event", eventRoutes)
router.use("/user", userRoutes)
router.use("/admin", adminRoutes)
router.use("/category", categoryRoutes)
router.use("/payment",paymentRoutes)
router.use("/pdf", pdfRoutes)


export default router

