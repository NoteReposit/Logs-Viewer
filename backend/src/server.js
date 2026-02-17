import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import cors from "cors";

import userRoutes from "./routes/usersRoutes.js";
import logsRoutes from "./routes/logsRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
}));

app.use("/api/users", userRoutes);
app.use("/api/logs", logsRoutes);

app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
});