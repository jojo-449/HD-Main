// // import { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import Navbar from "../components/Navbar";
// // import BookingModal from "../components/BookingModal"; 
// // import './Models.css'; 

// // import basic1 from '../assets/Basic-Models/1.jpg';

// // // --- MANUAL DATA SOURCE ---
// // const modelRegistry = {
// //   "Fehilah": { height: "5'3\"", size: "UK 6/8", bust: "32\"", waist: "26\"", hips: "39\"", shoe: "39/40", hair: "Ginger (Natural)", eyes: "Dark Brown", bio: "Top-tier model with extensive experience in high-fashion campaigns." },
// //   "Gold": { height: "5'10\"", size: "10/12", bust: "40\"", waist: "36\"", hips: "46\"", shoe: "43", hair: "Color 2 (Relaxed)", eyes: "Brown", bio: "Top-tier model with extensive experience in high-fashion campaigns." },
// //   "Princess": { height: "5'6\"", size: "6/8", bust: "N/A", waist: "N/A", hips: "N/A", shoe: "37/38", hair: "Black (Natural)", eyes: "Brown", bio: "Top-tier model with extensive experience in high-fashion campaigns." },
// //   "Funmibi": { height: "5'4\"", size: "UK 8", bust: "35\"", waist: "29\"", hips: "39\"", shoe: "38", hair: "Black (Relaxed)", eyes: "Black", bio: "My name is Funmibi, I’m a student and a face model. I’m very passionate about modeling and becoming better in my career. With HDMODELS, I’ve been able to work and learn to perfect my skills." },
// //   "Rolex": { height: "5'6\"", size: "12", bust: "40\"", waist: "33\"", hips: "42\"", shoe: "39", hair: "Black (Relaxed)", eyes: "Chestnut Brown", bio: "My name is Goodness but most people call me Rolex. I’m a student and entrepreneur. I started as a freelance model for 2 years before joining an agency. This is my fourth year as a face model; I love transitions, the camera, and posing. I want to be one of the best face models in Nigeria 🇳🇬" },
// //   "Dominion": { height: "5'5\"", size: "10", bust: "36\"", waist: "30\"", hips: "40\"", shoe: "Small 40", hair: "Black", eyes: "Black (Natural)", bio: "Top-tier model with extensive experience in high-fashion campaigns. Been modelling for months now and it has been going well!" },
// //   "Blessing": { height: "5'8\"", size: "8", bust: "34\"", waist: "26\"", hips: "36\"", shoe: "39", hair: "Black", eyes: "Brown", bio: "Blessing Adaeze Micheal. Age: 20. Nationality: Nigerian. State of Origin: Abia State. I have worked on commercial, print, and event campaigns for several brands. I enjoy working with brands that value creativity." },
// //   "Amarachi": { height: "5'7\"", size: "8", bust: "33\"", waist: "25\"", hips: "35\"", shoe: "39", hair: "Black", eyes: "Brown", bio: "My name is Amarachi and I am a 19-year-old commercial and face model under HD models based between Lagos and Enugu. Currently in university, I bring a clean, expressive look and on-camera confidence to beauty, lifestyle, and brand campaigns." },
// //   "Circe": { height: "5'4\"", size: "UK 6/8", bust: "30\"", waist: "24\"", hips: "33\"", shoe: "39", hair: "Low cut", eyes: "Hazel", skin: "Light Skin", bio: "Professional model with a unique look, perfect for beauty and fashion." },
// //   "Kiky K.N Micheals": { height: "5'9\"", size: "10/12", bust: "38\"", waist: "30\"", hips: "43\"", shoe: "40", hair: "Golden Brown (Afro)", eyes: "Brown", skin: "Lightskinned", bio: "Hello, I'm Kiky K.N Micheals, a light-skin model based in Lagos. I began my career 3 years ago and have featured in numerous works, developing a confident presence on camera and the runway." },
// //   "Jessica oba": { height: "5'11\"", size: "14", bust: "36\"", waist: "28\"", hips: "40\"", shoe: "40", hair: "Black", eyes: "Brown", bio: "Exclusive elite talent for high-end fashion and international campaigns." }
// // };

