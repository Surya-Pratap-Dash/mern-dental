🦷 MERN Dental App

A full-stack MERN application for managing dental patient submissions, image annotations, and PDF report generation.

📌 Features
Mandatory Features

Authentication & Roles

Roles: patient, admin

JWT-based authentication

Routes: /auth/register, /auth/login, /auth/logout

Access control:

Patient: upload & see their submissions, download reports

Admin: list & view all submissions, annotate, generate PDF

Patient Upload Flow

Form fields: Name, Patient ID, Email, Note, Upload Image

Saves image locally

Creates a submission record in MongoDB (status=uploaded)

Admin Review & Annotation

Dashboard: list all submissions

View page: shows original image + annotation canvas (rectangle, circle, arrow, freehand)

Saves annotation (JSON + flattened image)

Updates status → annotated

PDF Report Generation

Generates PDF with patient details, annotated image, notes

Updates status → reported

Patient can download PDF
