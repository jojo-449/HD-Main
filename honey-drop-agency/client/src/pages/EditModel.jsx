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
  const [fetching, setFetching] = useState(true);

  const [formData, setFormData] = useState({
    name: "", category: "basic", about: "", height: "",
    size: "", bust: "", waist: "", hips: "",
    shoe: "", hair: "", eyes: "",
  });

  const [existingImages, setExistingImages] = useState([]); // URLs from Database
  const [newFiles, setNewFiles] = useState([]); // Actual File objects
  const [previews, setPreviews] = useState([]); // UI Previews for new files

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const { data } = await api.get(`/api/models/${id}`);
        setFormData({
          name: data.name || "",
          category: data.category || "basic",
          about: data.about || "",
          height: data.height || "",
          size: data.size || "",
          bust: data.bust || "",
          waist: data.waist || "",
          hips: data.hips || "",
          shoe: data.shoe || "",
          hair: data.hair || "",
          eyes: data.eyes || "",
        });
        setExistingImages(data.images || []);
        setFetching(false);
      } catch (error) {
        toast.error("Could not load model data");
        setFetching(false);
      }
    };
    if (id) fetchModel();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewFiles([...newFiles, ...files]);
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews([...previews, ...previewUrls]);
  };

  // --- REMOVE IMAGE LOGIC ---
  const removeExistingImage = (url) => {
    setExistingImages(existingImages.filter((img) => img !== url));
  };

  const removeNewPreview = (index) => {
    const updatedFiles = [...newFiles];
    const updatedPreviews = [...previews];
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setNewFiles(updatedFiles);
    setPreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));

    // Send the list of existing images we want to KEEP
    existingImages.forEach(img => data.append("existingImages", img));

    // Add new files
    newFiles.forEach((file) => data.append("images", file));

    try {
      await api.put(`/api/models/${id}`, data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Model updated successfully!");
      navigate("/admin");
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="admin-container">Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="admin-container">
        <h2 className="form-title">Edit Model: {formData.name}</h2>
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-grid">
            <div className="form-left">
              <label>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              
              <label>Category</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="basic">Basic</option>
                <option value="top">Top</option>
                <option value="premium">Premium</option>
                <option value="elite">Elite</option>
              </select>

              <label>About</label>
              <textarea name="about" value={formData.about} onChange={handleChange} rows="4"></textarea>

              <label style={{marginTop: '20px'}}>Current Portfolio (Click X to remove)</label>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: '20px' }}>
                {existingImages.map((img, idx) => (
                  <div key={idx} style={{position: 'relative'}}>
                    <img src={img} alt="current" style={{ width: "80px", height: "100px", objectFit: "cover", borderRadius: '5px' }} />
                    <button type="button" onClick={() => removeExistingImage(img)} style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', fontSize: '12px' }}>&times;</button>
                  </div>
                ))}
              </div>

              <label>Add New Photos</label>
              <input type="file" multiple onChange={handleImageChange} accept="image/*" />
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: '10px' }}>
                {previews.map((img, idx) => (
                  <div key={idx} style={{position: 'relative'}}>
                    <img src={img} alt="new-preview" style={{ width: "80px", height: "100px", objectFit: "cover", borderRadius: '5px', border: '2px solid green' }} />
                    <button type="button" onClick={() => removeNewPreview(idx)} style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'black', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', fontSize: '12px' }}>&times;</button>
                  </div>
                ))}
              </div>
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
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditModel;