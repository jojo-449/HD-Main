import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    // If not logged in, redirect to Login
    return <Navigate to="/login" />;
  }

  // If logged in, show the page
  return children;
};

export default ProtectedRoute;