import { useEffect, useState } from "react";
import { getAllSubmissions } from "../services/apiCalls";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";

function AdminDashboard() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllSubmissions();
      setSubmissions(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Admin Dashboard</h1>
      <ul>
        {submissions.map((s) => (
          <li key={s._id}>
            {s.name} - {s.patientId} - Status: {s.status} 
            <Link to={`/admin/view/${s._id}`}>View</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