// // const processImages = (glob) => {
// //   const grouped = {};
// //   Object.keys(glob).forEach(path => {
// //     const numMatch = path.match(/(\d+)/);
// //     const num = numMatch ? numMatch[1] : "999";
// //     if (!grouped[num]) grouped[num] = [];
// //     const url = glob[path].default || glob[path];
// //     if (path.toLowerCase().includes('a.')) { grouped[num].unshift(url); } 
// //     else { grouped[num].push(url); }
// //   });
// //   return Object.keys(grouped).sort((a, b) => parseInt(a) - parseInt(b)).map(key => ({ id: key, files: grouped[key] }));
// // };

// // const topModelsGlob = import.meta.glob('../assets/Top-Models/*.{png,jpg,jpeg}', { eager: true });
// // const premiumModelsGlob = import.meta.glob('../assets/Premium-models/*.{png,jpg,jpeg}', { eager: true });
// // const eliteModelsGlob = import.meta.glob('../assets/Elite-Models/*.{png,jpg,jpeg}', { eager: true });

// // const Models = () => {
// //   const [models, setModels] = useState([]);
// //   const [filter, setFilter] = useState("All");
// //   const [selectedModel, setSelectedModel] = useState(null);

// //   useEffect(() => {
// //     // --- 1. TOP MODELS ---
// //     const topNames = ["Fehilah", "Gold", "Princess", "Funmibi", "Christine", "Benny", "Everly", "Elizabeth", "Chinaza", "Rolex", "Dominion", "Florence", "Promise", "Favour", "Clare", "Blessing", "Ebube", "Tofunmi", "Frank", "Olayinka", "Adedayo", "Joan", "Fave", "Hope", "Lauretta", "Victoria", "Samantha", "Gbemi", "Choice", "Alex", "Amarachi"];
// //     let topImgs = processImages(topModelsGlob).slice(1);
// //     topImgs.splice(topNames.indexOf("Florence"), 0, null); 

// //     const genTop = topNames.map((name, i) => {
// //       const data = modelRegistry[name] || {};
// //       return {
// //         _id: `top-${i}`, name, category: "Top Models",
// //         images: name === "Florence" || !topImgs[i] ? ['https://via.placeholder.com/400x600?text=Coming+Soon'] : topImgs[i].files,
// //         height: data.height || "5'9\"", size: data.size || "8", bust: data.bust || "34\"", waist: data.waist || "25\"", hips: data.hips || "36\"", shoe: data.shoe || "39", hair: data.hair || "Black", eyes: data.eyes || "Dark Brown", bio: data.bio || "Top-tier model with extensive experience in high-fashion campaigns."
// //       };
// //     });

// //     // --- 2. PREMIUM MODELS ---
// //     const premNames = ["Temiloluwa", "Ndi Amaka", "Bukola", "Rejoice", "Jane", "Feyi", "Jummy", "Circe", "Kiky K.N Micheals"];
// //     let premImgs = processImages(premiumModelsGlob).slice(1);
// //     premImgs.splice(premNames.indexOf("Temiloluwa"), 0, null);

// //     const genPrem = premNames.map((name, i) => {
// //       const data = modelRegistry[name] || {};
// //       return {
// //         _id: `prem-${i}`, name, category: "Premium Models",
// //         images: name === "Temiloluwa" || !premImgs[i] ? ['https://via.placeholder.com/400x600?text=Coming+Soon'] : premImgs[i].files,
// //         height: data.height || "5'7\"", size: data.size || "UK 6", bust: data.bust || "32\"", waist: data.waist || "24\"", hips: data.hips || "35\"", shoe: data.shoe || "38", hair: data.hair || "Black", eyes: data.eyes || "Brown", skin: data.skin || null, bio: data.bio || "Premium model with extensive experience in high-fashion campaigns."
// //       };
// //     });

// //     // --- 3. ELITE MODELS ---
// //     const eliteNames = ["Jessica oba", "Finey"];
// //     let eliteImgs = processImages(eliteModelsGlob).slice(1);
// //     const genElite = eliteNames.map((name, i) => {
// //       const data = modelRegistry[name] || {};
// //       return {
// //         _id: `elite-${i}`, name, category: "Elite Models",
// //         images: eliteImgs[i] ? eliteImgs[i].files : ['https://via.placeholder.com/400x600?text=Coming+Soon'],
// //         height: data.height || "5'11\"", size: data.size || "14", bust: data.bust || "36\"", waist: data.waist || "28\"", hips: data.hips || "40\"", shoe: data.shoe || "40", hair: data.hair || "Black", eyes: data.eyes || "Brown", bio: data.bio || "Exclusive elite talent."
// //       };
// //     });

