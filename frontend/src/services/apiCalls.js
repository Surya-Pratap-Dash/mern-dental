import api from "./api";

// ===================== Auth =====================

// Register a patient
export const registerPatient = async (data) => {
  // data = { name, email, password, patientId }
  const res = await api.post("/auth/register", data);
  return res.data;
};

// Login (patient or admin)
export const loginUser = async (data) => {
  // data = { email, password }
  const res = await api.post("/auth/login", data);
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }
  return res.data;
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem("token");
};

// ===================== Patient =====================

// Upload a submission (with image)
export const uploadSubmission = async (formData) => {
  // formData = FormData object { name, patientId, email, note, file }
  const res = await api.post("/patient/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Get all submissions of the logged-in patient
export const getPatientSubmissions = async () => {
  const res = await api.get("/patient/submissions");
  return res.data;
};

// Download PDF report
export const downloadReport = async (reportUrl) => {
  const res = await api.get(reportUrl, { responseType: "blob" });
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "report.pdf");
  document.body.appendChild(link);
  link.click();
  link.remove();
};

// ===================== Admin =====================

// Get all submissions (admin)
export const getAllSubmissions = async () => {
  const res = await api.get("/admin/submissions");
  return res.data;
};

// Get one submission by ID (admin view)
export const getSubmissionById = async (id) => {
  const res = await api.get(`/admin/submission/${id}`);
  return res.data;
};

// Save annotation (admin)
export const saveAnnotation = async (id, annotationData) => {
  // annotationData = { annotationJson, annotatedImageUrl }
  const res = await api.put(`/admin/annotate/${id}`, annotationData);
  return res.data;
};

// Generate PDF report (admin)
export const generatePDF = async (id) => {
  const res = await api.post(`/admin/generate-pdf/${id}`);
  return res.data;
};
