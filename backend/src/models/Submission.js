import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,
    patientId: String,
    email: String,
    note: String,
    originalImageUrl: String,
    annotatedImageUrl: String,
    annotationJson: Object,
    reportUrl: String,
    status: {
      type: String,
      enum: ["uploaded", "annotated", "reported"],
      default: "uploaded",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Submission", submissionSchema);