// //     setModels([...genTop, ...genPrem, ...genElite]);
// //   }, []);

// //   const filteredModels = models.filter(m => m.category === filter);

// //   return (
// //     <>
// //       <Navbar />
// //       <div className="main-content">
        
// //         {/* --- BOOKING GUIDELINES (FULL TEXT ADDED) --- */}
// //         {/* <div className="booking-guidelines">
// //           <div className="guidelines-content">
// //             <h3>WHAT YOU NEED TO KNOW BEFORE BOOKING</h3>
// //             <ul className="guidelines-list">
// //               <li>
// //                 <strong>1.</strong> Our opening hours are <strong>9:00 AM - 9:00 PM</strong> (Monday to Saturday). Bookings outside these hours must be arranged in advance.
// //               </li>
// //               <li>
// //                 <strong>2.</strong> A standard shoot session is for <strong>5 hours</strong>. Overtime will attract extra charges based on the model's category rate.
// //               </li>
// //               <li>
// //                 <strong>3.</strong> For safety reasons, models <strong>will not leave their homes</strong> before 7:00 AM or stay out past 6:00 PM unless secure transportation and accommodation are verified and provided by the client.
// //               </li>
// //               <li>
// //                 <strong>4.</strong> Do not book a model for "Fashion/Commercial" and end up using her for "Lingerie" or "Video Vixen" roles without prior agreement. Rates differ significantly per category.
// //               </li>
// //               <li>
// //                 <strong>5.</strong> All bookings must be confirmed with a deposit. No deposit, no booking confirmation.
// //               </li>
// //             </ul>
// //             <p className="guidelines-footer">
// //               By proceeding with a booking, you agree to these policies. For more details, kindly refer to our <Link to="/terms">Terms and Conditions</Link>.
// //             </p>
// //           </div>
// //         </div> */}

// //         <div className="models-header">
// //           <h2>{filter === "All" ? "Select A Category" : filter}</h2>
// //           <div className="filter-container">
// //             {["All", "Basic Models", "Top Models", "Premium Models", "Elite Models"].map(cat => (
// //               <button key={cat} onClick={() => setFilter(cat)} className={`filter-btn ${filter === cat ? 'active' : ''}`}>{cat}</button>
// //             ))}
// //           </div>
// //         </div>

// //         {filter === "All" ? (
// //           <div className="categories-grid">
// //             <div className="category-card" onClick={() => setFilter("Basic Models")}><div className="category-img-wrapper"><img src={basic1} alt="Basic" /></div><div className="category-info"><h3>Basic Models</h3><span>Check Availability</span></div></div>
// //             <div className="category-card" onClick={() => setFilter("Top Models")}><div className="category-img-wrapper"><img src={processImages(topModelsGlob)[0]?.files[0]} alt="Top" /></div><div className="category-info"><h3>Top Models</h3><span>View Talent</span></div></div>
// //             <div className="category-card" onClick={() => setFilter("Premium Models")}><div className="category-img-wrapper"><img src={processImages(premiumModelsGlob)[0]?.files[0]} alt="Prem" /></div><div className="category-info"><h3>Premium Models</h3><span>View Talent</span></div></div>
// //             <div className="category-card" onClick={() => setFilter("Elite Models")}><div className="category-img-wrapper"><img src={processImages(eliteModelsGlob)[0]?.files[0]} alt="Elite" /></div><div className="category-info"><h3>Elite Models</h3><span>View Talent</span></div></div>
// //           </div>
// //         ) : (
// //           <div className="models-grid">
// //             {filteredModels.map(model => (
// //               <div key={model._id} className="talent-card">
// //                 <div className="talent-img-wrapper"><img src={model.images[0]} alt={model.name} /></div>
// //                 <div className="talent-details">
// //                   <h3>{model.name}</h3>
// //                   <button className="book-btn" onClick={() => setSelectedModel(model)}>Book Now</button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //       {selectedModel && <BookingModal model={selectedModel} onClose={() => setSelectedModel(null)} />}
// //     </>
// //   );
// // };

