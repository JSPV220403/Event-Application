import express from "express"

import { upload } from "../config/multer"

import * as registration from "../controllers/registration"

const router = express.Router()

router.post("/register", upload.single("user_image"), registration.registration)

export default router