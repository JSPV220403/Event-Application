import express from "express";

import * as adminController from "../controllers/admin.controllers"
import authmiddleware from "../middleware/auth.middleware";

const router = express.Router()

router.get("/organizersAdminsList", authmiddleware, adminController.organizersAdminsList)

//evnt approval
router.patch("/approval", authmiddleware, adminController.approval);


router.patch("/organizerAdminApproval",authmiddleware, adminController.organizerAdminApproval)

export default router;