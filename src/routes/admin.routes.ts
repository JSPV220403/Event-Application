import express from "express";

import * as adminController from "../controllers/admin.controllers"
import authmiddleware from "../middleware/auth.middleware";

const router = express.Router()

router.get("/adminsList", authmiddleware, adminController.adminsList)
router.get("/organizerList", authmiddleware, adminController.organizersList)
router.patch("/eventApproval", authmiddleware, adminController.eventApproval);
router.patch("/organizerAdminApproval",authmiddleware, adminController.organizerAdminApproval)

export default router;