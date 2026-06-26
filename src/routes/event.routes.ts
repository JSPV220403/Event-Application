import  express from "express";
import authmiddleware from "../middleware/auth.middleware";
import * as eventController from "../controllers/event.controllers"
import { upload } from "../config/multer";
const router = express.Router()

router.post("/createEvent", authmiddleware,upload.single("image"), eventController.createEvent)

router.get("/eventById",authmiddleware,eventController.eventById)

router.post("/updateEvent", authmiddleware, upload.single("image"), eventController.updateEvent)

router.post("/cancelEvent", authmiddleware, eventController.cancelEvent)

router.get("/eventList", authmiddleware, eventController.eventList)

export default router;