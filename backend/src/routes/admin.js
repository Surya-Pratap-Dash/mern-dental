import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { protect, adminOnly } from "../middleware/auth.js";
import Submission from "../models/Submission.js";
import { createReportPDF } from "../utils/pdf.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "src/uploads"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// List all submissions
router.get("/submissions", protect, adminOnly, async (req, res) => {
  const subs = await Submission.find().populate("patient", "name email");
  res.json(subs);
});

// Get one submission
router.get("/submissions/:id", protect, adminOnly, async (req, res) => {
  const sub = await Submission.findById(req.params.id);
  res.json(sub);
});

// Save annotation
router.post(
  "/submissions/:id/annotate",
  protect,
  adminOnly,
  upload.single("annotatedImage"),
  async (req, res) => {
    const sub = await Submission.findById(req.params.id);
    sub.annotatedImageUrl = `/uploads/${req.file.filename}`;
    sub.annotationJson = JSON.parse(req.body.annotation);
    sub.status = "annotated";
    await sub.save();
    res.json(sub);
  }
);

// Generate PDF
router.post(
  "/submissions/:id/report",
  protect,
  adminOnly,
  async (req, res) => {
    const sub = await Submission.findById(req.params.id);
    const pdfPath = `src/uploads/report-${Date.now()}.pdf`;
    await createReportPDF(sub, pdfPath);
    sub.reportUrl = `/${pdfPath}`;
    sub.status = "reported";
    await sub.save();
    res.json(sub);
  }
);

export default router;
