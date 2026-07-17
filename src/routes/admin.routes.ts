import express from "express";

import * as adminController from "../controllers/admin.controllers"
import authmiddleware from "../middleware/auth.middleware";
import { apiLimiter } from "../middleware/rateLimitter.middleware";
const router = express.Router()

router.get("/organizersAdminsList", apiLimiter,authmiddleware, adminController.organizersAdminsList)

//evnt approval
router.patch("/approval", apiLimiter, authmiddleware, adminController.approval);


router.patch("/organizerAdminApproval", apiLimiter,authmiddleware, adminController.organizerAdminApproval)

export default router;