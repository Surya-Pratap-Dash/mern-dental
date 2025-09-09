import { useState } from "react";
import { uploadSubmission } from "../services/apiCalls";
import Navbar from "../components/navbar";

function UploadForm() {
  const [file, setFile] = useState(null);
  const [note, setNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", "John Doe");
    formData.append("patientId", "P123");
    formData.append("email", "john@example.com");
    formData.append("note", note);
    formData.append("file", file);
    const res = await uploadSubmission(formData);
    alert(res.message);
  };

  return (
    <div>
      <Navbar />
      <h2>Upload Submission</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <textarea placeholder="Note" value={note} onChange={(e) => setNote(e.target.value)} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UploadForm;
