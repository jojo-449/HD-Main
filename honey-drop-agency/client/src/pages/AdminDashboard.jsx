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

  const fetchData = useCallback(async () => {
    if (!user?.token) return;
    try {
      setFetching(true);
      const resBookings = await api.get("/api/bookings/admin/all", { headers: { Authorization: `Bearer ${user.token}` } });
      const resModels = await api.get("/api/models");
      setBookings(resBookings.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      setModels(resModels.data);
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setFetching(false);
    }
  }, [user]);

  useEffect(() => { if (!loading && user?.isAdmin) fetchData(); }, [user, loading, fetchData]);

  // --- ONE-TIME SYNC TOOL ---
  const handleSync = async () => {
    if (!window.confirm("This will move your Coded Models (Fehilah, Rolex, etc.) into the database so you can edit them. Continue?")) return;
    
    // This is the list of models currently "stuck" in your code
    const codedModels = [
      { name: "Fehilah", category: "top", height: "5'3\"", size: "UK 6/8", bust: "32\"", waist: "26\"", hips: "39\"", shoe: "39/40", hair: "Ginger", eyes: "Dark Brown", about: "Top-tier model...", images: ["https://via.placeholder.com/400x600?text=Fehilah"] },
      { name: "Rolex", category: "top", height: "5'6\"", size: "12", bust: "40\"", waist: "33\"", hips: "42\"", shoe: "39", hair: "Black", eyes: "Brown", about: "Student and entrepreneur...", images: ["https://via.placeholder.com/400x600?text=Rolex"] },
      { name: "Jessica oba", category: "elite", height: "5'11\"", size: "14", bust: "36\"", waist: "28\"", hips: "40\"", shoe: "40", hair: "Black", eyes: "Brown", about: "Exclusive elite talent...", images: ["https://via.placeholder.com/400x600?text=Jessica"] },
      // Add any other names here you want to sync
    ];

    try {
      for (let m of codedModels) {
        await api.post("/api/models", m, { headers: { Authorization: `Bearer ${user.token}` } });
      }
      toast.success("Sync Complete! All models are now editable.");
      fetchData();
    } catch (err) { toast.error("Sync failed or models already exist."); }
  };

  const deleteModel = async (id) => {
    if (window.confirm("Delete permanently?")) {
      await api.delete(`/api/models/${id}`);
      fetchData();
    }
  };

  const renderTable = (cat, title) => {
    const list = models.filter(m => m.category === cat);
    if (list.length === 0) return null;
    return (
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#0047ab', borderBottom: '2px solid #0047ab' }}>{title}</h3>
        <div className="table-wrapper">
          <table>
            <thead><tr><th>Name</th><th>Stats</th><th>Action</th></tr></thead>
            <tbody>
              {list.map(m => (
                <tr key={m._id}>
                  <td><strong>{m.name}</strong></td>
                  <td>{m.height} | {m.waist}</td>
                  <td>
                    <button onClick={() => navigate(`/admin/edit-model/${m._id}`)} className="edit-btn" style={{backgroundColor: '#0047ab', color:'#fff', border:'none', padding:'5px 10px', marginRight:'10px', borderRadius:'4px'}}>Edit</button>
                    <button onClick={() => deleteModel(m._id)} className="delete-btn">Remove</button>
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
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2 className="history-title">Admin Management</h2>
          <button onClick={handleSync} style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>
            Sync Coded Models to Database
          </button>
        </div>

        <div style={{ display: 'flex', gap: '20px', margin: '20px 0' }}>
            <button onClick={() => setActiveTab("bookings")} style={{ fontWeight: 'bold', borderBottom: activeTab === 'bookings' ? '3px solid #0047ab' : 'none', background:'none', border:'none', cursor:'pointer' }}>Bookings</button>
            <button onClick={() => setActiveTab("models")} style={{ fontWeight: 'bold', borderBottom: activeTab === 'models' ? '3px solid #0047ab' : 'none', background:'none', border:'none', cursor:'pointer' }}>Manage Models</button>
        </div>

        {activeTab === "models" ? (
          <div>
            {renderTable("basic", "BASIC MODELS")}
            {renderTable("top", "TOP MODELS")}
            {renderTable("premium", "PREMIUM MODELS")}
            {renderTable("elite", "ELITE MODELS")}
          </div>
        ) : (
          <p>Manage Bookings here...</p>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
