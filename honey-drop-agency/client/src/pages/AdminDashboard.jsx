import { useEffect, useState, useContext, useCallback } from "react";
import api from "../api";
import Navbar from "../components/Navbar";
import AuthContext from "../context/AuthContext";
import './BookingHistory.css'; 
import { toast } from "react-toastify"; // Ensure toast is imported

const AdminDashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [fetching, setFetching] = useState(true);

  const fetchAllBookings = useCallback(async () => {
    if (!user?.token) return;
    
    try {
      setFetching(true);
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await api.get("/api/bookings/admin/all", config);
      setBookings(data);
    } catch (error) {
      console.error("Admin Fetch Error:", error);
      toast.error("Failed to load bookings");
    } finally {
      setFetching(false);
    }
  }, [user]);

  useEffect(() => {
    if (!loading) {
      if (user && user.isAdmin) {
        fetchAllBookings();
      }
    }
  }, [user, loading, fetchAllBookings]);

  // --- UPDATED DELETE FUNCTION WITH SUCCESS MESSAGE ---
  const handleDelete = async (id) => {
    if (window.confirm("Permanently delete this booking?")) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await api.delete(`/api/bookings/${id}`, config);
        
        // 1. Show the success message
        toast.success("Booking deleted successfully!"); 
        
        // 2. Refresh the list
        fetchAllBookings(); 
      } catch (error) {
        // 3. Show error message if delete fails
        console.error("Delete Error:", error);
        toast.error("Error: Could not delete booking.");
      }
    }
  };

  if (loading) return <div className="loading-text">Authenticating Admin...</div>;

  return (
    <>
      <Navbar />
      <div className="container" style={{ marginTop: '2rem' }}>
        <h2 className="history-title">Admin Management: All User Bookings</h2>
        
        {fetching ? (
          <p className="loading-text">Loading History...</p>
        ) : bookings.length === 0 ? (
          <div className="no-history">
            <h3>No bookings found.</h3>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Model / Type</th>
                  <th>Schedule</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id}>
                    <td>
                      <strong>@{b.user?.instagramHandle?.replace('@', '') || 'Unknown'}</strong><br/>
                      <small>{b.user?.phoneNumber || 'N/A'}</small>
                    </td>
                    <td>
                      <div className="fw-bold">{b.modelName}</div>
                      <div style={{ fontSize: '0.8rem', color: '#0047ab' }}>{b.shootType}</div>
                    </td>
                    <td>
                      {b.date} <br/>
                      <span style={{ fontSize: '0.85rem', color: '#666' }}>{b.time}</span>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(b._id)} className="delete-btn">
                        Delete
                      </button>
                    </td>
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