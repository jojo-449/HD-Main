// const { Resend } = require('resend');
// const Application = require('../models/Application'); 

// const resend = new Resend(process.env.RESEND_API_KEY);

// const submitApplication = async (req, res) => {
//   try {
//     const { 
//       fullName, email, whatsappNumber, instagramHandle, 
//       dateOfBirth, age, location, height, dressSize, bust, waist, hips, 
//       shoeSize, hairColor, eyeColor, experience, portfolioLink, 
//       previousWork, motivation, availability 
//     } = req.body;

//     // --- 1. SAVE TO MONGODB ---
//     const photoNames = req.files ? req.files.map(f => f.originalname) : [];

//     const newApplication = await Application.create({
//       fullName,
//       email,
//       whatsappNumber,
//       instagramHandle,
//       personalDetails: { dateOfBirth, age, location },
//       measurements: { height, dressSize, bust, waist, hips, shoeSize, hairColor, eyeColor },
//       experienceDetails: { experience, portfolioLink, previousWork },
//       photos: photoNames,
//       additionalInfo: { motivation, availability }
//     });

//     // --- 2. PREPARE ATTACHMENTS ---
//     const attachments = req.files ? req.files.map((file) => ({
//       filename: file.originalname,
//       content: file.buffer,
//     })) : [];

//     // --- 3. SEND EMAIL TO ADMIN ---
//     // Now sending FROM your verified domain
//     await resend.emails.send({
//       from: 'Honey Drop Applications <info@honeydropempire.xyz>', 
//       to: 'hello.hdmodels@gmail.com', // Admin Email
//       subject: `New Model Application: ${fullName}`,
//       html: `
//         <h1>New Application Received</h1>
//         <p><strong>Name:</strong> ${fullName}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Phone:</strong> ${whatsappNumber}</p>
//         <p><strong>Instagram:</strong> ${instagramHandle}</p>
//         <hr/>
//         <h3>Measurements</h3>
//         <p>Height: ${height} | Bust: ${bust} | Waist: ${waist} | Hips: ${hips}</p>
//         <hr/>
//         <p><strong>Full details saved in Database ID:</strong> ${newApplication._id}</p>
//         <p><em>Photos are attached to this email.</em></p>
//       `,
//       attachments: attachments
//     });

//     // --- 4. SEND CONFIRMATION TO APPLICANT ---
//     // This works now because you verified the domain!
//     await resend.emails.send({
//       from: 'Honey Drop Models <info@honeydropempire.xyz>',
//       to: email, // <--- Sends to the actual applicant
//       subject: 'Application Received - Honey Drop Empire',
//       html: `
//         <div style="font-family: sans-serif; color: #333;">
//           <h2 style="color: #0047ab;">Hello ${fullName},</h2>
//           <p>Thank you for applying to join <strong>Honey Drop Modelling Agency</strong>.</p>
//           <p>We have successfully received your application. Our scouting team will review your profile and photos.</p>
          
//           <p><strong>Next Steps:</strong></p>
//           <ul>
//             <li>If your profile matches our current requirements, we will contact you via Email or WhatsApp.</li>
//             <li>Due to high volume, if you don't hear back within 14 days, please assume we are not proceeding at this time.</li>
//           </ul>
          
//           <br/>
//           <p>Best Regards,</p>
//           <p><strong>The Honey Drop Team</strong></p>
//         </div>
//       `
//     });

//     console.log("✅ Emails sent to Admin and Applicant.");
//     res.status(201).json({ success: true, message: 'Application Submitted Successfully' });

//   } catch (error) {
//     console.error("🔥 Error:", error);
//     // Even if email fails, we return 500 so frontend knows something went wrong
//     res.status(500).json({ success: false, message: "Server Error: " + error.message });
//   }
// };

// module.exports = { submitApplication };


// const { Resend } = require('resend');
// const Application = require('../models/Application'); 

// const resend = new Resend(process.env.RESEND_API_KEY);

// const submitApplication = async (req, res) => {
//   try {
//     const { 
//       fullName, email, whatsappNumber, instagramHandle, 
//       dateOfBirth, age, location, height, dressSize, bust, waist, hips, 
//       shoeSize, hairColor, eyeColor, experience, portfolioLink, 
//       previousWork, motivation, availability 
//     } = req.body;

//     // --- 1. SAVE TO MONGODB ---
//     const photoNames = req.files ? req.files.map(f => f.originalname) : [];

//     const newApplication = await Application.create({
//       fullName,
//       email,
//       whatsappNumber,
//       instagramHandle,
//       personalDetails: { dateOfBirth, age, location },
//       measurements: { height, dressSize, bust, waist, hips, shoeSize, hairColor, eyeColor },
//       experienceDetails: { experience, portfolioLink, previousWork },
//       photos: photoNames,
//       additionalInfo: { motivation, availability }
//     });

//     // --- 2. PREPARE ATTACHMENTS ---
//     const attachments = req.files ? req.files.map((file) => ({
//       filename: file.originalname,
//       content: file.buffer,
//     })) : [];

