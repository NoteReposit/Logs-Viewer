import express from "express";
import { getUserAll, createUser } from "../controllers/usersController.js";

const router = express.Router();

router.get("/", getUserAll);
router.post("/", createUser);

export default router;