// // export default Models;


// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../api"; // Import your API instance
// import Navbar from "../components/Navbar";
// import BookingModal from "../components/BookingModal"; 
// import './Models.css'; 

// import basic1 from '../assets/Basic-Models/1.jpg';

// // --- MANUAL DATA SOURCE (Your Coded Models) ---
// const modelRegistry = {
//   "Fehilah": { height: "5'3\"", size: "UK 6/8", bust: "32\"", waist: "26\"", hips: "39\"", shoe: "39/40", hair: "Ginger (Natural)", eyes: "Dark Brown", bio: "Top-tier model with extensive experience in high-fashion campaigns." },
//   "Gold": { height: "5'10\"", size: "10/12", bust: "40\"", waist: "36\"", hips: "46\"", shoe: "43", hair: "Color 2 (Relaxed)", eyes: "Brown", bio: "Top-tier model with extensive experience in high-fashion campaigns." },
//   "Princess": { height: "5'6\"", size: "6/8", bust: "N/A", waist: "N/A", hips: "N/A", shoe: "37/38", hair: "Black (Natural)", eyes: "Brown", bio: "Top-tier model with extensive experience in high-fashion campaigns." },
//   "Funmibi": { height: "5'4\"", size: "UK 8", bust: "35\"", waist: "29\"", hips: "39\"", shoe: "38", hair: "Black (Relaxed)", eyes: "Black", bio: "My name is Funmibi, I’m a student and a face model. I’m very passionate about modeling and becoming better in my career. With HDMODELS, I’ve been able to work and learn to perfect my skills." },
//   "Rolex": { height: "5'6\"", size: "12", bust: "40\"", waist: "33\"", hips: "42\"", shoe: "39", hair: "Black (Relaxed)", eyes: "Chestnut Brown", bio: "My name is Goodness but most people call me Rolex. I’m a student and entrepreneur. I started as a freelance model for 2 years before joining an agency. This is my fourth year as a face model; I love transitions, the camera, and posing. I want to be one of the best face models in Nigeria 🇳🇬" },
//   "Dominion": { height: "5'5\"", size: "10", bust: "36\"", waist: "30\"", hips: "40\"", shoe: "Small 40", hair: "Black", eyes: "Black (Natural)", bio: "Top-tier model with extensive experience in high-fashion campaigns. Been modelling for months now and it has been going well!" },
//   "Blessing": { height: "5'8\"", size: "8", bust: "34\"", waist: "26\"", hips: "36\"", shoe: "39", hair: "Black", eyes: "Brown", bio: "Blessing Adaeze Micheal. Age: 20. Nationality: Nigerian. State of Origin: Abia State. I have worked on commercial, print, and event campaigns for several brands. I enjoy working with brands that value creativity." },
//   "Amarachi": { height: "5'7\"", size: "8", bust: "33\"", waist: "25\"", hips: "35\"", shoe: "39", hair: "Black", eyes: "Brown", bio: "My name is Amarachi and I am a 19-year-old commercial and face model under HD models based between Lagos and Enugu. Currently in university, I bring a clean, expressive look and on-camera confidence to beauty, lifestyle, and brand campaigns." },
//   "Circe": { height: "5'4\"", size: "UK 6/8", bust: "30\"", waist: "24\"", hips: "33\"", shoe: "39", hair: "Low cut", eyes: "Hazel", skin: "Light Skin", bio: "Professional model with a unique look, perfect for beauty and fashion." },
//   "Kiky K.N Micheals": { height: "5'9\"", size: "10/12", bust: "38\"", waist: "30\"", hips: "43\"", shoe: "40", hair: "Golden Brown (Afro)", eyes: "Brown", skin: "Lightskinned", bio: "Hello, I'm Kiky K.N Micheals, a light-skin model based in Lagos. I began my career 3 years ago and have featured in numerous works, developing a confident presence on camera and the runway." },
//   "Jessica oba": { height: "5'11\"", size: "14", bust: "36\"", waist: "28\"", hips: "40\"", shoe: "40", hair: "Black", eyes: "Brown", bio: "Exclusive elite talent for high-end fashion and international campaigns." }
// };

