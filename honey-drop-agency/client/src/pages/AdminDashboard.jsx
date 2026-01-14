import { useEffect, useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Navbar from "../components/Navbar";
import AuthContext from "../context/AuthContext";
import './BookingHistory.css'; 
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("bookings"); 
  const [models, setModels] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [fetching, setFetching] = useState(true);

  const fetchData = useCallback(async () => {
    if (!user?.token) return;
    try {
      setFetching(true);
      const resBookings = await api.get("/api/bookings/admin/all", { 
        headers: { Authorization: `Bearer ${user.token}` } 
      });
      const resModels = await api.get("/api/models");
      
      setBookings(resBookings.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      setModels(resModels.data);
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setFetching(false);
    }
  }, [user]);

  useEffect(() => { 
    if (!loading && user?.isAdmin) fetchData(); 
  }, [user, loading, fetchData]);

  const deleteModel = async (id) => {
    if (window.confirm("Delete permanently? This cannot be undone.")) {
      try {
        await api.delete(`/api/models/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        toast.success("Model removed");
        fetchData();
      } catch (err) {
        toast.error("Delete failed");
      }
    }
  };

  const renderTable = (cat, title) => {
    const list = models.filter(m => m.category === cat);
    if (list.length === 0) return null;
    return (
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#0047ab', borderBottom: '2px solid #0047ab', paddingBottom: '5px' }}>{title}</h3>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Stats (H/W)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {list.map(m => (
                <tr key={m._id}>
                  <td><strong>{m.name}</strong></td>
                  <td>{m.height || 'N/A'} | {m.waist || 'N/A'}</td>
                  <td>
                    <button 
                      onClick={() => navigate(`/admin/edit-model/${m._id}`)} 
                      className="edit-btn" 
                      style={{backgroundColor: '#0047ab', color:'#fff', border:'none', padding:'5px 12px', marginRight:'10px', borderRadius:'4px', cursor: 'pointer'}}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => deleteModel(m._id)} 
                      className="delete-btn"
                      style={{backgroundColor: '#dc3545', color:'#fff', border:'none', padding:'5px 12px', borderRadius:'4px', cursor: 'pointer'}}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container" style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="history-title">Admin Management</h2>
          <button 
            onClick={() => navigate('/admin/add-model')} 
            style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            + Add New Model
          </button>
        </div>

        <div style={{ display: 'flex', gap: '20px', margin: '20px 0' }}>
            <button 
              onClick={() => setActiveTab("bookings")} 
              style={{ fontSize: '1.1rem', fontWeight: 'bold', borderBottom: activeTab === 'bookings' ? '3px solid #0047ab' : 'none', background:'none', border:'none', cursor:'pointer', padding: '10px' }}
            >
              Bookings
            </button>
            <button 
              onClick={() => setActiveTab("models")} 
              style={{ fontSize: '1.1rem', fontWeight: 'bold', borderBottom: activeTab === 'models' ? '3px solid #0047ab' : 'none', background:'none', border:'none', cursor:'pointer', padding: '10px' }}
            >
              Manage Models
            </button>
        </div>

        {fetching ? (
          <p>Loading data...</p>
        ) : activeTab === "models" ? (
          <div>
            {renderTable("basic", "BASIC MODELS")}
            {renderTable("top", "TOP MODELS")}
            {renderTable("premium", "PREMIUM MODELS")}
            {renderTable("elite", "ELITE MODELS")}
            {models.length === 0 && <p>No models found in database.</p>}
          </div>
        ) : (
          <div className="bookings-section">
            {/* Logic to map through bookings goes here */}
            {bookings.length > 0 ? (
               <p>Displaying {bookings.length} recent bookings...</p>
            ) : (
               <p>No bookings found.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;