//     // --- 3. SEND EMAIL TO ADMIN ---
//     await resend.emails.send({
//       from: 'Honey Drop Applications <info@honeydropempire.xyz>',
//       to: 'hello.hdmodels@gmail.com', // <--- FIXED: Lowercase
//       // Changing subject to "Submission ID" helps avoid Promotions tab
//       subject: `Application #${newApplication._id.toString().slice(-6)}: ${fullName}`, 
//       html: `
//         <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
//           <h2 style="color: #0047ab; border-bottom: 2px solid #0047ab;">Model Application Details</h2>
          
//           <p><strong>Applicant:</strong> ${fullName}</p>
//           <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
//           <p><strong>WhatsApp:</strong> <a href="https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}">${whatsappNumber}</a></p>
//           <p><strong>Instagram:</strong> <a href="${portfolioLink || '#'}">${instagramHandle}</a></p>
//           <p><strong>Location:</strong> ${location} (Age: ${age})</p>

//           <hr style="border: 0; border-top: 1px solid #eee; margin: 15px 0;" />

//           <h3 style="margin-top: 0;">Measurements</h3>
//           <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
//             <tr>
//               <td style="padding: 5px; border-bottom: 1px solid #eee;"><strong>Height:</strong> ${height}</td>
//               <td style="padding: 5px; border-bottom: 1px solid #eee;"><strong>Dress:</strong> ${dressSize}</td>
//             </tr>
//             <tr>
//               <td style="padding: 5px; border-bottom: 1px solid #eee;"><strong>Bust:</strong> ${bust}</td>
//               <td style="padding: 5px; border-bottom: 1px solid #eee;"><strong>Waist:</strong> ${waist}</td>
//             </tr>
//             <tr>
//               <td style="padding: 5px; border-bottom: 1px solid #eee;"><strong>Hips:</strong> ${hips}</td>
//               <td style="padding: 5px; border-bottom: 1px solid #eee;"><strong>Shoe:</strong> ${shoeSize}</td>
//             </tr>
//             <tr>
//               <td style="padding: 5px; border-bottom: 1px solid #eee;"><strong>Hair:</strong> ${hairColor}</td>
//               <td style="padding: 5px; border-bottom: 1px solid #eee;"><strong>Eyes:</strong> ${eyeColor}</td>
//             </tr>
//           </table>

//           <h3 style="margin-top: 15px;">Experience</h3>
//           <p><strong>Level:</strong> ${experience}</p>
//           <p><strong>Previous Work:</strong><br/>${previousWork || 'None provided'}</p>
//           <p><strong>Motivation:</strong><br/>${motivation}</p>
//           <p><strong>Availability:</strong> ${availability}</p>

//           <br />
//           <p style="font-size: 12px; color: #888;">
//             Sent from Honey Drop Empire Website.<br/>
//             Files are attached to this email.
//           </p>
//         </div>
//       `,
//       attachments: attachments
//     });

//     // --- 4. SEND CONFIRMATION TO APPLICANT ---
//     await resend.emails.send({
//       from: 'Honey Drop Models <info@honeydropempire.xyz>',
//       to: email, 
//       subject: 'Application Received - Honey Drop Empire',
//       html: `
//         <div style="font-family: Arial, sans-serif; color: #333;">
//           <h2 style="color: #0047ab;">Hello ${fullName},</h2>
//           <p>Thank you for applying to join <strong>Honey Drop Modelling Agency</strong>.</p>
//           <p>We have successfully received your full application, measurements, and photos. Our scouting team will review your profile shortly.</p>
          
//           <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
//             <strong>Next Steps:</strong>
//             <ul style="margin-bottom: 0; padding-left: 20px;">
//               <li>Our team reviews applications on a rolling basis.</li>
//               <li>If your profile matches our current requirements, we will contact you via WhatsApp or Email.</li>
//             </ul>
//           </div>

//           <p>Due to the high volume of applications, if you do not hear from us within 14 days, please assume that we are not proceeding with your application at this time.</p>
          
//           <br/>
//           <p>Best Regards,</p>
//           <p><strong>The Honey Drop Team</strong></p>
//         </div>
//       `
//     });

//     console.log("✅ Emails sent successfully.");
//     res.status(201).json({ success: true, message: 'Application Submitted Successfully' });

//   } catch (error) {
//     console.error("🔥 Error:", error);
//     res.status(500).json({ success: false, message: "Server Error: " + error.message });
//   }
// };

// module.exports = { submitApplication };


const { Resend } = require('resend');
const Application = require('../models/Application'); 

const resend = new Resend(process.env.RESEND_API_KEY);