// const processImages = (glob) => {
//   const grouped = {};
//   Object.keys(glob).forEach(path => {
//     const numMatch = path.match(/(\d+)/);
//     const num = numMatch ? numMatch[1] : "999";
//     if (!grouped[num]) grouped[num] = [];
//     const url = glob[path].default || glob[path];
//     if (path.toLowerCase().includes('a.')) { grouped[num].unshift(url); } 
//     else { grouped[num].push(url); }
//   });
//   return Object.keys(grouped).sort((a, b) => parseInt(a) - parseInt(b)).map(key => ({ id: key, files: grouped[key] }));
// };

// const topModelsGlob = import.meta.glob('../assets/Top-Models/*.{png,jpg,jpeg}', { eager: true });
// const premiumModelsGlob = import.meta.glob('../assets/Premium-models/*.{png,jpg,jpeg}', { eager: true });
// const eliteModelsGlob = import.meta.glob('../assets/Elite-Models/*.{png,jpg,jpeg}', { eager: true });

// const Models = () => {
//   const [models, setModels] = useState([]);
//   const [filter, setFilter] = useState("All");
//   const [selectedModel, setSelectedModel] = useState(null);

//   useEffect(() => {
//     const loadAllModels = async () => {
//       // --- 1. GENERATE HARD-CODED MODELS ---
//       const topNames = ["Fehilah", "Gold", "Princess", "Funmibi", "Christine", "Benny", "Everly", "Elizabeth", "Chinaza", "Rolex", "Dominion", "Florence", "Promise", "Favour", "Clare", "Blessing", "Ebube", "Tofunmi", "Frank", "Olayinka", "Adedayo", "Joan", "Fave", "Hope", "Lauretta", "Victoria", "Samantha", "Gbemi", "Choice", "Alex", "Amarachi"];
//       let topImgs = processImages(topModelsGlob).slice(1);
//       topImgs.splice(topNames.indexOf("Florence"), 0, null); 
//       const genTop = topNames.map((name, i) => {
//         const data = modelRegistry[name] || {};
//         return {
//           _id: `top-${i}`, name, category: "Top Models",
//           images: name === "Florence" || !topImgs[i] ? ['https://via.placeholder.com/400x600?text=Coming+Soon'] : topImgs[i].files,
//           height: data.height || "5'9\"", size: data.size || "8", bust: data.bust || "34\"", waist: data.waist || "25\"", hips: data.hips || "36\"", shoe: data.shoe || "39", hair: data.hair || "Black", eyes: data.eyes || "Dark Brown", bio: data.bio || "Top-tier model with extensive experience in high-fashion campaigns."
//         };
//       });

//       const premNames = ["Temiloluwa", "Ndi Amaka", "Bukola", "Rejoice", "Jane", "Feyi", "Jummy", "Circe", "Kiky K.N Micheals"];
//       let premImgs = processImages(premiumModelsGlob).slice(1);
//       premImgs.splice(premNames.indexOf("Temiloluwa"), 0, null);
//       const genPrem = premNames.map((name, i) => {
//         const data = modelRegistry[name] || {};
//         return {
//           _id: `prem-${i}`, name, category: "Premium Models",
//           images: name === "Temiloluwa" || !premImgs[i] ? ['https://via.placeholder.com/400x600?text=Coming+Soon'] : premImgs[i].files,
//           height: data.height || "5'7\"", size: data.size || "UK 6", bust: data.bust || "32\"", waist: data.waist || "24\"", hips: data.hips || "35\"", shoe: data.shoe || "38", hair: data.hair || "Black", eyes: data.eyes || "Brown", skin: data.skin || null, bio: data.bio || "Premium model with extensive experience in high-fashion campaigns."
//         };
//       });

//       const eliteNames = ["Jessica oba", "Finey"];
//       let eliteImgs = processImages(eliteModelsGlob).slice(1);
//       const genElite = eliteNames.map((name, i) => {
//         const data = modelRegistry[name] || {};
//         return {
//           _id: `elite-${i}`, name, category: "Elite Models",
//           images: eliteImgs[i] ? eliteImgs[i].files : ['https://via.placeholder.com/400x600?text=Coming+Soon'],
//           height: data.height || "5'11\"", size: data.size || "14", bust: data.bust || "36\"", waist: data.waist || "28\"", hips: data.hips || "40\"", shoe: data.shoe || "40", hair: data.hair || "Black", eyes: data.eyes || "Brown", bio: data.bio || "Exclusive elite talent."
//         };
//       });

