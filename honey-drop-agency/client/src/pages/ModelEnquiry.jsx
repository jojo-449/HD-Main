// import Navbar from "../components/Navbar";
// import { useState } from "react";
// import axios from "axios"; 
// import { MdSend, MdCloudUpload } from "react-icons/md";
// import "./ModelEnquiry.css";

// const ModelEnquiry = () => {
//   // Form State
//   const [formData, setFormData] = useState({
//     fullName: "", email: "", whatsappNumber: "", instagramHandle: "",
//     dateOfBirth: "", age: "", location: "",
//     height: "", dressSize: "", bust: "", waist: "", hips: "", shoeSize: "",
//     hairColor: "", eyeColor: "",
//     experience: "", portfolioLink: "", previousWork: "",
//     motivation: "", availability: "",
//   });

//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Handle Text Inputs
//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData({ ...formData, [id]: value });
//   };

//   // Handle File Inputs
//   const handleFileChange = (e) => {
//     setFiles(e.target.files);
//   };

//   // Handle Submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const data = new FormData();
    
//     // 1. Append all text fields
//     Object.keys(formData).forEach((key) => {
//       data.append(key, formData[key]);
//     });

//     // 2. Append files
//     if (files && files.length > 0) {
//       for (let i = 0; i < files.length; i++) {
//         data.append('photos', files[i]);
//       }
//     }

//     try {
//       // FIX: No BASE_URL needed. main.jsx handles the domain now.
//       const response = await axios.post('/api/application/apply', data, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       if (response.data.success || response.status === 201 || response.status === 200) {
//         alert("Application submitted successfully! Please check your email for confirmation.");
        
//         // Reset form
//         setFormData({
//           fullName: "", email: "", whatsappNumber: "", instagramHandle: "",
//           dateOfBirth: "", age: "", location: "", height: "", dressSize: "",
//           bust: "", waist: "", hips: "", shoeSize: "", hairColor: "",
//           eyeColor: "", experience: "", portfolioLink: "", previousWork: "",
//           motivation: "", availability: "",
//         });
//         setFiles([]);
//         document.getElementById('photos').value = "";
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       const errorMsg = error.response?.data?.message || "Failed to submit application. Please check your connection.";
//       alert(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatLabel = (str) => {
//     return str.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="me-page-wrapper">
//         <div className="me-container">
          
//           <header className="me-header">
//             <h1>Join Our Agency</h1>
//             <p>Apply to become a professional model with HDMODELS</p>
//           </header>

//           <div className="me-content-layout">
            
//             {/* --- LEFT: Application Form --- */}
//             <section className="me-card me-form-section">
//               <h3 className="me-section-title">Model Application Form</h3>
//               <form onSubmit={handleSubmit} encType="multipart/form-data">
                
