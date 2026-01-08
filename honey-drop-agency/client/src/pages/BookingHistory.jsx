// import { useEffect, useState, useContext, useCallback } from "react";
// import api from "../api"; 
// import Navbar from "../components/Navbar";
// import AuthContext from "../context/AuthContext";
// import './BookingHistory.css';

// const BookingHistory = () => {
//   const { user, loading } = useContext(AuthContext);
//   const [bookings, setBookings] = useState([]);
//   const [fetching, setFetching] = useState(true);

//   const fetchMyBookings = useCallback(async () => {
//     if (!user?.token) return;
//     try {
//       setFetching(true);
//       const config = { headers: { Authorization: `Bearer ${user.token}` } };
//       const { data } = await api.get("/api/bookings", config);
//       setBookings(data);
//     } catch (error) {
//       console.error("Error fetching bookings", error);
//     } finally {
//       setFetching(false);
//     }
//   }, [user]);

//   useEffect(() => {
//     if (!loading && user) {
//       fetchMyBookings();
//     }
//   }, [user, loading, fetchMyBookings]);

//   const formatBookedDate = (isoString) => {
//     const date = new Date(isoString);
//     return date.toLocaleString('en-US', { 
//       month: 'short', day: 'numeric', year: 'numeric', 
//       hour: '2-digit', minute: '2-digit' 
//     });
//   };

//   if (loading) return <div className="loading-text">Loading session...</div>;

//   return (
//     <>
//       <Navbar />
//       <div className="container">
//         <h2 className="history-title">My Booking History</h2>
//         {fetching ? (
//           <p className="loading-text">Loading your history...</p>
//         ) : bookings.length === 0 ? (
//             <div className="no-history">
//               <h3>No previous bookings found.</h3>
//               <p>Go to the Models page to make your first booking!</p>
//             </div>
//         ) : (
//             <div className="table-wrapper">
//               <table>
//                 <thead>
//                     <tr>
//                       <th>Booked On</th>
//                       <th>Model</th>
//                       <th>Shoot Date</th>
//                       <th style={{ width: '40%' }}>Requirements & Notes</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {bookings.map((booking) => (
//                     <tr key={booking._id}>
//                         <td>{formatBookedDate(booking.createdAt)}</td>
//                         <td>
//                           <div className="fw-bold">{booking.modelName}</div>
//                           <div style={{ fontSize: '0.8rem', color: '#0047ab' }}>{booking.shootType}</div>
//                         </td>
//                         <td>{booking.date}<br/>{booking.time}</td>
//                         <td style={{ whiteSpace: 'pre-wrap', fontSize: '0.9rem' }}>
//                           {booking.requirements || "No details provided"}
//                         </td>
//                     </tr>
//                     ))}
//                 </tbody>
//               </table>
//             </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default BookingHistory;










import { useEffect, useState, useContext, useCallback } from "react";
import api from "../api"; 
import Navbar from "../components/Navbar";
import AuthContext from "../context/AuthContext";
import './BookingHistory.css';

const BookingHistory = () => {
  const { user, loading } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [fetching, setFetching] = useState(true);

  const fetchMyBookings = useCallback(async () => {
    if (!user?.token) return;
    try {
      setFetching(true);
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await api.get("/api/bookings", config);
      
      // SORTING LOGIC: Newest first (New to Old)
      const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setBookings(sortedData);

    } catch (error) {
      console.error("Error fetching bookings", error);
    } finally {
      setFetching(false);
    }
  }, [user]);

  useEffect(() => {
    if (!loading && user) {
      fetchMyBookings();
    }
  }, [user, loading, fetchMyBookings]);

  const formatBookedDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', { 
      month: 'short', day: 'numeric', year: 'numeric', 
      hour: '2-digit', minute: '2-digit' 
    });
  };

  if (loading) return <div className="loading-text">Loading session...</div>;

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="history-title">My Booking History</h2>
        {fetching ? (
          <p className="loading-text">Loading your history...</p>
        ) : bookings.length === 0 ? (
            <div className="no-history">
              <h3>No previous bookings found.</h3>
              <p>Go to the Models page to make your first booking!</p>
            </div>
        ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                    <tr>
                      <th>Booked On</th>
                      <th>Model</th>
                      <th>Shoot Date</th>
                      <th style={{ width: '40%' }}>Requirements & Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                    <tr key={booking._id}>
                        <td>{formatBookedDate(booking.createdAt)}</td>
                        <td>
                          <div className="fw-bold">{booking.modelName}</div>
                          <div style={{ fontSize: '0.8rem', color: '#0047ab' }}>{booking.shootType}</div>
                        </td>
                        <td>{booking.date}<br/>{booking.time}</td>
                        <td style={{ whiteSpace: 'pre-wrap', fontSize: '0.9rem' }}>
                          {booking.requirements || "No details provided"}
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

export default BookingHistory;