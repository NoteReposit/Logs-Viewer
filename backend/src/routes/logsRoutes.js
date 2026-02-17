import express from "express";
import { getLogAll } from "../controllers/logsController.js"; 

const router = express.Router();

router.get("/", getLogAll);

export default router;