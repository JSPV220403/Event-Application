
import express from "express";

const router= express.Router()

import authmiddleware from "../middleware/auth.middleware";

import * as categoryController from "../controllers/category.controllers"

router.post("/createCategory", authmiddleware, categoryController.createCategory)

router.get("/listCateogry", authmiddleware, categoryController.listCategory)

router.post("/updateCategory", authmiddleware, categoryController.updateCategory)

router.delete("/deleteCategory", authmiddleware, categoryController.deleteCategory)

export default router;