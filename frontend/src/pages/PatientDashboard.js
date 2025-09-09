import { Link } from "react-router-dom";
import Navbar from "../components/navbar";

function PatientDashboard() {
  return (
    <div>
      <Navbar />
      <h1>Patient Dashboard</h1>
      <Link to="/patient/upload">Upload Submission</Link><br />
      <Link to="/patient/submissions">My Submissions</Link>
    </div>
  );
}

export default PatientDashboard;
