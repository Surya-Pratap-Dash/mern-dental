import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDashboard from "./pages/PatientDashboard";
import UploadForm from "./pages/UploadForm";
import PatientSubmissions from "./pages/PatientSubmissions";
import AdminDashboard from "./pages/AdminDashboard";
import AdminView from "./pages/AdminView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/patient/upload" element={<UploadForm />} />
        <Route path="/patient/submissions" element={<PatientSubmissions />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/view/:id" element={<AdminView />} />
        <Route path="*" element={<Login />} /> {/* fallback */}
      </Routes>
    </Router>
  );
}

export default App;
