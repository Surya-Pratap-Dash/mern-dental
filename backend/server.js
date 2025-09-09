import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

import authRoutes from "./src/routes/auth.js";
import submissionRoutes from "./src/routes/submissions.js";
import adminRoutes from "./src/routes/admin.js";
import connectDB from "./src/config/db.js";

dotenv.config();
const app = express();

connectDB();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json());
app.use(bodyParser.json());
app.use("/uploads", express.static("src/uploads"));

app.use("/auth", authRoutes);
app.use("/submissions", submissionRoutes);
app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
