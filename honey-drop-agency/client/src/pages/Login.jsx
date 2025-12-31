import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// Import Icons
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"; 
import { toast } from "react-toastify"; 
import AuthContext from "../context/AuthContext";
import "./Login.css"; 

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Call login from Context
    const result = await login(formData.identifier, formData.password);

    if (result.success) {
      toast.success("Login Successful!"); 

      // --- ADMIN REDIRECTION LOGIC ---
      if (result.user && result.user.isAdmin) {
        // If user is admin, go to Admin Dashboard
        navigate("/admin"); 
      } else {
        // If regular user, go to Home
        navigate("/"); 
      }
    } else {
      toast.error(result.message);
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label>Instagram or Phone</label>
            <div className="input-wrapper">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="identifier"
                placeholder="@username or Number"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="login-form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"} 
                name="password"
                placeholder="******"
                onChange={handleChange}
                required
              />
              <span 
                className="password-toggle-icon" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="login-footer">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;