//       const hardCodedModels = [...genTop, ...genPrem, ...genElite];

//       // --- 2. FETCH DATABASE MODELS (Admin Added) ---
//       try {
//         const { data } = await api.get("/api/models");
        
//         // Map Database Category Names to match your Frontend filter names
//         const mappedDbModels = data.map(dbModel => {
//           let frontendCategory = "Basic Models"; // Default
//           if (dbModel.category === "top") frontendCategory = "Top Models";
//           if (dbModel.category === "premium") frontendCategory = "Premium Models";
//           if (dbModel.category === "elite") frontendCategory = "Elite Models";
//           if (dbModel.category === "basic") frontendCategory = "Basic Models";

//           return {
//             ...dbModel,
//             category: frontendCategory, // Override with UI category name
//             bio: dbModel.about // Map 'about' from DB to 'bio' for Modal
//           };
//         });

//         // --- 3. MERGE BOTH (DB Models first so they appear at top) ---
//         setModels([...mappedDbModels, ...hardCodedModels]);

//       } catch (error) {
//         console.error("Error fetching database models:", error);
//         setModels(hardCodedModels); // Fallback to just coded ones if API fails
//       }
//     };

//     loadAllModels();
//   }, []);

//   const filteredModels = models.filter(m => m.category === filter);

//   return (
//     <>
//       <Navbar />
//       <div className="main-content">
//         <div className="models-header">
//           <h2>{filter === "All" ? "Select A Category" : filter}</h2>
//           <div className="filter-container">
//             {["All", "Basic Models", "Top Models", "Premium Models", "Elite Models"].map(cat => (
//               <button key={cat} onClick={() => setFilter(cat)} className={`filter-btn ${filter === cat ? 'active' : ''}`}>{cat}</button>
//             ))}
//           </div>
//         </div>

//         {filter === "All" ? (
//           <div className="categories-grid">
//             <div className="category-card" onClick={() => setFilter("Basic Models")}><div className="category-img-wrapper"><img src={basic1} alt="Basic" /></div><div className="category-info"><h3>Basic Models</h3><span>Check Availability</span></div></div>
//             <div className="category-card" onClick={() => setFilter("Top Models")}><div className="category-img-wrapper"><img src={processImages(topModelsGlob)[0]?.files[0]} alt="Top" /></div><div className="category-info"><h3>Top Models</h3><span>View Talent</span></div></div>
//             <div className="category-card" onClick={() => setFilter("Premium Models")}><div className="category-img-wrapper"><img src={processImages(premiumModelsGlob)[0]?.files[0]} alt="Prem" /></div><div className="category-info"><h3>Premium Models</h3><span>View Talent</span></div></div>
//             <div className="category-card" onClick={() => setFilter("Elite Models")}><div className="category-img-wrapper"><img src={processImages(eliteModelsGlob)[0]?.files[0]} alt="Elite" /></div><div className="category-info"><h3>Elite Models</h3><span>View Talent</span></div></div>
//           </div>
//         ) : (
//           <div className="models-grid">
//             {filteredModels.map(model => (
//               <div key={model._id} className="talent-card">
//                 <div className="talent-img-wrapper">
//                     {/* Database models use 'images' array, local ones do too. Cloudinary URLs work here. */}
//                     <img src={model.images[0]} alt={model.name} />
//                 </div>
//                 <div className="talent-details">
//                   <h3>{model.name}</h3>
//                   <button className="book-btn" onClick={() => setSelectedModel(model)}>Book Now</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       {selectedModel && <BookingModal model={selectedModel} onClose={() => setSelectedModel(null)} />}
//     </>
//   );
// };

// export default Models;


import { useEffect, useState } from "react";
import api from "../api"; 
import Navbar from "../components/Navbar";
import BookingModal from "../components/BookingModal"; 
import './Models.css'; 

// 1. IMPORT LOCAL ASSETS FOR CATEGORY COVERS
import basic1 from '../assets/Basic-Models/1.jpg';
const topModelsGlob = import.meta.glob('../assets/Top-Models/*.{png,jpg,jpeg}', { eager: true });
const premiumModelsGlob = import.meta.glob('../assets/Premium-models/*.{png,jpg,jpeg}', { eager: true });
const eliteModelsGlob = import.meta.glob('../assets/Elite-Models/*.{png,jpg,jpeg}', { eager: true });

