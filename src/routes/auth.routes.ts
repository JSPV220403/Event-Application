import express from "express"

import * as controller from "../controllers/auth.controller"
import authmiddleware from "../middleware/auth.middleware"

const router= express.Router()

router.post("/register", controller.register)
router.get("/login", controller.login);
router.get("/decode", authmiddleware,controller.decode);

export default router