// import { useState, useContext, useEffect } from 'react';
// import api from '../api'; 
// import AuthContext from '../context/AuthContext';
// import './BookingModal.css';

// const BookingModal = ({ model, onClose }) => {
//   const { user } = useContext(AuthContext);
//   const [loading, setLoading] = useState(false);
//   const [currentImgIndex, setCurrentImgIndex] = useState(0);
//   const [showCopySuccess, setShowCopySuccess] = useState(false);

//   const images = Array.isArray(model.images) && model.images.length > 0 
//     ? model.images 
//     : [model.imageUrl || 'https://via.placeholder.com/400x600?text=No+Portfolio+Images'];

//   useEffect(() => {
//     if (images.length > 1) {
//       const interval = setInterval(() => {
//         setCurrentImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//       }, 4000);
//       return () => clearInterval(interval);
//     }
//   }, [images, currentImgIndex]);

//   const nextSlide = (e) => {
//     e.stopPropagation();
//     setCurrentImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//   };

//   const prevSlide = (e) => {
//     e.stopPropagation();
//     setCurrentImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//   };

//   const [formData, setFormData] = useState({ date: '', time: '' });
//   const [shootDetails, setShootDetails] = useState({
//     fashion: { selected: false, label: 'Fashion', duration: '5 Hours', specificReq: '' },
//     brand: { selected: false, label: 'Brand', duration: '5 Hours', specificReq: '' },
//     beauty: { selected: false, label: 'Beauty', duration: '5 Hours', specificReq: '' },
//     bridal: { selected: false, label: 'Bridal', duration: '5 Hours', specificReq: '' },
//   });

//   const handleToggleShoot = (key) => {
//     setShootDetails(prev => ({ ...prev, [key]: { ...prev[key], selected: !prev[key].selected } }));
//   };

