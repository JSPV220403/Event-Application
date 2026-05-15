import express from "express";

import * as adminController from "../controllers/admin.controllers"
import authmiddleware from "../middleware/auth.middleware";

const router = express.Router()

router.get("/unApprovedAdminsList", authmiddleware, adminController.unApprovedAdminsList)
router.get("/unApprovedOrganizerList", authmiddleware, adminController.unApprovedOrganizerList)
router.patch("/eventApproval", authmiddleware, adminController.eventApproval);
router.patch("/organizerAdminApproval",authmiddleware, adminController.organizerAdminApproval)

export default router;