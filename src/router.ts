import express from "express";
import  authRoutes from "./routes/auth.routes"
import eventRoutes from "./routes/event.routes"
import userRoutes from "./routes/user.routes"
import adminRoutes from "./routes/admin.routes"
import categoryRoutes from "./routes/category.routes"

const router = express.Router()

router.use("/auth", authRoutes)
router.use("/authz", eventRoutes)
router.use("/user", userRoutes)
router.use("/admin", adminRoutes)
router.use("/category", categoryRoutes)


export default router