//                 {/* Personal Information */}
//                 <div className="me-form-block">
//                   <h4>Personal Information</h4>
//                   <div className="me-grid me-grid-personal">
//                     {["fullName", "email", "whatsappNumber", "instagramHandle", "dateOfBirth", "age", "location"].map((field) => (
//                       <div key={field} className="me-input-group">
//                         <label htmlFor={field}>
//                           {field === "whatsappNumber" ? "WhatsApp Number" : formatLabel(field)}
//                           {field !== "instagramHandle" && <span className="req">*</span>}
//                         </label>
//                         <input
//                           type={field === "email" ? "email" : field === "dateOfBirth" ? "date" : "text"}
//                           id={field}
//                           value={formData[field]}
//                           onChange={handleChange}
//                           placeholder={field === "fullName" ? "Jane Doe" : ""}
//                           required={field !== "instagramHandle"}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Physical Measurements */}
//                 <div className="me-form-block">
//                   <h4>Physical Measurements</h4>
//                   <div className="me-grid me-grid-measurements">
//                     {["height", "dressSize", "bust", "waist", "hips", "shoeSize", "hairColor", "eyeColor"].map((field) => (
//                       <div key={field} className="me-input-group">
//                         <label htmlFor={field}>{formatLabel(field)} <span className="req">*</span></label>
//                         {["dressSize", "hairColor", "eyeColor"].includes(field) ? (
//                           <select id={field} value={formData[field]} onChange={handleChange} required>
//                             <option value="">Select</option>
//                             {field === "dressSize" && ["XS", "S", "M", "L", "XL", "XXL"].map(s => <option key={s} value={s}>{s}</option>)}
//                             {field === "hairColor" && ["Black", "Brown", "Blonde", "Red", "Auburn", "Gray", "Other"].map(c => <option key={c} value={c}>{c}</option>)}
//                             {field === "eyeColor" && ["Brown", "Black", "Blue", "Green", "Hazel", "Gray"].map(c => <option key={c} value={c}>{c}</option>)}
//                           </select>
//                         ) : (
//                           <input type="text" id={field} value={formData[field]} onChange={handleChange} required placeholder={field === "height" ? "e.g. 5'9\"" : ""} />
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Experience & Portfolio */}
//                 <div className="me-form-block">
//                   <h4>Experience & Portfolio</h4>
//                   <div className="me-grid me-grid-experience">
//                     <div className="me-input-group">
//                       <label htmlFor="experience">Modeling Experience</label>
//                       <select id="experience" value={formData.experience} onChange={handleChange} required>
//                         <option value="">Select</option>
//                         <option value="Beginner">Beginner (0-1 years)</option>
//                         <option value="Intermediate">Intermediate (1-3 years)</option>
//                         <option value="Experienced">Experienced (3-5 years)</option>
//                         <option value="Professional">Professional (5+ years)</option>
//                       </select>
//                     </div>
//                     <div className="me-input-group">
//                       <label htmlFor="portfolioLink">Portfolio/Instagram Link</label>
//                       <input type="url" id="portfolioLink" value={formData.portfolioLink} onChange={handleChange} placeholder="https://instagram.com/yourhandle" />
//                     </div>
//                   </div>
//                   <div className="me-input-group me-full-width">
//                     <label htmlFor="previousWork">Previous Work/Experience (Optional)</label>
//                     <textarea id="previousWork" value={formData.previousWork} onChange={handleChange} rows="3" />
//                   </div>
//                 </div>

//                 {/* --- PHOTO UPLOAD SECTION --- */}
//                 <div className="me-form-block">
//                   <h4>Upload Photos</h4>
//                   <div className="me-upload-container">
//                     <label htmlFor="photos" className="upload-label">
//                       <MdCloudUpload className="upload-icon" />
//                       <span>Upload Headshot, Full Body & Side Profile (Max 5)</span>
//                       <small>Supported: JPG, PNG. Max size: 5MB per file.</small>
//                     </label>
//                     <input 
//                       type="file" 
//                       id="photos" 
//                       multiple 
//                       accept="image/*" 
//                       onChange={handleFileChange} 
//                       className="file-input"
//                       required
//                     />
//                     {files.length > 0 && (
//                       <div className="file-preview">
//                         <strong>{files.length}</strong> file(s) selected
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Additional Information */}
//                 <div className="me-form-block">
//                   <h4>Additional Information</h4>
//                   <div className="me-input-group me-full-width">
//                     <label htmlFor="motivation">Why do you want to join HDMODELS?</label>
//                     <textarea id="motivation" value={formData.motivation} onChange={handleChange} rows="3" />
//                   </div>
//                   <div className="me-input-group">
//                     <label htmlFor="availability">Availability <span className="req">*</span></label>
//                     <select id="availability" value={formData.availability} onChange={handleChange} required>
//                       <option value="">Select</option>
//                       <option value="Full-time">Full-time</option>
//                       <option value="Part-time">Part-time</option>
//                       <option value="Weekends only">Weekends only</option>
//                       <option value="Flexible">Flexible</option>
//                     </select>
//                   </div>
//                 </div>

//                 <button type="submit" className="me-submit-btn" disabled={loading}>
//                   {loading ? "Sending Application..." : <><MdSend /> Submit Application</>}
//                 </button>
//               </form>
//             </section>

//             {/* --- RIGHT: Requirements Sidebar --- */}
//             <aside className="me-card me-requirements-section">
//               <h3 className="me-section-title">Requirements</h3>
//               <div className="me-req-grid">
//                 {[
//                   { title: "Age", items: ["Must be 15+ years", "Valid ID required", "Parental consent for <18"] },
//                   { title: "Physical", items: ["Height: Min 4'9\" (Female)", "Healthy skin", "Natural look preferred"] },
//                   { title: "Professional", items: ["Punctual", "Ability to take direction", "Professional attitude"] },
//                   { title: "Photos", items: ["No filters", "Natural lighting", "Plain background", "Wear simple fitted clothes"] }
//                 ].map((section, idx) => (
//                   <div key={idx} className="me-req-item">
//                     <h4>{section.title}</h4>
//                     <ul>
//                       {section.items.map((item, i) => <li key={i}>{item}</li>)}
//                     </ul>
//                   </div>
//                 ))}
//               </div>
//             </aside>

