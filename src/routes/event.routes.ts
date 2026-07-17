import  express from "express";
import authmiddleware from "../middleware/auth.middleware";
import * as eventController from "../controllers/event.controllers"
import { upload } from "../config/multer";
import { apiLimiter } from "../middleware/rateLimitter.middleware";

const router = express.Router()

router.post("/createEvent", apiLimiter,authmiddleware,upload.single("image"), eventController.createEvent)

router.get("/eventById",apiLimiter,authmiddleware,eventController.eventById)

router.post("/updateEvent",apiLimiter, authmiddleware, upload.single("image"), eventController.updateEvent)

router.post("/cancelEvent",apiLimiter, authmiddleware, eventController.cancelEvent)

router.get("/eventList", apiLimiter, authmiddleware, eventController.eventList)

export default router;