//   const handleDetailChange = (key, field, value) => {
//     setShootDetails(prev => ({ ...prev, [key]: { ...prev[key], [field]: value } }));
//   };

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const generateBookingData = () => {
//     const selectedKeys = Object.keys(shootDetails).filter(k => shootDetails[k].selected);
//     const clientName = user?.instagramHandle?.replace('@', '') || 'Guest';
//     let plainMessage = `Hi! I'd like to book ${model.name}.\n\n📅 Date: ${formData.date}\n⏰ Time: ${formData.time}\n\n`;
//     let dbRequirements = "";
//     selectedKeys.forEach(key => {
//       const item = shootDetails[key];
//      const showDuration = key === 'fashion' || key === 'brand';
//       const durationText = showDuration ? `   - Duration: ${item.duration}\n` : '';
//       plainMessage += `🎬 ${item.label}:\n${durationText}${item.specificReq ? `   - Note: ${item.specificReq}\n` : ''}\n`;
//       dbRequirements += `• ${item.label}${showDuration ? ` (${item.duration})` : ''}${item.specificReq ? `: ${item.specificReq}` : ''}\n`;
//     });
//     plainMessage += `\nClient: @${clientName}`;
//     return { selectedKeys, plainMessage, dbRequirements, shootSummary: selectedKeys.map(k => shootDetails[k].label).join(', ') };
//   };

//   const handleInstagramBook = async () => {
//     const { selectedKeys, plainMessage, dbRequirements, shootSummary } = generateBookingData();
//     if (selectedKeys.length === 0 || !formData.date || !formData.time) return alert("Fill all details first.");

//     // COPY FIRST (This fixes the link-pasting issue)
//     try {
//       await navigator.clipboard.writeText(plainMessage);
//     } catch (err) {
//       // Fallback copy method
//       const textArea = document.createElement("textarea");
//       textArea.value = plainMessage;
//       document.body.appendChild(textArea);
//       textArea.select();
//       document.execCommand('copy');
//       document.body.removeChild(textArea);
//     }
    
//     setLoading(true);
//     try {
//       if (user?.token) {
//         await api.post('/api/bookings', { 
//           modelName: model.name, 
//           shootType: shootSummary, 
//           date: formData.date, 
//           time: formData.time, 
//           requirements: dbRequirements 
//         }, { headers: { Authorization: `Bearer ${user.token}` } });
//       }
//       setLoading(false);
//       setShowCopySuccess(true); 
//     } catch (err) {
//       setLoading(false);
//       setShowCopySuccess(true);
//     }
//   };

//   const handleWhatsAppBook = async () => {
//     const { selectedKeys, plainMessage, dbRequirements, shootSummary } = generateBookingData();
//     if (selectedKeys.length === 0 || !formData.date || !formData.time) return alert("Fill all details first.");
//     const whatsappUrl = `https://wa.me/2348146518310?text=${encodeURIComponent(plainMessage)}`;
    
//     setLoading(true);
//     try {
//       if (user?.token) {
//         await api.post('/api/bookings', { 
//           modelName: model.name, 
//           shootType: shootSummary, 
//           date: formData.date, 
//           time: formData.time, 
//           requirements: dbRequirements 
//         }, { headers: { Authorization: `Bearer ${user.token}` } });
//       }
//       setLoading(false);
//       onClose();
//       window.location.href = whatsappUrl;
//     } catch (error) {
//       setLoading(false);
//       window.location.href = whatsappUrl;
//     }
//   };

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-container" onClick={e => e.stopPropagation()}>
        
//        {showCopySuccess && (
//           <div className="copy-instruction-overlay">
//             <div className="instruction-card">
//               <h3>✅ Details Copied!</h3>
//               <p>Your booking info is ready to paste.</p>
//               <div className="steps-box">
//                 <p>1. Click <b>"Open Instagram App"</b>.</p>
//                 <p>2. <b>Long-Press</b> in the DM chat.</p>
//                 <p>3. Select <b>"Paste"</b> and send!</p>
//               </div>
//               <button className="btn-continue" onClick={() => window.location.href = 'https://www.instagram.com/_hdmodels?igsh=MTFzZjQxajh2MHE1Yw=='}>
//                 Open Instagram App
//               </button>
//               <button className="btn-cancel-link" style={{marginTop: '10px'}} onClick={() => setShowCopySuccess(false)}>
//                 Go Back
//               </button>
//             </div>
//           </div>
//         )}

//         <button className="close-btn-x" onClick={onClose}>&times;</button>
//         <div className="modal-grid">
          
//           <div className="modal-col-image">
//             <div className="main-image-frame fade-animation">
//               <img src={images[currentImgIndex]} alt={model.name} />
//               {images.length > 1 && (
//                 <>
//                   <button className="slide-arrow prev" onClick={prevSlide}>&#10094;</button>
//                   <button className="slide-arrow next" onClick={nextSlide}>&#10095;</button>
//                 </>
//               )}
//             </div>
//             {images.length > 1 && (
//               <div className="thumbnails-row">
//                 {images.map((img, index) => (
//                   <div key={index} className={`thumb-box ${index === currentImgIndex ? 'active-thumb' : ''}`} onClick={() => setCurrentImgIndex(index)}>
//                     <img src={img} alt="thumb" />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="modal-col-stats">
//             <h2>{model.name}</h2>
//             <div className="model-about-box">
//               <h3>About {model.name}</h3>
//               <p>{model.bio}</p>
//             </div>
//             <div className="stats-table">
//               <div className="stat-row"><span>Height:</span> <strong>{model.height}</strong></div>
//               <div className="stat-row"><span>Size:</span> <strong>{model.size}</strong></div>
//               <div className="stat-row"><span>Bust:</span> <strong>{model.bust}</strong></div>
//               <div className="stat-row"><span>Waist:</span> <strong>{model.waist}</strong></div>
//               <div className="stat-row"><span>Hips:</span> <strong>{model.hips}</strong></div>
//               <div className="stat-row"><span>Shoe:</span> <strong>{model.shoe}</strong></div>
//               {model.skin && <div className="stat-row"><span>Skin:</span> <strong>{model.skin}</strong></div>}
//               <div className="stat-row"><span>Hair:</span> <strong>{model.hair}</strong></div>
//               <div className="stat-row"><span>Eyes:</span> <strong>{model.eyes}</strong></div>
//             </div>
//           </div>

//           <div className="modal-col-form">
//             <h3>BOOK {model.name.toUpperCase()}</h3>
//             <div className="form-scrollable">
//               <p className="select-label">Select Shoot Type(s)</p>
//               {Object.keys(shootDetails).map((key) => {
//                 const item = shootDetails[key];
//                 return (
//                   <div key={key} className={`shoot-card-alt ${item.selected ? 'active-card' : ''}`}>
//                     <label className="checkbox-container-left">
//                       <input type="checkbox" checked={item.selected} onChange={() => handleToggleShoot(key)} />
//                       {item.label}
//                     </label>
//                     {item.selected && (
//                       <div className="card-details-reveal">
//                         <div className="detail-divider"></div>
//                        {/* Change 'key === fashion' to this: */}
// {(key === 'fashion' || key === 'brand') && (
//   <div className="input-group-sub">
//     <label>DURATION:</label>
//     <select value={item.duration} onChange={(e) => handleDetailChange(key, 'duration', e.target.value)}>
//       <option value="5 Hours">5 Hours</option>
//       <option value="Full-Day (9am-5pm)">Full-Day (9am-5pm)</option>
//     </select>
//   </div>
// )}
//                         <input type="text" placeholder="Reqs..." value={item.specificReq} onChange={(e) => handleDetailChange(key, 'specificReq', e.target.value)} className="req-input-alt" />
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
            
//             <div className="datetime-row-alt">
//               <div className="dt-item">
//                 <label>Date</label>
//                 <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
//               </div>
//               <div className="dt-item">
//                 <label>Time</label>
//                 <input type="time" name="time" value={formData.time} onChange={handleInputChange} />
//               </div>
//             </div>

//             <div className="action-btns-alt">
//               <button className="btn-book-wa" onClick={handleWhatsAppBook} disabled={loading}>
//                 {loading ? "Saving..." : "Book via WhatsApp"}
//               </button>
//               {/* Instagram Button now also handles "Saving..." state */}
//               <button className="btn-book-ig" onClick={handleInstagramBook} disabled={loading}>
//                 {loading ? "Saving..." : "Book via Instagram"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingModal;



import { useState, useContext, useEffect } from 'react';
import api from '../api'; 
import AuthContext from '../context/AuthContext';
import './BookingModal.css';

const BookingModal = ({ model, onClose }) => {
  const { user } = useContext(AuthContext);
  
  // SEPARATE LOADING STATES
  const [isInstaLoading, setIsInstaLoading] = useState(false);
  const [isWaLoading, setIsWaLoading] = useState(false);

  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  const images = Array.isArray(model.images) && model.images.length > 0 
    ? model.images 
    : [model.imageUrl || 'https://via.placeholder.com/400x600?text=No+Portfolio+Images'];

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [images, currentImgIndex]);

  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const [formData, setFormData] = useState({ date: '', time: '' });
  const [shootDetails, setShootDetails] = useState({
    fashion: { selected: false, label: 'Fashion', duration: '5 Hours', specificReq: '' },
    brand: { selected: false, label: 'Brand', duration: '5 Hours', specificReq: '' },
    beauty: { selected: false, label: 'Beauty', duration: '5 Hours', specificReq: '' },
    bridal: { selected: false, label: 'Bridal', duration: '5 Hours', specificReq: '' },
  });

  const handleToggleShoot = (key) => {
    setShootDetails(prev => ({ ...prev, [key]: { ...prev[key], selected: !prev[key].selected } }));
  };

  const handleDetailChange = (key, field, value) => {
    setShootDetails(prev => ({ ...prev, [key]: { ...prev[key], [field]: value } }));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateBookingData = () => {
    const selectedKeys = Object.keys(shootDetails).filter(k => shootDetails[k].selected);
    const clientName = user?.instagramHandle?.replace('@', '') || 'Guest';
    let plainMessage = `Hi! I'd like to book ${model.name}.\n\n📅 Date: ${formData.date}\n⏰ Time: ${formData.time}\n\n`;
    let dbRequirements = "";
    selectedKeys.forEach(key => {
      const item = shootDetails[key];
      const showDuration = key === 'fashion' || key === 'brand';
      const durationText = showDuration ? `   - Duration: ${item.duration}\n` : '';
      plainMessage += `🎬 ${item.label}:\n${durationText}${item.specificReq ? `   - Note: ${item.specificReq}\n` : ''}\n`;
      dbRequirements += `• ${item.label}${showDuration ? ` (${item.duration})` : ''}${item.specificReq ? `: ${item.specificReq}` : ''}\n`;
    });
    plainMessage += `\nClient: @${clientName}`;
    return { selectedKeys, plainMessage, dbRequirements, shootSummary: selectedKeys.map(k => shootDetails[k].label).join(', ') };
  };

  const handleInstagramBook = async () => {
    const { selectedKeys, plainMessage, dbRequirements, shootSummary } = generateBookingData();
    if (selectedKeys.length === 0 || !formData.date || !formData.time) return alert("Fill all details first.");

    try {
      await navigator.clipboard.writeText(plainMessage);
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = plainMessage;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
    
    setIsInstaLoading(true); // START INSTA LOADING
    try {
      if (user?.token) {
        await api.post('/api/bookings', { 
          modelName: model.name, 
          shootType: shootSummary, 
          date: formData.date, 
          time: formData.time, 
          requirements: dbRequirements 
        }, { headers: { Authorization: `Bearer ${user.token}` } });
      }
      setIsInstaLoading(false);
      setShowCopySuccess(true); 
    } catch (err) {
      setIsInstaLoading(false);
      setShowCopySuccess(true);
    }
  };

  const handleWhatsAppBook = async () => {
    const { selectedKeys, plainMessage, dbRequirements, shootSummary } = generateBookingData();
    if (selectedKeys.length === 0 || !formData.date || !formData.time) return alert("Fill all details first.");
    const whatsappUrl = `https://wa.me/2348146518310?text=${encodeURIComponent(plainMessage)}`;
    
    setIsWaLoading(true); // START WHATSAPP LOADING
    try {
      if (user?.token) {
        await api.post('/api/bookings', { 
          modelName: model.name, 
          shootType: shootSummary, 
          date: formData.date, 
          time: formData.time, 
          requirements: dbRequirements 
        }, { headers: { Authorization: `Bearer ${user.token}` } });
      }
      setIsWaLoading(false);
      onClose();
      window.location.href = whatsappUrl;
    } catch (error) {
      setIsWaLoading(false);
      window.location.href = whatsappUrl;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        
       {showCopySuccess && (
          <div className="copy-instruction-overlay">
            <div className="instruction-card">
              <h3>✅ Details Copied!</h3>
              <p>Your booking info is ready to paste.</p>
              <div className="steps-box">
                <p>1. Click <b>"Open Instagram App"</b>.</p>
                <p>2. <b>Long-Press</b> in the DM chat.</p>
                <p>3. Select <b>"Paste"</b> and send!</p>
              </div>
              <button className="btn-continue" onClick={() => window.location.href = 'https://www.instagram.com/_hdmodels?igsh=MTFzZjQxajh2MHE1Yw=='}>
                Open Instagram App
              </button>
              <button className="btn-cancel-link" style={{marginTop: '10px'}} onClick={() => setShowCopySuccess(false)}>
                Go Back
              </button>
            </div>
          </div>
        )}

        <button className="close-btn-x" onClick={onClose}>&times;</button>
        <div className="modal-grid">
          
          <div className="modal-col-image">
            <div className="main-image-frame fade-animation">
              <img src={images[currentImgIndex]} alt={model.name} />
              {images.length > 1 && (
                <>
                  <button className="slide-arrow prev" onClick={prevSlide}>&#10094;</button>
                  <button className="slide-arrow next" onClick={nextSlide}>&#10095;</button>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="thumbnails-row">
                {images.map((img, index) => (
                  <div key={index} className={`thumb-box ${index === currentImgIndex ? 'active-thumb' : ''}`} onClick={() => setCurrentImgIndex(index)}>
                    <img src={img} alt="thumb" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="modal-col-stats">
            <h2>{model.name}</h2>
            <div className="model-about-box">
              <h3>About {model.name}</h3>
              <p>{model.bio}</p>
            </div>
            <div className="stats-table">
              <div className="stat-row"><span>Height:</span> <strong>{model.height}</strong></div>
              <div className="stat-row"><span>Size:</span> <strong>{model.size}</strong></div>
              <div className="stat-row"><span>Bust:</span> <strong>{model.bust}</strong></div>
              <div className="stat-row"><span>Waist:</span> <strong>{model.waist}</strong></div>
              <div className="stat-row"><span>Hips:</span> <strong>{model.hips}</strong></div>
              <div className="stat-row"><span>Shoe:</span> <strong>{model.shoe}</strong></div>
              {model.skin && <div className="stat-row"><span>Skin:</span> <strong>{model.skin}</strong></div>}
              <div className="stat-row"><span>Hair:</span> <strong>{model.hair}</strong></div>
              <div className="stat-row"><span>Eyes:</span> <strong>{model.eyes}</strong></div>
            </div>
          </div>

          <div className="modal-col-form">
            <h3>BOOK {model.name.toUpperCase()}</h3>
            <div className="form-scrollable">
              <p className="select-label">Select Shoot Type(s)</p>
              {Object.keys(shootDetails).map((key) => {
                const item = shootDetails[key];
                return (
                  <div key={key} className={`shoot-card-alt ${item.selected ? 'active-card' : ''}`}>
                    <label className="checkbox-container-left">
                      <input type="checkbox" checked={item.selected} onChange={() => handleToggleShoot(key)} />
                      {item.label}
                    </label>
                    {item.selected && (
                      <div className="card-details-reveal">
                        <div className="detail-divider"></div>
                        {(key === 'fashion' || key === 'brand') && (
                          <div className="input-group-sub">
                            <label>DURATION:</label>
                            <select value={item.duration} onChange={(e) => handleDetailChange(key, 'duration', e.target.value)}>
                              <option value="5 Hours">5 Hours</option>
                              <option value="Full-Day (9am-5pm)">Full-Day (9am-5pm)</option>
                            </select>
                          </div>
                        )}
                        <input type="text" placeholder="Reqs..." value={item.specificReq} onChange={(e) => handleDetailChange(key, 'specificReq', e.target.value)} className="req-input-alt" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="datetime-row-alt">
              <div className="dt-item">
                <label>Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
              </div>
              <div className="dt-item">
                <label>Time</label>
                <input type="time" name="time" value={formData.time} onChange={handleInputChange} />
              </div>
            </div>

            <div className="action-btns-alt">
              <button className="btn-book-wa" onClick={handleWhatsAppBook} disabled={isWaLoading}>
                {isWaLoading ? "Saving..." : "Book via WhatsApp"}
              </button>
              <button className="btn-book-ig" onClick={handleInstagramBook} disabled={isInstaLoading}>
                {isInstaLoading ? "Saving..." : "Book via Instagram"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;