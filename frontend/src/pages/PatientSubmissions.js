import { useEffect, useState } from "react";
import { getPatientSubmissions, downloadReport } from "../services/apiCalls";
import Navbar from "../components/navbar";

function PatientSubmissions() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPatientSubmissions();
      setSubmissions(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <h2>My Submissions</h2>
      <ul>
        {submissions.map((s) => (
          <li key={s._id}>
            {s.note} - Status: {s.status}
            {s.reportUrl && <button onClick={() => downloadReport(s.reportUrl)}>Download PDF</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PatientSubmissions;
