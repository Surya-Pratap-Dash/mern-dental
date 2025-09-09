import PDFDocument from "pdfkit";
import fs from "fs";

export const createReportPDF = (submission, filePath) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc.fontSize(20).text("Patient Report", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Name: ${submission.name}`);
    doc.text(`Patient ID: ${submission.patientId}`);
    doc.text(`Email: ${submission.email}`);
    doc.text(`Note: ${submission.note}`);
    doc.text(`Status: ${submission.status}`);
    doc.moveDown();

    if (submission.originalImageUrl)
      doc.text("Original Image:").image("."+submission.originalImageUrl, {
        width: 250,
      });

    if (submission.annotatedImageUrl) {
      doc.addPage();
      doc.text("Annotated Image:").image("."+submission.annotatedImageUrl, {
        width: 250,
      });
    }

    doc.end();
    stream.on("finish", resolve);
    stream.on("error", reject);
  });
};
