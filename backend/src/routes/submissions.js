import express from "express";
import multer from "multer";
import Submission from "../models/Submission.js";
import { protect } from "../middleware/auth.js";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "src/uploads"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// Patient uploads
router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    const { name, patientId, email, note } = req.body;
    const submission = await Submission.create({
      patient: req.user._id,
      name,
      patientId,
      email,
      note,
      originalImageUrl: `/uploads/${req.file.filename}`,
    });
    res.json(submission);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// Patient sees own submissions
router.get("/", protect, async (req, res) => {
  const submissions = await Submission.find({ patient: req.user._id });
  res.json(submissions);
});

export default router;
