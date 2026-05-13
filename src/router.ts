import express from "express";
import  authRoutes from "./routes/auth.routes"
import authzRoutes from "./routes/authz.routes"

const router = express.Router()

router.use("/auth", authRoutes)
router.use("/authz", authzRoutes)

export default router

