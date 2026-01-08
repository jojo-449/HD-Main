// import { useState, useEffect, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api";
// import AuthContext from "../context/AuthContext";
// import Navbar from "../components/Navbar";
// import { toast } from "react-toastify";
// import "./AdminForm.css";

// const EditModel = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "", category: "basic", about: "", height: "",
//     size: "", bust: "", waist: "", hips: "", shoe: "", hair: "", eyes: ""
//   });

//   // Fetch the model's current data when the page loads
//   useEffect(() => {
//     const fetchModel = async () => {
//       try {
//         const { data } = await api.get(`/api/models/single/${id}`);
//         setFormData(data);
//       } catch (error) {
//         toast.error("Could not load model data");
//       }
//     };
//     fetchModel();
//   }, [id]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const config = { headers: { Authorization: `Bearer ${user.token}` } };
//       await api.put(`/api/models/${id}`, formData, config);
//       toast.success("Model updated successfully!");
//       navigate("/admin"); // Go back to dashboard after saving
//     } catch (error) {
//       toast.error("Update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="container" style={{ maxWidth: '800px', padding: '20px' }}>
//         <h2 className="history-title">Edit Model: {formData.name}</h2>
//         <form onSubmit={handleSubmit} className="booking-form">
//           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
//             <div>
//               <label>Model Full Name</label>
//               <input type="text" name="name" value={formData.name} onChange={handleChange} required />
//               <label>Category</label>
//               <select name="category" value={formData.category} onChange={handleChange}>
//                 <option value="basic">Basic Model</option>
//                 <option value="top">Top Model</option>
//                 <option value="premium">Premium Model</option>
//                 <option value="elite">Elite Model</option>
//               </select>
//               <label>About Model</label>
//               <textarea name="about" rows="5" value={formData.about} onChange={handleChange}></textarea>
//             </div>
//             <div>
//               <label>Statistics</label>
//               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
//                 <input type="text" name="height" value={formData.height} placeholder="Height" onChange={handleChange} />
//                 <input type="text" name="size" value={formData.size} placeholder="Size" onChange={handleChange} />
//                 <input type="text" name="bust" value={formData.bust} placeholder="Bust" onChange={handleChange} />
//                 <input type="text" name="waist" value={formData.waist} placeholder="Waist" onChange={handleChange} />
//                 <input type="text" name="hips" value={formData.hips} placeholder="Hips" onChange={handleChange} />
//                 <input type="text" name="shoe" value={formData.shoe} placeholder="Shoe" onChange={handleChange} />
//                 <input type="text" name="hair" value={formData.hair} placeholder="Hair" onChange={handleChange} />
//                 <input type="text" name="eyes" value={formData.eyes} placeholder="Eyes" onChange={handleChange} />
//               </div>
//             </div>
//           </div>
//           <button type="submit" className="login-btn" disabled={loading}>
//             {loading ? "Saving Changes..." : "Update Model Info"}
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default EditModel;



import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import AuthContext from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import "./AdminForm.css";

const EditModel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "", category: "basic", about: "", height: "",
    size: "", bust: "", waist: "", hips: "", shoe: "", hair: "", eyes: ""
  });

  useEffect(() => {
    const fetchModel = async () => {
      try {
        // FIXED: Using backticks and removed '/single/' to match backend
        const { data } = await api.get(`/api/models/${id}`);
        setFormData(data);
      } catch (error) {
        console.error("Fetch Error:", error);
        toast.error("Could not load model data");
      }
    };
    if (id) fetchModel();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      // FIXED: Using backticks
      await api.put(`/api/models/${id}`, formData, config);
      toast.success("Model updated successfully!");
      navigate("/admin"); 
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="admin-container">
        <h2 className="form-title">Edit Model: {formData.name || "Loading..."}</h2>
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-grid">
            <div className="form-left">
              <label>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              
              <label>Category</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="basic">Basic Model</option>
                <option value="top">Top Model</option>
                <option value="premium">Premium Model</option>
                <option value="elite">Elite Model</option>
              </select>

              <label>Bio / About</label>
              <textarea name="about" value={formData.about} onChange={handleChange} rows="6"></textarea>
            </div>
            
            <div className="form-right">
              <label>Stats</label>
              <div className="stats-grid">
                <input type="text" name="height" value={formData.height} placeholder="Height" onChange={handleChange} />
                <input type="text" name="size" value={formData.size} placeholder="Size" onChange={handleChange} />
                <input type="text" name="bust" value={formData.bust} placeholder="Bust" onChange={handleChange} />
                <input type="text" name="waist" value={formData.waist} placeholder="Waist" onChange={handleChange} />
                <input type="text" name="hips" value={formData.hips} placeholder="Hips" onChange={handleChange} />
                <input type="text" name="shoe" value={formData.shoe} placeholder="Shoe" onChange={handleChange} />
                <input type="text" name="hair" value={formData.hair} placeholder="Hair" onChange={handleChange} />
                <input type="text" name="eyes" value={formData.eyes} placeholder="Eyes" onChange={handleChange} />
              </div>
            </div>
          </div>
          <button type="submit" className="submit-admin-btn" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditModel;
