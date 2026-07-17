import express from "express"

import * as controller from "../controllers/auth.controllers"
import authmiddleware from "../middleware/auth.middleware"
import { apiLimiter } from "../middleware/rateLimitter.middleware";

const router= express.Router()


router.post("/register", apiLimiter,controller.register)


router.post("/login", apiLimiter, controller.login);

export default router