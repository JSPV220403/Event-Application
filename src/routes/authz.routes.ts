import  express from "express";
import authmiddleware from "../middleware/auth.middleware";
import * as authzService from "../services/authz.services"

const router = express.Router()

router.post("/createEvent", authmiddleware, authzService.createEvent)

router.post("/addSchedule", authmiddleware, authzService.addSchedule)

router.post("/cancelSchedule", authmiddleware, authzService.cancelSchedule)

router.post("/cancelEvent", authmiddleware, authzService.cancelEvent)

router.post("/createCategory", authmiddleware, authzService.createCategory)

router.post("/deleteCategory", authmiddleware, authzService.deleteCategory)

export default router;