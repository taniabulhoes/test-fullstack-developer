import express from "express";
import { userController } from "../controllers/users.controllers.js";

const router = express.Router()

router.get("/", userController.getAllUsers)
router.get("/:id", userController.getUserById)
router.post("/", userController.createUser)
router.put("/:id", userController.updateUserById)
router.delete("/:id", userController.deleteUserById)



export default router