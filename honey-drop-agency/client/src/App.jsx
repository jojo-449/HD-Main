import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Models from "./pages/Models";
import BookingHistory from "./pages/BookingHistory";
import Terms from "./pages/Terms";
import ModelEnquiry from "./pages/ModelEnquiry";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <ToastContainer position="top-center" autoClose={3000} />
        
        <div className="content-wrap">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* User Protected Routes */}
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/models" element={<ProtectedRoute><Models /></ProtectedRoute>} />
            <Route path="/booking-history" element={<ProtectedRoute><BookingHistory /></ProtectedRoute>} />
            <Route path="/terms" element={<ProtectedRoute><Terms /></ProtectedRoute>} />
            <Route path="/model-enquiry" element={<ProtectedRoute><ModelEnquiry /></ProtectedRoute>} />

            {/* Admin ONLY Protected Route */}
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          </Routes>
        </div>

        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;