const submitApplication = async (req, res) => {
  try {
    const { 
      fullName, email, whatsappNumber, instagramHandle, 
      dateOfBirth, age, location, height, dressSize, bust, waist, hips, 
      shoeSize, hairColor, eyeColor, experience, portfolioLink, 
      previousWork, motivation, availability 
    } = req.body;

    // --- 1. SAVE TO MONGODB ---
    const photoNames = req.files ? req.files.map(f => f.originalname) : [];

    const newApplication = await Application.create({
      fullName,
      email,
      whatsappNumber,
      instagramHandle,
      personalDetails: { dateOfBirth, age, location },
      measurements: { height, dressSize, bust, waist, hips, shoeSize, hairColor, eyeColor },
      experienceDetails: { experience, portfolioLink, previousWork },
      photos: photoNames,
      additionalInfo: { motivation, availability }
    });

    // --- 2. PREPARE ATTACHMENTS ---
    const attachments = req.files ? req.files.map((file) => ({
      filename: file.originalname,
      content: file.buffer,
    })) : [];

    // Clean up Instagram handle (remove @ if present) for the link
    const cleanIgHandle = instagramHandle ? instagramHandle.replace('@', '') : '';

    // --- 3. SEND EMAIL TO ADMIN ---
    await resend.emails.send({
      from: 'Honey Drop Applications <info@honeydropempire.xyz>',
      to: 'hello.hdmodels@gmail.com', 
      subject: `Application #${newApplication._id.toString().slice(-6)}: ${fullName}`, 
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0047ab; border-bottom: 2px solid #0047ab;">Model Application Details</h2>
          
          <h3 style="background-color: #f4f4f4; padding: 10px;">👤 Personal Information</h3>
          <p><strong>Applicant:</strong> ${fullName}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>WhatsApp:</strong> <a href="https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}">${whatsappNumber}</a></p>
          
          <!-- FIXED: Instagram Link points to Instagram -->
          <p><strong>Instagram:</strong> <a href="https://instagram.com/${cleanIgHandle}">${instagramHandle}</a></p>
          
          <p><strong>Location:</strong> ${location} (Age: ${age})</p>

          <h3 style="background-color: #f4f4f4; padding: 10px; margin-top: 20px;">📏 Measurements</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 5px; border-bottom: 1px solid #eee;"><strong>Height:</strong> ${height}</td>
              <td style="padding: 5px; border-bottom: 1px solid #eee;"><strong>Dress:</strong> ${dressSize}</td>
            </tr>
            <tr>
              <td style="padding: 5px; border-bottom: 1px solid #eee;"><strong>Bust:</strong> ${bust}</td>
              <td style="padding: 5px; border-bottom: 1px solid #eee;"><strong>Waist:</strong> ${waist}</td>
            </tr>
            <tr>
              <td style="padding: 5px; border-bottom: 1px solid #eee;"><strong>Hips:</strong> ${hips}</td>
              <td style="padding: 5px; border-bottom: 1px solid #eee;"><strong>Shoe:</strong> ${shoeSize}</td>
            </tr>
            <tr>
              <td style="padding: 5px; border-bottom: 1px solid #eee;"><strong>Hair:</strong> ${hairColor}</td>
              <td style="padding: 5px; border-bottom: 1px solid #eee;"><strong>Eyes:</strong> ${eyeColor}</td>
            </tr>
          </table>

          <h3 style="background-color: #f4f4f4; padding: 10px; margin-top: 20px;">🌟 Experience & Portfolio</h3>
          <p><strong>Level:</strong> ${experience}</p>
          
          <!-- FIXED: Portfolio Link is now explicitly shown here -->
          <div style="background: #eef; padding: 10px; border-left: 4px solid #0047ab; margin: 10px 0;">
             <strong>🔗 Portfolio Link:</strong><br/>
             <a href="${portfolioLink}">${portfolioLink || 'Not provided'}</a>
          </div>

          <p><strong>Previous Work:</strong><br/>${previousWork || 'None provided'}</p>

          <h3 style="background-color: #f4f4f4; padding: 10px; margin-top: 20px;">ℹ️ Additional Info</h3>
          <p><strong>Motivation:</strong><br/>${motivation}</p>
          <p><strong>Availability:</strong> ${availability}</p>

          <br />
          <p style="font-size: 12px; color: #888;">
            Sent from Honey Drop Empire Website.<br/>
            Files are attached to this email.
          </p>
        </div>
      `,
      attachments: attachments
    });

    // --- 4. SEND CONFIRMATION TO APPLICANT ---
    await resend.emails.send({
      from: 'Honey Drop Models <info@honeydropempire.xyz>',
      to: email, 
      subject: 'Application Received - Honey Drop Empire',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #0047ab;">Hello ${fullName},</h2>
          <p>Thank you for applying to join <strong>Honey Drop Modelling Agency</strong>.</p>
          <p>We have successfully received your application. Our team will review your profile shortly.</p>
          <br/>
          <p>Best Regards,</p>
          <p><strong>The Honey Drop Team</strong></p>
        </div>
      `
    });

    console.log("✅ Emails sent successfully.");
    res.status(201).json({ success: true, message: 'Application Submitted Successfully' });

  } catch (error) {
    console.error("🔥 Error:", error);
    res.status(500).json({ success: false, message: "Server Error: " + error.message });
  }
};

module.exports = { submitApplication };