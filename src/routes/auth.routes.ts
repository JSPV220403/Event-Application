import express from "express"

import * as controller from "../controllers/auth.controllers"
import authmiddleware from "../middleware/auth.middleware"

const router= express.Router()

router.post("/register", controller.register)
router.get("/login", controller.login);

export default router