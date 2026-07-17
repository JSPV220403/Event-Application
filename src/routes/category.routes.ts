
import express from "express";

const router= express.Router()

import authmiddleware from "../middleware/auth.middleware";
import { apiLimiter } from "../middleware/rateLimitter.middleware";
import * as categoryController from "../controllers/category.controllers"

router.post("/createCategory",authmiddleware,apiLimiter,  categoryController.createCategory)

router.get("/listCateogry", authmiddleware, apiLimiter, categoryController.listCategory)

router.get("/getCategoryById", authmiddleware, apiLimiter, categoryController.getCategoryById)

router.post("/updateCategory", authmiddleware, apiLimiter,categoryController.updateCategory)

router.delete("/deleteCategory",authmiddleware, apiLimiter,categoryController.deleteCategory)

export default router;