//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ModelEnquiry;


import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios"; 
import { MdSend, MdCloudUpload } from "react-icons/md";
import "./ModelEnquiry.css";

const ModelEnquiry = () => {
  // Form State
  const [formData, setFormData] = useState({
    fullName: "", email: "", whatsappNumber: "", instagramHandle: "",
    dateOfBirth: "", age: "", location: "",
    height: "", dressSize: "", bust: "", waist: "", hips: "", shoeSize: "",
    hairColor: "", eyeColor: "",
    experience: "", portfolioLink: "", previousWork: "",
    motivation: "", availability: "",
  });

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle Text Inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle File Inputs
  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  // Handle Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // --- NEW MANUAL PHOTO CHECK ---
    // If no files are selected, we show the message and STOP the function
    if (!files || files.length === 0) {
      alert("Please upload your photos (Headshot, Full Body, or Side Profile) to proceed.");
      return; // This stops the email from sending
    }

    setLoading(true);

    const data = new FormData();
    
    // 1. Append all text fields
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    // 2. Append files
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        data.append('photos', files[i]);
      }
    }

    try {
      const response = await axios.post('/api/application/apply', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success || response.status === 201 || response.status === 200) {
        alert("Application submitted successfully! Please check your email for confirmation.");
        
        // Reset form
        setFormData({
          fullName: "", email: "", whatsappNumber: "", instagramHandle: "",
          dateOfBirth: "", age: "", location: "", height: "", dressSize: "",
          bust: "", waist: "", hips: "", shoeSize: "", hairColor: "",
          eyeColor: "", experience: "", portfolioLink: "", previousWork: "",
          motivation: "", availability: "",
        });
        setFiles([]);
        document.getElementById('photos').value = "";
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMsg = error.response?.data?.message || "Failed to submit application. Please check your connection.";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const formatLabel = (str) => {
    return str.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <>
      <Navbar />
      <div className="me-page-wrapper">
        <div className="me-container">
          
          <header className="me-header">
            <h1>Join Our Agency</h1>
            <p>Apply to become a professional model with HDMODELS</p>
          </header>

          <div className="me-content-layout">
            
            {/* --- LEFT: Application Form --- */}
            <section className="me-card me-form-section">
              <h3 className="me-section-title">Model Application Form</h3>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                
                {/* Personal Information */}
                <div className="me-form-block">
                  <h4>Personal Information</h4>
                  <div className="me-grid me-grid-personal">
                    {["fullName", "email", "whatsappNumber", "instagramHandle", "dateOfBirth", "age", "location"].map((field) => (
                      <div key={field} className="me-input-group">
                        <label htmlFor={field}>
                          {field === "whatsappNumber" ? "WhatsApp Number" : formatLabel(field)}
                          {field !== "instagramHandle" && <span className="req">*</span>}
                        </label>
                        <input
                          type={field === "email" ? "email" : field === "dateOfBirth" ? "date" : "text"}
                          id={field}
                          value={formData[field]}
                          onChange={handleChange}
                          placeholder={field === "fullName" ? "Jane Doe" : ""}
                          required={field !== "instagramHandle"}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Physical Measurements */}
                <div className="me-form-block">
                  <h4>Physical Measurements</h4>
                  <div className="me-grid me-grid-measurements">
                    {["height", "dressSize", "bust", "waist", "hips", "shoeSize", "hairColor", "eyeColor"].map((field) => (
                      <div key={field} className="me-input-group">
                        <label htmlFor={field}>{formatLabel(field)} <span className="req">*</span></label>
                        {["dressSize", "hairColor", "eyeColor"].includes(field) ? (
                          <select id={field} value={formData[field]} onChange={handleChange} required>
                            <option value="">Select</option>
                            {field === "dressSize" && ["XS", "S", "M", "L", "XL", "XXL"].map(s => <option key={s} value={s}>{s}</option>)}
                            {field === "hairColor" && ["Black", "Brown", "Blonde", "Red", "Auburn", "Gray", "Other"].map(c => <option key={c} value={c}>{c}</option>)}
                            {field === "eyeColor" && ["Brown", "Black", "Blue", "Green", "Hazel", "Gray"].map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        ) : (
                          <input type="text" id={field} value={formData[field]} onChange={handleChange} required placeholder={field === "height" ? "e.g. 5'9\"" : ""} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience & Portfolio */}
                <div className="me-form-block">
                  <h4>Experience & Portfolio</h4>
                  <div className="me-grid me-grid-experience">
                    <div className="me-input-group">
                      <label htmlFor="experience">Modeling Experience</label>
                      <select id="experience" value={formData.experience} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="Beginner">Beginner (0-1 years)</option>
                        <option value="Intermediate">Intermediate (1-3 years)</option>
                        <option value="Experienced">Experienced (3-5 years)</option>
                        <option value="Professional">Professional (5+ years)</option>
                      </select>
                    </div>
                    <div className="me-input-group">
                      <label htmlFor="portfolioLink">Portfolio/Instagram Link</label>
                      <input type="url" id="portfolioLink" value={formData.portfolioLink} onChange={handleChange} placeholder="https://instagram.com/yourhandle" />
                    </div>
                  </div>
                  <div className="me-input-group me-full-width">
                    <label htmlFor="previousWork">Previous Work/Experience (Optional)</label>
                    <textarea id="previousWork" value={formData.previousWork} onChange={handleChange} rows="3" />
                  </div>
                </div>

                {/* --- PHOTO UPLOAD SECTION --- */}
                <div className="me-form-block">
                  <h4>Upload Photos <span className="req">*</span></h4>
                  <div className="me-upload-container">
                    <label htmlFor="photos" className="upload-label">
                      <MdCloudUpload className="upload-icon" />
                      <span>Upload Headshot, Full Body & Side Profile (Max 5)</span>
                      <small>Supported: JPG, PNG. Max size: 5MB per file.</small>
                    </label>
                    <input 
                      type="file" 
                      id="photos" 
                      multiple 
                      accept="image/*" 
                      onChange={handleFileChange} 
                      className="file-input"
                      // REMOVED 'required' to stop the browser error
                    />
                    {files.length > 0 ? (
                      <div className="file-preview" style={{color: '#0047ab', fontWeight: 'bold'}}>
                        ✅ {files.length} file(s) selected
                      </div>
                    ) : (
                       <div className="file-preview" style={{color: 'red'}}>
                        * At least 1 photo is required.
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Information */}
                <div className="me-form-block">
                  <h4>Additional Information</h4>
                  <div className="me-input-group me-full-width">
                    <label htmlFor="motivation">Why do you want to join HDMODELS?</label>
                    <textarea id="motivation" value={formData.motivation} onChange={handleChange} rows="3" />
                  </div>
                  <div className="me-input-group">
                    <label htmlFor="availability">Availability <span className="req">*</span></label>
                    <select id="availability" value={formData.availability} onChange={handleChange} required>
                      <option value="">Select</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Weekends only">Weekends only</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="me-submit-btn" disabled={loading}>
                  {loading ? "Sending Application..." : <><MdSend /> Submit Application</>}
                </button>
              </form>
            </section>

            {/* --- RIGHT: Requirements Sidebar --- */}
            <aside className="me-card me-requirements-section">
              <h3 className="me-section-title">Requirements</h3>
              <div className="me-req-grid">
                {[
                  { title: "Age", items: ["Must be 15+ years", "Valid ID required", "Parental consent for <18"] },
                  { title: "Physical", items: ["Height: Min 4'9\" (Female)", "Healthy skin", "Natural look preferred"] },
                  { title: "Professional", items: ["Punctual", "Ability to take direction", "Professional attitude"] },
                  { title: "Photos", items: ["No filters", "Natural lighting", "Plain background", "Wear simple fitted clothes"] }
                ].map((section, idx) => (
                  <div key={idx} className="me-req-item">
                    <h4>{section.title}</h4>
                    <ul>
                      {section.items.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </aside>

          </div>
        </div>
      </div>
    </>
  );
};

export default ModelEnquiry;

