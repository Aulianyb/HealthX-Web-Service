// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import AboutUsPage from "./pages/AboutUs/AboutUsPage";
import LoginPage from "./pages/Login/LoginPage";
import PatientRegistrationPage from "./pages/PatientRegistration/PatientRegistrationPage";
import DataStaffPage from "./pages/AdminPage/DataStaffPage/DataStaffPage";
import DataRuanganPage from "./pages/AdminPage/DataRuanganPage/DataRuanganPage";
import DataPasienPage from "./pages/AdminPage/DataPasienPage/DataPasienPage";
import DataLayananPage from "./pages/AdminPage/DataLayananPage/DataLayananPage";
import RegistrationPage from "./pages/UserRegistration/UserRegistrationPage";
import APITesting from "./pages/Testing/APITesting";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage"; // Import the ResetPasswordPage
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/register-patient" element={<PatientRegistrationPage />} />
        <Route path="/admin/data-staff" element={<DataStaffPage />} />
        <Route path="/admin/data-ruangan" element={<DataRuanganPage />} />
        <Route path="/admin/data-pasien" element={<DataPasienPage />} />
        <Route path="/admin/data-layanan" element={<DataLayananPage />} />
        {/* Add ResetPasswordPage route */}
        <Route path="/reset-password" element={<ResetPasswordPage />} />{" "}
      </Routes>
    </Router>
  </React.StrictMode>
);
