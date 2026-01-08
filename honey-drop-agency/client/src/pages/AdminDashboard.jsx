// import { useEffect, useState, useContext, useCallback } from "react";
// import api from "../api";
// import Navbar from "../components/Navbar";
// import AuthContext from "../context/AuthContext";
// import './BookingHistory.css'; 
// import { toast } from "react-toastify"; // Ensure toast is imported

// const AdminDashboard = () => {
//   const { user, loading } = useContext(AuthContext);
//   const [bookings, setBookings] = useState([]);
//   const [fetching, setFetching] = useState(true);

//   const fetchAllBookings = useCallback(async () => {
//     if (!user?.token) return;
    
//     try {
//       setFetching(true);
//       const config = { headers: { Authorization: `Bearer ${user.token}` } };
//       const { data } = await api.get("/api/bookings/admin/all", config);
//       setBookings(data);
//     } catch (error) {
//       console.error("Admin Fetch Error:", error);
//       toast.error("Failed to load bookings");
//     } finally {
//       setFetching(false);
//     }
//   }, [user]);

//   useEffect(() => {
//     if (!loading) {
//       if (user && user.isAdmin) {
//         fetchAllBookings();
//       }
//     }
//   }, [user, loading, fetchAllBookings]);

//   // --- UPDATED DELETE FUNCTION WITH SUCCESS MESSAGE ---
//   const handleDelete = async (id) => {
//     if (window.confirm("Permanently delete this booking?")) {
//       try {
//         const config = { headers: { Authorization: `Bearer ${user.token}` } };
//         await api.delete(`/api/bookings/${id}`, config);
        
//         // 1. Show the success message
//         toast.success("Booking deleted successfully!"); 
        
//         // 2. Refresh the list
//         fetchAllBookings(); 
//       } catch (error) {
//         // 3. Show error message if delete fails
//         console.error("Delete Error:", error);
//         toast.error("Error: Could not delete booking.");
//       }
//     }
//   };

//   if (loading) return <div className="loading-text">Authenticating Admin...</div>;

//   return (
//     <>
//       <Navbar />
//       <div className="container" style={{ marginTop: '2rem' }}>
//         <h2 className="history-title">Admin Management: All User Bookings</h2>
        
//         {fetching ? (
//           <p className="loading-text">Loading History...</p>
//         ) : bookings.length === 0 ? (
//           <div className="no-history">
//             <h3>No bookings found.</h3>
//           </div>
//         ) : (
//           <div className="table-wrapper">
//             <table>
//               <thead>
//                 <tr>
//                   <th>Client</th>
//                   <th>Model / Type</th>
//                   <th>Schedule</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {bookings.map((b) => (
//                   <tr key={b._id}>
//                     <td>
//                       <strong>@{b.user?.instagramHandle?.replace('@', '') || 'Unknown'}</strong><br/>
//                       <small>{b.user?.phoneNumber || 'N/A'}</small>
//                     </td>
//                     <td>
//                       <div className="fw-bold">{b.modelName}</div>
//                       <div style={{ fontSize: '0.8rem', color: '#0047ab' }}>{b.shootType}</div>
//                     </td>
//                     <td>
//                       {b.date} <br/>
//                       <span style={{ fontSize: '0.85rem', color: '#666' }}>{b.time}</span>
//                     </td>
//                     <td>
//                       <button onClick={() => handleDelete(b._id)} className="delete-btn">
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default AdminDashboard;



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

  const fetchAllData = useCallback(async () => {
    if (!user?.token) return;
    try {
      setFetching(true);
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const resBookings = await api.get("/api/bookings/admin/all", config);
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
    if (!loading && user?.isAdmin) {
      fetchAllData();
    }
  }, [user, loading, fetchAllData]);

  const handleDeleteModel = async (id) => {
    if (window.confirm("Permanently remove this model?")) {
      try {
        await api.delete(`/api/models/${id}`);
        toast.success("Model Deleted");
        fetchAllData();
      } catch (err) { toast.error("Delete failed"); }
    }
  };

  // --- HELPER FUNCTION TO RENDER CATEGORY TABLES ---
  const renderCategoryTable = (categoryKey, title) => {
    const filteredModels = models.filter(m => m.category === categoryKey);
    
    if (filteredModels.length === 0) return null; // Don't show the category if it's empty

    return (
      <div className="category-section" style={{ marginBottom: '40px' }}>
        <h3 style={{ color: '#0047ab', borderBottom: '2px solid #0047ab', paddingBottom: '5px', marginBottom: '15px' }}>
            {title} ({filteredModels.length})
        </h3>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Model Name</th>
                <th>Stats</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredModels.map((m) => (
                <tr key={m._id}>
                  <td><strong>{m.name}</strong></td>
                  <td>{m.height} | {m.waist} | {m.hips}</td>
                  <td>
                    <button 
                      onClick={() => navigate(`/admin/edit-model/${m._id}`)} 
                      style={{ backgroundColor: '#0047ab', color: '#fff', border: 'none', padding: '6px 15px', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}
                    >
                      Edit Info
                    </button>
                    <button onClick={() => handleDeleteModel(m._id)} className="delete-btn">
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

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="container" style={{ marginTop: '2rem' }}>
        <h2 className="history-title">Admin Management</h2>

        <div style={{ display: 'flex', gap: '30px', margin: '20px 0', borderBottom: '1px solid #ddd' }}>
            <button onClick={() => setActiveTab("bookings")} style={{ padding: '10px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 'bold', color: activeTab === 'bookings' ? '#0047ab' : '#888', borderBottom: activeTab === 'bookings' ? '3px solid #0047ab' : 'none' }}>Manage Bookings</button>
            <button onClick={() => setActiveTab("models")} style={{ padding: '10px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 'bold', color: activeTab === 'models' ? '#0047ab' : '#888', borderBottom: activeTab === 'models' ? '3px solid #0047ab' : 'none' }}>Manage Models</button>
        </div>

        {fetching ? (
          <p>Loading...</p>
        ) : activeTab === "models" ? (
          <div>
            {/* HERE ARE THE CATEGORIES SORTED */}
            {renderCategoryTable("basic", "BASIC MODELS")}
            {renderCategoryTable("top", "TOP MODELS")}
            {renderCategoryTable("premium", "PREMIUM MODELS")}
            {renderCategoryTable("elite", "ELITE MODELS")}
            
            {models.length === 0 && <p>No models in database yet.</p>}
          </div>
        ) : (
          /* Bookings Table */
          <div className="table-wrapper">
             <table>
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Model</th>
                  <th>Requirements</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id}>
                    <td>@{b.user?.instagramHandle}</td>
                    <td>{b.modelName}</td>
                    <td style={{fontSize: '0.8rem'}}>{b.requirements}</td>
                    <td><button onClick={() => handleDeleteBooking(b._id)} className="delete-btn">Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
