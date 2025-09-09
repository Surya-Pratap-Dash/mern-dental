import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getSubmissionById, saveAnnotation, generatePDF } from "../services/apiCalls";
import { fabric } from "fabric";

import Navbar from "../components/navbar";

function AdminView() {
  const { id } = useParams();
  const [submission, setSubmission] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const fetchSubmission = async () => {
      const data = await getSubmissionById(id);
      setSubmission(data);

      const canvas = new fabric.Canvas("canvas", { width: 600, height: 400 });
      fabric.Image.fromURL(data.fileUrl, function(img) {
        canvas.add(img);
        canvas.sendToBack(img);
      });
      canvasRef.current = canvas;
    };
    fetchSubmission();
  }, [id]);

  const handleSave = async () => {
    const annotationJson = JSON.stringify(canvasRef.current.toJSON());
    const annotatedImageUrl = canvasRef.current.toDataURL();
    await saveAnnotation(id, { annotationJson, annotatedImageUrl });
    alert("Annotation saved!");
  };

  const handleGeneratePDF = async () => {
    await generatePDF(id);
    alert("PDF Generated!");
  };

  if (!submission) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <h2>Annotate Submission</h2>
      <canvas id="canvas" />
      <button onClick={handleSave}>Save Annotation</button>
      <button onClick={handleGeneratePDF}>Generate PDF</button>
    </div>
  );
}

export default AdminView;
