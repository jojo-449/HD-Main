import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaInstagram, FaPhone, FaLock, FaCheckCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import AuthContext from "../context/AuthContext";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({ 
    instagramHandle: "", 
    phoneNumber: "", 
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // --- STATES FOR TOGGLING ---
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    const result = await register(formData.instagramHandle, formData.phoneNumber, formData.password);
    
    if (result.success) {
      navigate("/");
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Join Honey Drop</h2>
        {error && <p className="error-msg">{error}</p>}

        <form onSubmit={handleSubmit}>
          
          <div className="signup-form-group">
            <label>Instagram Handle</label>
            <div className="input-wrapper">
              <FaInstagram className="input-icon" />
              <input type="text" name="instagramHandle" placeholder="@username" onChange={handleChange} required />
            </div>
          </div>

          <div className="signup-form-group">
            <label>Phone Number</label>
            <div className="input-wrapper">
              <FaPhone className="input-icon" />
              <input type="text" name="phoneNumber" placeholder="+234..." onChange={handleChange} required />
            </div>
          </div>

          {/* Password Field */}
          <div className="signup-form-group">
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

          {/* Confirm Password Field */}
          <div className="signup-form-group">
            <label>Confirm Password</label>
            <div className="input-wrapper">
              <FaCheckCircle className="input-icon" />
              <input 
                type={showConfirm ? "text" : "password"} 
                name="confirmPassword" 
                placeholder="Confirm Password" 
                onChange={handleChange} 
                required 
              />
              <span 
                className="password-toggle-icon" 
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className="signup-footer">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;