// Helper to extract the cover image from local folders
const processImages = (glob) => {
  const grouped = {};
  Object.keys(glob).forEach(path => {
    const numMatch = path.match(/(\d+)/);
    const num = numMatch ? numMatch[1] : "999";
    if (!grouped[num]) grouped[num] = [];
    const url = glob[path].default || glob[path];
    grouped[num].push(url);
  });
  return Object.keys(grouped).sort((a, b) => parseInt(a) - parseInt(b)).map(key => ({ id: key, files: grouped[key] }));
};

const Models = () => {
  const [models, setModels] = useState([]);
  const [filter, setFilter] = useState("All");
  const [selectedModel, setSelectedModel] = useState(null);

  useEffect(() => {
    const loadAllModels = async () => {
      try {
        // FETCH ONLY FROM DATABASE (All hard-coded genTop/genPrem/genElite are removed)
        const { data } = await api.get("/api/models");
        
        const mappedDbModels = data.map(dbModel => {
          let frontendCategory = "Basic Models"; 
          if (dbModel.category === "top") frontendCategory = "Top Models";
          if (dbModel.category === "premium") frontendCategory = "Premium Models";
          if (dbModel.category === "elite") frontendCategory = "Elite Models";
          if (dbModel.category === "basic") frontendCategory = "Basic Models";

          return {
            ...dbModel,
            category: frontendCategory, 
            bio: dbModel.about 
          };
        });

        setModels(mappedDbModels);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };
    loadAllModels();
  }, []);

  const filteredModels = models.filter(m => m.category === filter);

  return (
    <>
      <Navbar />
      <div className="main-content">
        <div className="models-header">
          <h2>{filter === "All" ? "Select A Category" : filter}</h2>
          <div className="filter-container">
            {["All", "Basic Models", "Top Models", "Premium Models", "Elite Models"].map(cat => (
              <button key={cat} onClick={() => setFilter(cat)} className={`filter-btn ${filter === cat ? 'active' : ''}`}>{cat}</button>
            ))}
          </div>
        </div>

        {filter === "All" ? (
          <div className="categories-grid">
            {/* CATEGORY COVERS KEPT AS PER YOUR ASSET STRUCTURE */}
            <div className="category-card" onClick={() => setFilter("Basic Models")}>
                <div className="category-img-wrapper"><img src={basic1} alt="Basic" /></div>
                <div className="category-info"><h3>Basic Models</h3><span>Check Availability</span></div>
            </div>
            <div className="category-card" onClick={() => setFilter("Top Models")}>
                <div className="category-img-wrapper"><img src={processImages(topModelsGlob)[0]?.files[0]} alt="Top" /></div>
                <div className="category-info"><h3>Top Models</h3><span>View Talent</span></div>
            </div>
            <div className="category-card" onClick={() => setFilter("Premium Models")}>
                <div className="category-img-wrapper"><img src={processImages(premiumModelsGlob)[0]?.files[0]} alt="Prem" /></div>
                <div className="category-info"><h3>Premium Models</h3><span>View Talent</span></div>
            </div>
            <div className="category-card" onClick={() => setFilter("Elite Models")}>
                <div className="category-img-wrapper"><img src={processImages(eliteModelsGlob)[0]?.files[0]} alt="Elite" /></div>
                <div className="category-info"><h3>Elite Models</h3><span>View Talent</span></div>
            </div>
          </div>
        ) : (
          <div className="models-grid">
            {filteredModels.map(model => (
              <div key={model._id} className="talent-card">
                <div className="talent-img-wrapper">
                    <img src={model.images[0]} alt={model.name} />
                </div>
                <div className="talent-details">
                  <h3>{model.name}</h3>
                  <button className="book-btn" onClick={() => setSelectedModel(model)}>Book Now</button>
                </div>
              </div>
            ))}
            {filteredModels.length === 0 && <p style={{textAlign:'center', gridColumn:'1/-1', marginTop:'20px'}}>No models added to this category yet.</p>}
          </div>
        )}
      </div>
      {selectedModel && <BookingModal model={selectedModel} onClose={() => setSelectedModel(null)} />}
    </>
  );
};

export default Models;


