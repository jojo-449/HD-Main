import { useState, useContext } from "react";
import api from "../api";
import AuthContext from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import "./AdminForm.css";

const AddModel = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "basic",
    about: "",
    height: "",
    size: "",
    bust: "",
    waist: "",
    hips: "",
    shoe: "",
    hair: "",
    eyes: ""
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // In a real app, you'd use FormData for images. 
    // For now, this sends the text data to your server.
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await api.post("/api/models", formData, config);
      toast.success("Model added to " + formData.category + " category!");
      // Reset form
    } catch (error) {
      toast.error("Failed to add model");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container" style={{ maxWidth: '800px', padding: '20px' }}>
        <h2 className="history-title">Register New Model</h2>
        <form onSubmit={handleSubmit} className="booking-form">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            
            {/* Left Side: General Info */}
            <div>
              <label>Model Full Name</label>
              <input type="text" name="name" onChange={handleChange} required />

              <label>Category</label>
              <select name="category" onChange={handleChange}>
                <option value="basic">Basic Model</option>
                <option value="top">Top Model</option>
                <option value="premium">Premium Model</option>
                <option value="elite">Elite Model</option>
              </select>

              <label>About Model</label>
              <textarea name="about" rows="5" onChange={handleChange} placeholder="Describe the model..."></textarea>
            </div>

            {/* Right Side: Statistics */}
            <div>
              <label>Statistics</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
                <input type="text" name="height" placeholder="Height (e.g. 5'11)" onChange={handleChange} />
                <input type="text" name="size" placeholder="Size" onChange={handleChange} />
                <input type="text" name="bust" placeholder="Bust" onChange={handleChange} />
                <input type="text" name="waist" placeholder="Waist" onChange={handleChange} />
                <input type="text" name="hips" placeholder="Hips" onChange={handleChange} />
                <input type="text" name="shoe" placeholder="Shoe" onChange={handleChange} />
                <input type="text" name="hair" placeholder="Hair Color" onChange={handleChange} />
                <input type="text" name="eyes" placeholder="Eye Color" onChange={handleChange} />
              </div>

              <label style={{ marginTop: '15px' }}>Upload 4 Pictures</label>
              <input type="file" multiple accept="image/*" />
              <small>Max 4 images allowed</small>
            </div>
          </div>

          <button type="submit" className="login-btn" style={{ marginTop: '20px' }} disabled={loading}>
            {loading ? "Saving..." : "Add Model to Website"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddModel;