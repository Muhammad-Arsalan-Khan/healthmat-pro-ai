// // import React, { useRef, useState } from "react";
// // import { useParams } from 'react-router-dom';
// // // API_URL ko apni Express server URL se change karein
// // const API_URL = "http://localhost:5000/api"; 
// // import {
// //   Box,
// //   Container,
// //   Paper,
// //   Typography,
// //   IconButton,
// //   InputBase,
// //   Avatar,
// //   Stack,
// //   Chip,
// //   Divider,
// //   Tooltip,
// //   CircularProgress, // Import added
// // } from "@mui/material";
// // import AddIcon from "@mui/icons-material/Add";
// // import SendIcon from "@mui/icons-material/Send";
// // import CloseIcon from "@mui/icons-material/Close";
// // import DescriptionIcon from "@mui/icons-material/Description";

// // export default function UserContent() {
// //   const fileRef = useRef(null);
// //   const { id } = useParams();
// //   const [file, setFile] = useState(null); 
// //   const [messages, setMessages] = useState([
// //     { id: 1, from: "bot", text: "Assalamualaikum! Apni report upload kijiye ya yahan type karke bat kijiye." },
// //   ]);
// //   const [text, setText] = useState("");
// //   const [loading, setLoading] = useState(false); // Loading state
// //   const [error, setError] = useState(""); // Error state

// //   const pickFile = () => fileRef.current?.click();

// //   function handleFile(e) {
// //     const f = e.target.files?.[0];
// //     if (!f) return;
    
// //     // Asli File object store karein
// //     setFile(f); 
// //     setMessages((m) => [
// //       ...m,
// //       { id: Date.now(), from: "user", text: `Uploaded: ${f.name} (${(f.size / 1024 / 1024).toFixed(2)} MB)` },
// //     ]);
// //     // Input ko reset karein taaki same file dobara select ho sake
// //     e.target.value = null; 
// //   }

// //   const sendMessage = async () => {
// //     if ((!text.trim() && !file) || loading) return;
// //     console.log(id)
// //     setLoading(true);
// //     setError("");

// //     // 1. User ka message UI mein add karna
// //     const userMsgText = text.trim();
// //     const fileAttachMsg = file ? ` + (Report: ${file.name})` : '';
// //     setMessages((m) => [...m, { id: Date.now(), from: "user", text: userMsgText + fileAttachMsg }]);
    
// //     // 2. FormData tayyar karna
// //     const formData = new FormData();
    
// //     if (userMsgText) {
// //         formData.append('text', userMsgText);
// //     }

// //     // 🚩 'medicalReportFile' field name Controller se match hona chahiye
// //     if (file) {
// //         formData.append('medicalReportFile', file);
// //     }

// //     // Input fields ko clear karna
// //     setText("");
// //     // const currentFile = file; // Save current file for local display logic if needed
// //     setFile(null); // Clear file state for next interaction

// //     try {
// //         // 3. API Call karna
// //         const response = await fetch(`${API_URL}/analyze-combined/${id}`, {
// //             method: 'POST',
// //             // Auth token bhejne ke liye agar authCheck laga ho:
// //             // headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
// //             body: formData,
// //         });

// //         const data = await response.json();

// //         if (response.ok) {
// //             // Success: AI ka jawab messages array mein add karna
// //             setMessages((m) => [
// //                 ...m,
// //                 { 
// //                     id: Date.now() + 1, 
// //                     from: "bot", 
// //                     text: data.analysis || "Analysis complete, lekin jawab khali hai.",
// //                 },
// //             ]);
// //         } else {
// //             // Error: Server side error
// //             setError(data.error || "AI Analysis mein masla ho gaya. Server check karein.");
// //             setMessages((m) => [
// //                 ...m,
// //                 { 
// //                     id: Date.now() + 1, 
// //                     from: "bot", 
// //                     text: `❌ Error: ${data.error || "Server se ghalati hui."}` 
// //                 },
// //             ]);
// //         }
// //     } catch (err) {
// //         // Network ya fetch error
// //         console.error("Fetch Error:", err);
// //         setError("Network error ya API tak pahunchne mein masla.");
// //          setMessages((m) => [
// //             ...m,
// //             { 
// //                 id: Date.now() + 1, 
// //                 from: "bot", 
// //                 text: "❌ Network Error: Kirpya apna internet connection check karein." 
// //             },
// //         ]);
// //     } finally {
// //         setLoading(false);
// //     }
// //   };

// //   return (
// //     <Box 
// //       sx={{ 
// //         minHeight: "100vh", 
// //         background: "linear-gradient(135deg, #0a1628 0%, #0f1d2e 50%, #071219 100%)",
// //         color: "#e6f4ea", 
// //         py: 6 
// //       }}
// //     >
// //       <Container maxWidth="lg">
// //         {/* Premium Header */}
// //         <Box
// //           sx={{
// //             opacity: 0,
// //             animation: "fadeInDown 0.8s ease forwards",
// //             "@keyframes fadeInDown": {
// //               from: { opacity: 0, transform: "translateY(-30px)" },
// //               to: { opacity: 1, transform: "translateY(0)" }
// //             }
// //           }}
// //         >
// //           <Stack direction="row" alignItems="center" spacing={3} sx={{ mb: 5 }}>
// //             <Box
// //               sx={{
// //                 background: "linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)",
// //                 borderRadius: "20px",
// //                 p: 2,
// //                 boxShadow: "0 8px 32px rgba(46, 125, 50, 0.3)"
// //               }}
// //             >
// //               <Avatar sx={{ bgcolor: "transparent", width: 64, height: 64, fontSize: "2rem" }}>
// //                 🏥
// //               </Avatar>
// //             </Box>
// //             <Box>
// //               <Typography 
// //                 variant="h3" 
// //                 sx={{ 
// //                   fontWeight: 900,
// //                   background: "linear-gradient(90deg, #b9f6ca 0%, #69f0ae 100%)",
// //                   backgroundClip: "text",
// //                   WebkitBackgroundClip: "text",
// //                   WebkitTextFillColor: "transparent",
// //                   letterSpacing: "-0.5px"
// //                 }}
// //               >
// //                 HealthMate Pro
// //               </Typography>
// //               <Typography variant="body1" sx={{ opacity: 0.85, mt: 0.5, fontSize: "1.1rem" }}>
// //                 🤖 AI-Powered Medical Report Analysis — Bilingual Support (English + Roman Urdu)
// //               </Typography>
// //             </Box>
// //           </Stack>
// //         </Box>

// //         {/* Main Premium Card */}
// //         <Box
// //           sx={{
// //             opacity: 0,
// //             animation: "fadeInUp 0.8s ease 0.2s forwards",
// //             "@keyframes fadeInUp": {
// //               from: { opacity: 0, transform: "translateY(30px)" },
// //               to: { opacity: 1, transform: "translateY(0)" }
// //             }
// //           }}
// //         >
// //           <Paper 
// //             elevation={24} 
// //             sx={{ 
// //               borderRadius: 4, 
// //               overflow: "hidden",
// //               background: "linear-gradient(180deg, #132337 0%, #0a1525 100%)",
// //               border: "1px solid rgba(185, 246, 202, 0.1)",
// //               boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)"
// //             }}
// //           >
// //             <Box sx={{ display: "flex", gap: 3, p: 3 }}>
// //               {/* Left: Enhanced Chat Area */}
// //               <Box sx={{ flex: 1, minHeight: 500 }}>
// //                 <Box 
// //                   sx={{ 
// //                     p: 3,
// //                     background: "linear-gradient(90deg, rgba(46, 125, 50, 0.1) 0%, rgba(105, 240, 174, 0.05) 100%)",
// //                     borderRadius: 2,
// //                     mb: 2
// //                   }}
// //                 >
// //                   <Typography variant="h5" sx={{ fontWeight: 800, color: "#b9f6ca" }}>
// //                     💬 Smart Medical Assistant
// //                   </Typography>
// //                   <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
// //                     Apni medical reports upload karein ya sawal puchein. Humara HealthMate Pro AI aapko instant analysis provide karega.
// //                   </Typography>
// //                 </Box>

// //                 <Divider sx={{ borderColor: "rgba(185, 246, 202, 0.1)", mb: 2 }} />

// //                 {/* Messages Container */}
// //                 <Box 
// //                   sx={{ 
// //                     p: 2, 
// //                     height: 340, 
// //                     overflowY: "auto", 
// //                     display: "flex", 
// //                     flexDirection: "column", 
// //                     gap: 2,
// //                     "&::-webkit-scrollbar": { width: "8px" },
// //                     "&::-webkit-scrollbar-track": { background: "rgba(255,255,255,0.02)" },
// //                     "&::-webkit-scrollbar-thumb": { 
// //                       background: "rgba(185, 246, 202, 0.2)", 
// //                       borderRadius: "10px" 
// //                     }
// //                   }}
// //                 >
// //                   {messages.map((m, idx) => (
// //                     <Box
// //                       key={m.id}
// //                       sx={{
// //                         opacity: 0,
// //                         animation: `slideIn 0.4s ease ${idx * 0.1}s forwards`,
// //                         "@keyframes slideIn": {
// //                           from: { opacity: 0, transform: "translateX(-20px)" },
// //                           to: { opacity: 1, transform: "translateX(0)" }
// //                         }
// //                       }}
// //                     >
// //                       <Stack
// //                         direction="row"
// //                         spacing={2}
// //                         sx={{ justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}
// //                       >
// //                         {m.from === "bot" && (
// //                           <Avatar 
// //                             sx={{ 
// //                               width: 40, 
// //                               height: 40, 
// //                               background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)",
// //                               boxShadow: "0 4px 12px rgba(46, 125, 50, 0.4)"
// //                             }}
// //                           >
// //                             🤖
// //                           </Avatar>
// //                         )}

// //                         <Box
// //                           sx={{
// //                             maxWidth: "75%",
// //                             background: m.from === "user" 
// //                               ? "linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)" 
// //                               : "rgba(255,255,255,0.06)",
// //                             color: "#e6f4ea",
// //                             px: 3,
// //                             py: 2,
// //                             borderRadius: 3,
// //                             boxShadow: m.from === "user" 
// //                               ? "0 4px 16px rgba(46, 125, 50, 0.3)" 
// //                               : "0 2px 8px rgba(0, 0, 0, 0.2)",
// //                             border: m.from === "bot" ? "1px solid rgba(185, 246, 202, 0.1)" : "none"
// //                           }}
// //                         >
// //                           <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
// //                             {m.text}
// //                           </Typography>
// //                         </Box>

// //                         {m.from === "user" && (
// //                           <Avatar 
// //                             sx={{ 
// //                               width: 40, 
// //                               height: 40, 
// //                               background: "linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)",
// //                               boxShadow: "0 4px 12px rgba(76, 175, 80, 0.4)"
// //                             }}
// //                           >
// //                             👤
// //                           </Avatar>
// //                         )}
// //                       </Stack>
// //                     </Box>
// //                   ))}
// //                 </Box>

// //                 {/* Premium Input Area */}
// //                 <Box 
// //                   sx={{ 
// //                     p: 2, 
// //                     borderTop: "2px solid rgba(185, 246, 202, 0.1)", 
// //                     display: "flex", 
// //                     alignItems: "center", 
// //                     gap: 2,
// //                     background: "rgba(255,255,255,0.02)"
// //                   }}
// //                 >
// //                   <input ref={fileRef} type="file" accept="application/pdf,image/*" hidden onChange={handleFile} />

// //                   <Tooltip title="Upload Medical Report" arrow>
// //                     <IconButton 
// //                       onClick={pickFile} 
// //                       disabled={loading} // Loading mein disable
// //                       sx={{ 
// //                         background: "linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)",
// //                         color: "white",
// //                         transition: "all 0.3s ease",
// //                         "&:hover": { 
// //                           background: "linear-gradient(135deg, #388e3c 0%, #66bb6a 100%)",
// //                           transform: "scale(1.1)"
// //                         }
// //                       }}
// //                     >
// //                       <AddIcon />
// //                     </IconButton>
// //                   </Tooltip>

// //                   <Paper 
// //                     sx={{ 
// //                       flex: 1, 
// //                       display: "flex", 
// //                       alignItems: "center", 
// //                       px: 3, 
// //                       py: 1.5,
// //                       background: "rgba(255,255,255,0.05)",
// //                       border: "1px solid rgba(185, 246, 202, 0.2)",
// //                       borderRadius: 3,
// //                       transition: "all 0.3s ease",
// //                       "&:hover": {
// //                         border: "1px solid rgba(185, 246, 202, 0.4)",
// //                         background: "rgba(255,255,255,0.08)"
// //                       }
// //                     }} 
// //                     elevation={0}
// //                   >
// //                     <InputBase
// //                       placeholder="Apna sawal yahan likhein aur Enter dabayein..."
// //                       fullWidth
// //                       value={text}
// //                       onChange={(e) => setText(e.target.value)}
// //                       onKeyDown={(e) => {
// //                           if (e.key === "Enter" && (text.trim() || file) && !loading) sendMessage();
// //                       }}
// //                       sx={{ color: "#e6f4ea", fontSize: "1rem" }}
// //                       disabled={loading} // Loading mein disable
// //                     />
// //                     <IconButton 
// //                       onClick={sendMessage}
// //                       disabled={(!text.trim() && !file) || loading} // Agar text aur file dono na ho ya loading ho toh disable
// //                       sx={{
// //                         color: "#b9f6ca",
// //                         transition: "all 0.2s ease",
// //                         "&:hover": { 
// //                           color: "#69f0ae",
// //                           transform: "scale(1.1)"
// //                         }
// //                       }}
// //                     >
// //                       {loading ? <CircularProgress size={24} sx={{ color: '#b9f6ca' }} /> : <SendIcon />}
// //                     </IconButton>
// //                   </Paper>
// //                 </Box>
                
// //                 {/* Error Message Display */}
// //                 {error && (
// //                     <Typography color="error" sx={{ mt: 2, textAlign: 'center', fontWeight: 600 }}>
// //                         🚨 {error}
// //                     </Typography>
// //                 )}

// //               </Box>
// // <Box 
// //   sx={{ 
// //     width: 380, 
// //     background: "linear-gradient(180deg, rgba(18, 35, 55, 0.8) 0%, rgba(10, 21, 37, 0.9) 100%)",
// //     p: 3, 
// //     display: "flex", 
// //     flexDirection: "column", 
// //     gap: 3,
// //     borderRadius: 2,
// //     border: "1px solid rgba(185, 246, 202, 0.1)"
// //   }}
// // >
// //   <Typography 
// //     variant="h6" 
// //     sx={{ 
// //       fontWeight: 800,
// //       color: "#b9f6ca",
// //       borderBottom: "2px solid rgba(185, 246, 202, 0.2)",
// //       pb: 1,
// //       display: "flex",
// //       alignItems: "center",
// //       gap: 1
// //     }}
// //   >
// //     📋 Report History
// //     <Chip 
// //       label={messages.filter(m => m.from === "user").length} 
// //       size="small"
// //       sx={{ 
// //         ml: "auto",
// //         background: "rgba(185, 246, 202, 0.2)",
// //         color: "#b9f6ca",
// //         fontWeight: 700
// //       }}
// //     />
// //   </Typography>

// //   {/* History List */}
// //   <Box 
// //     sx={{ 
// //       flex: 1,
// //       overflowY: "auto",
// //       display: "flex",
// //       flexDirection: "column",
// //       gap: 2,
// //       "&::-webkit-scrollbar": { width: "6px" },
// //       "&::-webkit-scrollbar-track": { background: "rgba(255,255,255,0.02)" },
// //       "&::-webkit-scrollbar-thumb": { 
// //         background: "rgba(185, 246, 202, 0.2)", 
// //         borderRadius: "10px" 
// //       }
// //     }}
// //   >
// //     {messages.filter(m => m.from === "user").length === 0 ? (
// //       <Paper 
// //         elevation={4}
// //         sx={{ 
// //           p: 4, 
// //           borderRadius: 3, 
// //           background: "rgba(255,255,255,0.04)",
// //           border: "2px dashed rgba(185, 246, 202, 0.15)",
// //           textAlign: "center"
// //         }}
// //       >
// //         <DescriptionIcon sx={{ fontSize: 64, color: "#4caf50", opacity: 0.5, mb: 2 }} />
// //         <Typography variant="body2" sx={{ color: "#b9f6ca", opacity: 0.7 }}>
// //           No reports uploaded yet
// //         </Typography>
// //         <Typography variant="caption" sx={{ color: "#69f0ae", opacity: 0.6, display: "block", mt: 1 }}>
// //           Upload your first medical report to get started
// //         </Typography>
// //       </Paper>
// //     ) : (
// //       messages
// //         .filter(m => m.from === "user")
// //         .reverse()
// //         .map((msg, idx) => (
// //           <Paper 
// //             key={msg.id}
// //             elevation={6}
// //             sx={{ 
// //               p: 2.5, 
// //               borderRadius: 3, 
// //               background: "rgba(255,255,255,0.04)",
// //               border: "1px solid rgba(185, 246, 202, 0.15)",
// //               transition: "all 0.3s ease",
// //               cursor: "pointer",
// //               "&:hover": {
// //                 background: "rgba(255,255,255,0.08)",
// //                 border: "1px solid rgba(185, 246, 202, 0.3)",
// //                 transform: "translateX(-4px)",
// //                 boxShadow: "0 8px 24px rgba(46, 125, 50, 0.2)"
// //               }
// //             }}
// //           >
// //             <Stack direction="row" spacing={2} alignItems="flex-start">
// //               <Avatar 
// //                 sx={{ 
// //                   width: 40, 
// //                   height: 40,
// //                   background: "linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)",
// //                   fontWeight: 700
// //                 }}
// //               >
// //                 {idx + 1}
// //               </Avatar>
// //               <Box sx={{ flex: 1, minWidth: 0 }}>
// //                 <Typography 
// //                   variant="subtitle2" 
// //                   sx={{ 
// //                     fontWeight: 700, 
// //                     color: "#b9f6ca",
// //                     mb: 0.5,
// //                     overflow: "hidden",
// //                     textOverflow: "ellipsis",
// //                     whiteSpace: "nowrap"
// //                   }}
// //                 >
// //                   {msg.text.includes("Uploaded:") ? "📄 " + msg.text.split("Uploaded:")[1].trim() : "💬 " + msg.text}
// //                 </Typography>
// //                 <Typography variant="caption" sx={{ color: "#69f0ae", opacity: 0.7 }}>
// //                   {new Date(msg.id).toLocaleString('en-US', { 
// //                     month: 'short', 
// //                     day: 'numeric',
// //                     hour: '2-digit',
// //                     minute: '2-digit'
// //                   })}
// //                 </Typography>
// //               </Box>
// //               <IconButton 
// //                 size="small"
// //                 onClick={(e) => {
// //                   e.stopPropagation();
// //                   setMessages(messages.filter(m => m.id !== msg.id));
// //                 }}
// //                 sx={{
// //                   color: "#ff8a80",
// //                   opacity: 0.6,
// //                   transition: "all 0.2s ease",
// //                   "&:hover": {
// //                     opacity: 1,
// //                     transform: "scale(1.15)",
// //                     background: "rgba(255, 138, 128, 0.1)"
// //                   }
// //                 }}
// //               >
// //                 <CloseIcon sx={{ fontSize: 18 }} />
// //               </IconButton>
// //             </Stack>
// //           </Paper>
// //         ))
// //     )}
// //   </Box>

// //   {/* Current Upload Info */}
// //   {file && (
// //     <Paper 
// //       elevation={8}
// //       sx={{ 
// //         p: 2.5, 
// //         borderRadius: 3, 
// //         background: "linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(102, 187, 106, 0.1) 100%)",
// //         border: "2px solid rgba(76, 175, 80, 0.3)",
// //         animation: "pulse 2s infinite",
// //         "@keyframes pulse": {
// //           "0%, 100%": { borderColor: "rgba(76, 175, 80, 0.3)" },
// //           "50%": { borderColor: "rgba(76, 175, 80, 0.6)" }
// //         }
// //       }}
// //     >
// //       <Stack direction="row" spacing={2} alignItems="center">
// //         <Avatar 
// //           sx={{ 
// //             background: "linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)",
// //             boxShadow: "0 4px 12px rgba(76, 175, 80, 0.4)"
// //           }}
// //         >
// //           📎
// //         </Avatar>
// //         <Box sx={{ flex: 1, minWidth: 0 }}>
// //           <Typography 
// //             variant="subtitle2" 
// //             sx={{ 
// //               fontWeight: 700, 
// //               color: "#b9f6ca",
// //               overflow: "hidden",
// //               textOverflow: "ellipsis",
// //               whiteSpace: "nowrap"
// //             }}
// //           >
// //             {file.name}
// //           </Typography>
// //           <Typography variant="caption" sx={{ color: "#69f0ae" }}>
// //             📊 {(file.size / 1024).toFixed(1)} KB • Ready to send
// //           </Typography>
// //         </Box>
// //         <IconButton 
// //           size="small"
// //           onClick={() => setFile(null)}
// //           sx={{
// //             color: "#ff8a80",
// //             transition: "all 0.2s ease",
// //             "&:hover": {
// //               transform: "scale(1.15)",
// //               background: "rgba(255, 138, 128, 0.2)"
// //             }
// //           }}
// //         >
// //           <CloseIcon />
// //         </IconButton>
// //       </Stack>
// //     </Paper>
// //   )}

// //   <Divider sx={{ borderColor: "rgba(185, 246, 202, 0.1)" }} />

// //   {/* Features Info */}
// //   <Stack spacing={1.5}>
// //     <Chip 
// //       label="🌐 Bilingual: English + Roman Urdu" 
// //       size="small"
// //       sx={{ 
// //         background: "rgba(185, 246, 202, 0.1)",
// //         color: "#b9f6ca",
// //         border: "1px solid rgba(185, 246, 202, 0.2)",
// //         fontWeight: 600,
// //         fontSize: "0.8rem",
// //         justifyContent: "flex-start"
// //       }} 
// //     />
// //     <Chip 
// //       label="🧠 HealthMate Pro AI Analysis" 
// //       size="small"
// //       sx={{ 
// //         background: "rgba(105, 240, 174, 0.1)",
// //         color: "#69f0ae",
// //         border: "1px solid rgba(105, 240, 174, 0.2)",
// //         fontWeight: 600,
// //         fontSize: "0.8rem",
// //         justifyContent: "flex-start"
// //       }} 
// //     />
// //     <Chip 
// //       label="🔒 Secure (JWT + Encryption)" 
// //       size="small"
// //       sx={{ 
// //         background: "rgba(185, 246, 202, 0.08)",
// //         color: "#b9f6ca",
// //         border: "1px solid rgba(185, 246, 202, 0.15)",
// //         fontWeight: 600,
// //         fontSize: "0.8rem",
// //         justifyContent: "flex-start"
// //       }} 
// //     />
// //   </Stack>
// // </Box>
// //             </Box>

// //             {/* Premium Footer */}
// //             <Box 
// //               sx={{ 
// //                 p: 2, 
// //                 textAlign: "center", 
// //                 background: "rgba(0,0,0,0.4)",
// //                 borderTop: "1px solid rgba(185, 246, 202, 0.1)"
// //               }}
// //             >
// //               <Typography variant="caption" sx={{ color: "#b9f6ca", fontSize: "0.85rem" }}>
// //                 © 2025 HealthMate Pro — AI-powered analysis for understanding only, not medical advice. Always consult a healthcare professional.
// //               </Typography>
// //             </Box>
// //           </Paper>
// //         </Box>
// //       </Container>
// //     </Box>
// //   );
// // }

// import React, { useRef, useState, useEffect } from "react";
// import { useParams } from 'react-router-dom';
// import {
//   Box,
//   Container,
//   Paper,
//   Typography,
//   IconButton,
//   InputBase,
//   Avatar,
//   Stack,
//   Chip,
//   Divider,
//   Tooltip,
//   CircularProgress,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import SendIcon from "@mui/icons-material/Send";
// import CloseIcon from "@mui/icons-material/Close";
// import DescriptionIcon from "@mui/icons-material/Description";

// const API_URL = "http://localhost:5000/api";

// export default function UserContent() {
//   const { id } = useParams();
//   const fileRef = useRef(null);
//   const [file, setFile] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [sessionId, setSessionId] = useState(null);

//   // Load today's chat on component mount
//   useEffect(() => {
//     if (id) {
//       loadTodayChat();
//     }
//   }, [id]);

//   const loadTodayChat = async () => {
//     try {
//       const response = await fetch(`${API_URL}/today-chat/${id}`);
//       const data = await response.json();
      
//       if (data.success) {
//         setMessages(data.messages || []);
//         setSessionId(data.sessionId);
//       }
//     } catch (err) {
//       console.error("Error loading chat:", err);
//       // Set default message if API fails
//       setMessages([
//         { 
//           id: Date.now(), 
//           from: "bot", 
//           text: "Assalamualaikum! Apni report upload kijiye ya yahan type karke bat kijiye." 
//         }
//       ]);
//     }
//   };

//   const pickFile = () => {
//     if (fileRef.current) {
//       fileRef.current.click();
//     }
//   };

//   const handleFile = (e) => {
//     const f = e.target.files?.[0];
//     if (!f) return;
    
//     setFile(f);
//     setMessages((m) => [
//       ...m,
//       { 
//         id: Date.now(), 
//         from: "user", 
//         text: `Uploaded: ${f.name} (${(f.size / 1024 / 1024).toFixed(2)} MB)` 
//       },
//     ]);
//     e.target.value = null;
//   };

//   const sendMessage = async () => {
//     if ((!text.trim() && !file) || loading) return;

//     setLoading(true);
//     setError("");

//     const userMsgText = text.trim();
//     const fileAttachMsg = file ? ` + (Report: ${file.name})` : '';
    
//     const userMsg = {
//       id: Date.now(),
//       from: "user",
//       text: userMsgText + fileAttachMsg,
//       timestamp: new Date()
//     };
//     setMessages((m) => [...m, userMsg]);

//     const formData = new FormData();
//     if (userMsgText) {
//       formData.append('text', userMsgText);
//     }
//     if (file) {
//       formData.append('medicalReportFile', file);
//     }

//     setText("");
//     setFile(null);

//     try {
//       const response = await fetch(`${API_URL}/analyze-combined/${id}`, {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await response.json();

//       if (response.ok) {
//         const botMsg = {
//           id: Date.now() + 1,
//           from: "bot",
//           text: data.analysis || "Analysis complete, lekin jawab khali hai.",
//           timestamp: new Date()
//         };
//         setMessages((m) => [...m, botMsg]);
//         if (data.sessionId) {
//           setSessionId(data.sessionId);
//         }
//       } else {
//         setError(data.error || "AI Analysis mein masla ho gaya. Server check karein.");
//         const errorMsg = {
//           id: Date.now() + 1,
//           from: "bot",
//           text: `❌ Error: ${data.error || "Server se ghalati hui."}`
//         };
//         setMessages((m) => [...m, errorMsg]);
//       }
//     } catch (err) {
//       console.error("Fetch Error:", err);
//       setError("Network error ya API tak pahunchne mein masla.");
//       const errorMsg = {
//         id: Date.now() + 1,
//         from: "bot",
//         text: "❌ Network Error: Kirpya apna internet connection check karein."
//       };
//       setMessages((m) => [...m, errorMsg]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteMessage = (msgId) => {
//     setMessages(messages.filter(m => m.id !== msgId));
//   };

//   return (
//     <Box 
//       sx={{ 
//         minHeight: "100vh", 
//         background: "linear-gradient(135deg, #0a1628 0%, #0f1d2e 50%, #071219 100%)",
//         color: "#e6f4ea", 
//         py: 6 
//       }}
//     >
//       <Container maxWidth="lg">
//         {/* Premium Header */}
//         <Box
//           sx={{
//             opacity: 0,
//             animation: "fadeInDown 0.8s ease forwards",
//             "@keyframes fadeInDown": {
//               from: { opacity: 0, transform: "translateY(-30px)" },
//               to: { opacity: 1, transform: "translateY(0)" }
//             }
//           }}
//         >
//           <Stack direction="row" alignItems="center" spacing={3} sx={{ mb: 5 }}>
//             <Box
//               sx={{
//                 background: "linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)",
//                 borderRadius: "20px",
//                 p: 2,
//                 boxShadow: "0 8px 32px rgba(46, 125, 50, 0.3)"
//               }}
//             >
//               <Avatar sx={{ bgcolor: "transparent", width: 64, height: 64, fontSize: "2rem" }}>
//                 🏥
//               </Avatar>
//             </Box>
//             <Box>
//               <Typography 
//                 variant="h3" 
//                 sx={{ 
//                   fontWeight: 900,
//                   background: "linear-gradient(90deg, #b9f6ca 0%, #69f0ae 100%)",
//                   backgroundClip: "text",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   letterSpacing: "-0.5px"
//                 }}
//               >
//                 HealthMate Pro
//               </Typography>
//               <Typography variant="body1" sx={{ opacity: 0.85, mt: 0.5, fontSize: "1.1rem" }}>
//                 🤖 AI-Powered Medical Report Analysis — Bilingual Support (English + Roman Urdu)
//               </Typography>
//             </Box>
//           </Stack>
//         </Box>

//         {/* Main Premium Card */}
//         <Box
//           sx={{
//             opacity: 0,
//             animation: "fadeInUp 0.8s ease 0.2s forwards",
//             "@keyframes fadeInUp": {
//               from: { opacity: 0, transform: "translateY(30px)" },
//               to: { opacity: 1, transform: "translateY(0)" }
//             }
//           }}
//         >
//           <Paper 
//             elevation={24} 
//             sx={{ 
//               borderRadius: 4, 
//               overflow: "hidden",
//               background: "linear-gradient(180deg, #132337 0%, #0a1525 100%)",
//               border: "1px solid rgba(185, 246, 202, 0.1)",
//               boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)"
//             }}
//           >
//             <Box sx={{ display: "flex", gap: 3, p: 3 }}>
//               {/* Left: Enhanced Chat Area */}
//               <Box sx={{ flex: 1, minHeight: 500 }}>
//                 <Box 
//                   sx={{ 
//                     p: 3,
//                     background: "linear-gradient(90deg, rgba(46, 125, 50, 0.1) 0%, rgba(105, 240, 174, 0.05) 100%)",
//                     borderRadius: 2,
//                     mb: 2
//                   }}
//                 >
//                   <Typography variant="h5" sx={{ fontWeight: 800, color: "#b9f6ca" }}>
//                     💬 Smart Medical Assistant
//                   </Typography>
//                   <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
//                     Apni medical reports upload karein ya sawal puchein. Humara HealthMate Pro AI aapko instant analysis provide karega.
//                   </Typography>
//                 </Box>

//                 <Divider sx={{ borderColor: "rgba(185, 246, 202, 0.1)", mb: 2 }} />

//                 {/* Messages Container */}
//                 <Box 
//                   sx={{ 
//                     p: 2, 
//                     height: 340, 
//                     overflowY: "auto", 
//                     display: "flex", 
//                     flexDirection: "column", 
//                     gap: 2,
//                     "&::-webkit-scrollbar": { width: "8px" },
//                     "&::-webkit-scrollbar-track": { background: "rgba(255,255,255,0.02)" },
//                     "&::-webkit-scrollbar-thumb": { 
//                       background: "rgba(185, 246, 202, 0.2)", 
//                       borderRadius: "10px" 
//                     }
//                   }}
//                 >
//                   {messages.map((m, idx) => (
//                     <Box
//                       key={m.id}
//                       sx={{
//                         opacity: 0,
//                         animation: `slideIn 0.4s ease ${idx * 0.1}s forwards`,
//                         "@keyframes slideIn": {
//                           from: { opacity: 0, transform: "translateX(-20px)" },
//                           to: { opacity: 1, transform: "translateX(0)" }
//                         }
//                       }}
//                     >
//                       <Stack
//                         direction="row"
//                         spacing={2}
//                         sx={{ justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}
//                       >
//                         {m.from === "bot" && (
//                           <Avatar 
//                             sx={{ 
//                               width: 40, 
//                               height: 40, 
//                               background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)",
//                               boxShadow: "0 4px 12px rgba(46, 125, 50, 0.4)"
//                             }}
//                           >
//                             🤖
//                           </Avatar>
//                         )}

//                         <Box
//                           sx={{
//                             maxWidth: "75%",
//                             background: m.from === "user" 
//                               ? "linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)" 
//                               : "rgba(255,255,255,0.06)",
//                             color: "#e6f4ea",
//                             px: 3,
//                             py: 2,
//                             borderRadius: 3,
//                             boxShadow: m.from === "user" 
//                               ? "0 4px 16px rgba(46, 125, 50, 0.3)" 
//                               : "0 2px 8px rgba(0, 0, 0, 0.2)",
//                             border: m.from === "bot" ? "1px solid rgba(185, 246, 202, 0.1)" : "none"
//                           }}
//                         >
//                           <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
//                             {m.text}
//                           </Typography>
//                         </Box>

//                         {m.from === "user" && (
//                           <Avatar 
//                             sx={{ 
//                               width: 40, 
//                               height: 40, 
//                               background: "linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)",
//                               boxShadow: "0 4px 12px rgba(76, 175, 80, 0.4)"
//                             }}
//                           >
//                             👤
//                           </Avatar>
//                         )}
//                       </Stack>
//                     </Box>
//                   ))}
//                 </Box>

//                 {/* Premium Input Area */}
//                 <Box 
//                   sx={{ 
//                     p: 2, 
//                     borderTop: "2px solid rgba(185, 246, 202, 0.1)", 
//                     display: "flex", 
//                     alignItems: "center", 
//                     gap: 2,
//                     background: "rgba(255,255,255,0.02)"
//                   }}
//                 >
//                   <input 
//                     ref={fileRef} 
//                     type="file" 
//                     accept="application/pdf,image/*" 
//                     hidden 
//                     onChange={handleFile} 
//                   />

//                   <Tooltip title="Upload Medical Report" arrow>
//                     <IconButton 
//                       onClick={pickFile} 
//                       disabled={loading}
//                       sx={{ 
//                         background: "linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)",
//                         color: "white",
//                         transition: "all 0.3s ease",
//                         "&:hover": { 
//                           background: "linear-gradient(135deg, #388e3c 0%, #66bb6a 100%)",
//                           transform: "scale(1.1)"
//                         },
//                         "&:disabled": {
//                           background: "rgba(100, 116, 139, 0.3)",
//                         }
//                       }}
//                     >
//                       <AddIcon />
//                     </IconButton>
//                   </Tooltip>

//                   <Paper 
//                     sx={{ 
//                       flex: 1, 
//                       display: "flex", 
//                       alignItems: "center", 
//                       px: 3, 
//                       py: 1.5,
//                       background: "rgba(255,255,255,0.05)",
//                       border: "1px solid rgba(185, 246, 202, 0.2)",
//                       borderRadius: 3,
//                       transition: "all 0.3s ease",
//                       "&:hover": {
//                         border: "1px solid rgba(185, 246, 202, 0.4)",
//                         background: "rgba(255,255,255,0.08)"
//                       }
//                     }} 
//                     elevation={0}
//                   >
//                     <InputBase
//                       placeholder="Apna sawal yahan likhein aur Enter dabayein..."
//                       fullWidth
//                       value={text}
//                       onChange={(e) => setText(e.target.value)}
//                       onKeyDown={(e) => {
//                           if (e.key === "Enter" && (text.trim() || file) && !loading) {
//                             sendMessage();
//                           }
//                       }}
//                       sx={{ color: "#e6f4ea", fontSize: "1rem" }}
//                       disabled={loading}
//                     />
//                     <IconButton 
//                       onClick={sendMessage}
//                       disabled={(!text.trim() && !file) || loading}
//                       sx={{
//                         color: "#b9f6ca",
//                         transition: "all 0.2s ease",
//                         "&:hover": { 
//                           color: "#69f0ae",
//                           transform: "scale(1.1)"
//                         },
//                         "&:disabled": {
//                           color: "rgba(185, 246, 202, 0.3)"
//                         }
//                       }}
//                     >
//                       {loading ? <CircularProgress size={24} sx={{ color: '#b9f6ca' }} /> : <SendIcon />}
//                     </IconButton>
//                   </Paper>
//                 </Box>
                
//                 {/* Error Message Display */}
//                 {error && (
//                     <Typography color="error" sx={{ mt: 2, textAlign: 'center', fontWeight: 600 }}>
//                         🚨 {error}
//                     </Typography>
//                 )}
//               </Box>

//               {/* Right: Report History Panel */}
//               <Box 
//                 sx={{ 
//                   width: 380, 
//                   background: "linear-gradient(180deg, rgba(18, 35, 55, 0.8) 0%, rgba(10, 21, 37, 0.9) 100%)",
//                   p: 3, 
//                   display: "flex", 
//                   flexDirection: "column", 
//                   gap: 3,
//                   borderRadius: 2,
//                   border: "1px solid rgba(185, 246, 202, 0.1)"
//                 }}
//               >
//                 <Typography 
//                   variant="h6" 
//                   sx={{ 
//                     fontWeight: 800,
//                     color: "#b9f6ca",
//                     borderBottom: "2px solid rgba(185, 246, 202, 0.2)",
//                     pb: 1,
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 1
//                   }}
//                 >
//                   📋 Report History
//                   <Chip 
//                     label={messages.filter(m => m.from === "user").length} 
//                     size="small"
//                     sx={{ 
//                       ml: "auto",
//                       background: "rgba(185, 246, 202, 0.2)",
//                       color: "#b9f6ca",
//                       fontWeight: 700
//                     }}
//                   />
//                 </Typography>

//                 {/* History List */}
//                 <Box 
//                   sx={{ 
//                     flex: 1,
//                     overflowY: "auto",
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: 2,
//                     "&::-webkit-scrollbar": { width: "6px" },
//                     "&::-webkit-scrollbar-track": { background: "rgba(255,255,255,0.02)" },
//                     "&::-webkit-scrollbar-thumb": { 
//                       background: "rgba(185, 246, 202, 0.2)", 
//                       borderRadius: "10px" 
//                     }
//                   }}
//                 >
//                   {messages.filter(m => m.from === "user").length === 0 ? (
//                     <Paper 
//                       elevation={4}
//                       sx={{ 
//                         p: 4, 
//                         borderRadius: 3, 
//                         background: "rgba(255,255,255,0.04)",
//                         border: "2px dashed rgba(185, 246, 202, 0.15)",
//                         textAlign: "center"
//                       }}
//                     >
//                       <DescriptionIcon sx={{ fontSize: 64, color: "#4caf50", opacity: 0.5, mb: 2 }} />
//                       <Typography variant="body2" sx={{ color: "#b9f6ca", opacity: 0.7 }}>
//                         No reports uploaded yet
//                       </Typography>
//                       <Typography variant="caption" sx={{ color: "#69f0ae", opacity: 0.6, display: "block", mt: 1 }}>
//                         Upload your first medical report to get started
//                       </Typography>
//                     </Paper>
//                   ) : (
//                     messages
//                       .filter(m => m.from === "user")
//                       .slice()
//                       .reverse()
//                       .map((msg, idx) => (
//                         <Paper 
//                           key={msg.id}
//                           elevation={6}
//                           sx={{ 
//                             p: 2.5, 
//                             borderRadius: 3, 
//                             background: "rgba(255,255,255,0.04)",
//                             border: "1px solid rgba(185, 246, 202, 0.15)",
//                             transition: "all 0.3s ease",
//                             cursor: "pointer",
//                             "&:hover": {
//                               background: "rgba(255,255,255,0.08)",
//                               border: "1px solid rgba(185, 246, 202, 0.3)",
//                               transform: "translateX(-4px)",
//                               boxShadow: "0 8px 24px rgba(46, 125, 50, 0.2)"
//                             }
//                           }}
//                         >
//                           <Stack direction="row" spacing={2} alignItems="flex-start">
//                             <Avatar 
//                               sx={{ 
//                                 width: 40, 
//                                 height: 40,
//                                 background: "linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)",
//                                 fontWeight: 700
//                               }}
//                             >
//                               {idx + 1}
//                             </Avatar>
//                             <Box sx={{ flex: 1, minWidth: 0 }}>
//                               <Typography 
//                                 variant="subtitle2" 
//                                 sx={{ 
//                                   fontWeight: 700, 
//                                   color: "#b9f6ca",
//                                   mb: 0.5,
//                                   overflow: "hidden",
//                                   textOverflow: "ellipsis",
//                                   whiteSpace: "nowrap"
//                                 }}
//                               >
//                                 {msg.text.includes("Uploaded:") 
//                                   ? "📄 " + msg.text.split("Uploaded:")[1].trim() 
//                                   : "💬 " + msg.text}
//                               </Typography>
//                               <Typography variant="caption" sx={{ color: "#69f0ae", opacity: 0.7 }}>
//                                 {new Date(msg.id).toLocaleString('en-US', { 
//                                   month: 'short', 
//                                   day: 'numeric',
//                                   hour: '2-digit',
//                                   minute: '2-digit'
//                                 })}
//                               </Typography>
//                             </Box>
//                             <IconButton 
//                               size="small"
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 deleteMessage(msg.id);
//                               }}
//                               sx={{
//                                 color: "#ff8a80",
//                                 opacity: 0.6,
//                                 transition: "all 0.2s ease",
//                                 "&:hover": {
//                                   opacity: 1,
//                                   transform: "scale(1.15)",
//                                   background: "rgba(255, 138, 128, 0.1)"
//                                 }
//                               }}
//                             >
//                               <CloseIcon sx={{ fontSize: 18 }} />
//                             </IconButton>
//                           </Stack>
//                         </Paper>
//                       ))
//                   )}
//                 </Box>

//                 {/* Current Upload Info */}
//                 {file && (
//                   <Paper 
//                     elevation={8}
//                     sx={{ 
//                       p: 2.5, 
//                       borderRadius: 3, 
//                       background: "linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(102, 187, 106, 0.1) 100%)",
//                       border: "2px solid rgba(76, 175, 80, 0.3)",
//                       animation: "pulse 2s infinite",
//                       "@keyframes pulse": {
//                         "0%, 100%": { borderColor: "rgba(76, 175, 80, 0.3)" },
//                         "50%": { borderColor: "rgba(76, 175, 80, 0.6)" }
//                       }
//                     }}
//                   >
//                     <Stack direction="row" spacing={2} alignItems="center">
//                       <Avatar 
//                         sx={{ 
//                           background: "linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)",
//                           boxShadow: "0 4px 12px rgba(76, 175, 80, 0.4)"
//                         }}
//                       >
//                         📎
//                       </Avatar>
//                       <Box sx={{ flex: 1, minWidth: 0 }}>
//                         <Typography 
//                           variant="subtitle2" 
//                           sx={{ 
//                             fontWeight: 700, 
//                             color: "#b9f6ca",
//                             overflow: "hidden",
//                             textOverflow: "ellipsis",
//                             whiteSpace: "nowrap"
//                           }}
//                         >
//                           {file.name}
//                         </Typography>
//                         <Typography variant="caption" sx={{ color: "#69f0ae" }}>
//                           📊 {(file.size / 1024).toFixed(1)} KB • Ready to send
//                         </Typography>
//                       </Box>
//                       <IconButton 
//                         size="small"
//                         onClick={() => setFile(null)}
//                         sx={{
//                           color: "#ff8a80",
//                           transition: "all 0.2s ease",
//                           "&:hover": {
//                             transform: "scale(1.15)",
//                             background: "rgba(255, 138, 128, 0.2)"
//                           }
//                         }}
//                       >
//                         <CloseIcon />
//                       </IconButton>
//                     </Stack>
//                   </Paper>
//                 )}

//                 <Divider sx={{ borderColor: "rgba(185, 246, 202, 0.1)" }} />

//                 {/* Features Info */}
//                 <Stack spacing={1.5}>
//                   <Chip 
//                     label="🌐 Bilingual: English + Roman Urdu" 
//                     size="small"
//                     sx={{ 
//                       background: "rgba(185, 246, 202, 0.1)",
//                       color: "#b9f6ca",
//                       border: "1px solid rgba(185, 246, 202, 0.2)",
//                       fontWeight: 600,
//                       fontSize: "0.8rem",
//                       justifyContent: "flex-start"
//                     }} 
//                   />
//                   <Chip 
//                     label="🧠 HealthMate Pro AI Analysis" 
//                     size="small"
//                     sx={{ 
//                       background: "rgba(105, 240, 174, 0.1)",
//                       color: "#69f0ae",
//                       border: "1px solid rgba(105, 240, 174, 0.2)",
//                       fontWeight: 600,
//                       fontSize: "0.8rem",
//                       justifyContent: "flex-start"
//                     }} 
//                   />
//                   <Chip 
//                     label="🔒 Secure (JWT + Encryption)" 
//                     size="small"
//                     sx={{ 
//                       background: "rgba(185, 246, 202, 0.08)",
//                       color: "#b9f6ca",
//                       border: "1px solid rgba(185, 246, 202, 0.15)",
//                       fontWeight: 600,
//                       fontSize: "0.8rem",
//                       justifyContent: "flex-start"
//                     }} 
//                   />
//                 </Stack>
//               </Box>
//             </Box>

//             {/* Premium Footer */}
//             <Box 
//               sx={{ 
//                 p: 2, 
//                 textAlign: "center", 
//                 background: "rgba(0,0,0,0.4)",
//                 borderTop: "1px solid rgba(185, 246, 202, 0.1)"
//               }}
//             >
//               <Typography variant="caption" sx={{ color: "#b9f6ca", fontSize: "0.85rem" }}>
//                 © 2025 HealthMate Pro — AI-powered analysis for understanding only, not medical advice. Always consult a healthcare professional.
//               </Typography>
//             </Box>
//           </Paper>
//         </Box>
//       </Container>
//     </Box>
//   );
// }
import React, { useRef, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  IconButton,
  InputBase,
  Avatar,
  Stack,
  Chip,
  Divider,
  Tooltip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";

const API_URL = "http://localhost:5000/api";

export default function UserContent() {
  const { id } = useParams();
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sessionId, setSessionId] = useState(null);
  
  // Family Member States
  const [familyMembers, setFamilyMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedMemberName, setSelectedMemberName] = useState("Self");
  const [openFamilyDialog, setOpenFamilyDialog] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    relation: 'Self',
    age: '',
    gender: 'Male',
    bloodGroup: 'Unknown'
  });

  // Load today's chat on component mount
  useEffect(() => {
    if (id) {
      loadTodayChat();
      loadFamilyMembers();
    }
  }, [id]);

  const loadTodayChat = async () => {
    try {
      const response = await fetch(`${API_URL}/today-chat/${id}`);
      const data = await response.json();
      
      if (data.success) {
        setMessages(data.messages || []);
        setSessionId(data.sessionId);
      }
    } catch (err) {
      console.error("Error loading chat:", err);
      setMessages([
        { 
          id: Date.now(), 
          from: "bot", 
          text: "Assalamualaikum! Apni report upload kijiye ya yahan type karke bat kijiye." 
        }
      ]);
    }
  };

  const loadFamilyMembers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/family/members`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setFamilyMembers(data.members || []);
      }
    } catch (error) {
      console.error('Error loading family members:', error);
    }
  };

  const addFamilyMember = async () => {
    if (!newMember.name.trim()) {
      alert('Please enter member name');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/family/member`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMember)
      });
      const data = await response.json();
      if (data.success) {
        loadFamilyMembers();
        setOpenFamilyDialog(false);
        setNewMember({ name: '', relation: 'Self', age: '', gender: 'Male', bloodGroup: 'Unknown' });
      }
    } catch (error) {
      console.error('Error adding family member:', error);
    }
  };

  const getRelationEmoji = (relation) => {
    const emojiMap = {
      'Self': '👤',
      'Father': '👨',
      'Mother': '👩',
      'Brother': '👦',
      'Sister': '👧',
      'Spouse': '💑',
      'Son': '👶',
      'Daughter': '👶',
      'Grandfather': '👴',
      'Grandmother': '👵',
      'Other': '👥'
    };
    return emojiMap[relation] || '👤';
  };

  const handleMemberSelect = (memberId, memberName) => {
    setSelectedMember(memberId);
    setSelectedMemberName(memberName);
    // Reload chat history for selected member
    // You can implement this based on your needs
  };

  const pickFile = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    
    setFile(f);
    setMessages((m) => [
      ...m,
      { 
        id: Date.now(), 
        from: "user", 
        text: `Uploaded: ${f.name} (${(f.size / 1024 / 1024).toFixed(2)} MB)` 
      },
    ]);
    e.target.value = null;
  };

  const sendMessage = async () => {
    if ((!text.trim() && !file) || loading) return;

    setLoading(true);
    setError("");

    const userMsgText = text.trim();
    const fileAttachMsg = file ? ` + (Report: ${file.name})` : '';
    
    const userMsg = {
      id: Date.now(),
      from: "user",
      text: userMsgText + fileAttachMsg,
      timestamp: new Date()
    };
    setMessages((m) => [...m, userMsg]);

    const formData = new FormData();
    if (userMsgText) {
      formData.append('text', userMsgText);
    }
    if (file) {
      formData.append('medicalReportFile', file);
    }
    // Add selected member info
    if (selectedMember) {
      formData.append('familyMemberId', selectedMember);
      formData.append('memberName', selectedMemberName);
    }

    setText("");
    setFile(null);

    try {
      const response = await fetch(`${API_URL}/analyze-combined/${id}`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        const botMsg = {
          id: Date.now() + 1,
          from: "bot",
          text: data.analysis || "Analysis complete, lekin jawab khali hai.",
          timestamp: new Date()
        };
        setMessages((m) => [...m, botMsg]);
        if (data.sessionId) {
          setSessionId(data.sessionId);
        }
      } else {
        setError(data.error || "AI Analysis mein masla ho gaya. Server check karein.");
        const errorMsg = {
          id: Date.now() + 1,
          from: "bot",
          text: `❌ Error: ${data.error || "Server se ghalati hui."}`
        };
        setMessages((m) => [...m, errorMsg]);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Network error ya API tak pahunchne mein masla.");
      const errorMsg = {
        id: Date.now() + 1,
        from: "bot",
        text: "❌ Network Error: Kirpya apna internet connection check karein."
      };
      setMessages((m) => [...m, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = (msgId) => {
    setMessages(messages.filter(m => m.id !== msgId));
  };

  return (
    <Box 
      sx={{ 
        minHeight: "100vh", 
        background: "linear-gradient(135deg, #0a1628 0%, #0f1d2e 50%, #071219 100%)",
        color: "#e6f4ea", 
        py: 6 
      }}
    >
      <Container maxWidth="lg">
        {/* Premium Header */}
        <Box
          sx={{
            opacity: 0,
            animation: "fadeInDown 0.8s ease forwards",
            "@keyframes fadeInDown": {
              from: { opacity: 0, transform: "translateY(-30px)" },
              to: { opacity: 1, transform: "translateY(0)" }
            }
          }}
        >
          <Stack direction="row" alignItems="center" spacing={3} sx={{ mb: 5 }}>
            <Box
              sx={{
                background: "linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)",
                borderRadius: "20px",
                p: 2,
                boxShadow: "0 8px 32px rgba(46, 125, 50, 0.3)"
              }}
            >
              <Avatar sx={{ bgcolor: "transparent", width: 64, height: 64, fontSize: "2rem" }}>
                🏥
              </Avatar>
            </Box>
            <Box>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 900,
                  background: "linear-gradient(90deg, #b9f6ca 0%, #69f0ae 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-0.5px"
                }}
              >
                HealthMate Pro
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.85, mt: 0.5, fontSize: "1.1rem" }}>
                🤖 AI-Powered Medical Report Analysis — Bilingual Support (English + Roman Urdu)
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Main Premium Card */}
        <Box
          sx={{
            opacity: 0,
            animation: "fadeInUp 0.8s ease 0.2s forwards",
            "@keyframes fadeInUp": {
              from: { opacity: 0, transform: "translateY(30px)" },
              to: { opacity: 1, transform: "translateY(0)" }
            }
          }}
        >
          <Paper 
            elevation={24} 
            sx={{ 
              borderRadius: 4, 
              overflow: "hidden",
              background: "linear-gradient(180deg, #132337 0%, #0a1525 100%)",
              border: "1px solid rgba(185, 246, 202, 0.1)",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)"
            }}
          >
            <Box sx={{ display: "flex", gap: 3, p: 3 }}>
              {/* Left: Enhanced Chat Area */}
              <Box sx={{ flex: 1, minHeight: 500 }}>
                <Box 
                  sx={{ 
                    p: 3,
                    background: "linear-gradient(90deg, rgba(46, 125, 50, 0.1) 0%, rgba(105, 240, 174, 0.05) 100%)",
                    borderRadius: 2,
                    mb: 2
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: 800, color: "#b9f6ca" }}>
                    💬 Smart Medical Assistant
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
                    Apni medical reports upload karein ya sawal puchein. Humara HealthMate Pro AI aapko instant analysis provide karega.
                  </Typography>
                </Box>

                <Divider sx={{ borderColor: "rgba(185, 246, 202, 0.1)", mb: 2 }} />

                {/* Messages Container */}
                <Box 
                  sx={{ 
                    p: 2, 
                    height: 340, 
                    overflowY: "auto", 
                    display: "flex", 
                    flexDirection: "column", 
                    gap: 2,
                    "&::-webkit-scrollbar": { width: "8px" },
                    "&::-webkit-scrollbar-track": { background: "rgba(255,255,255,0.02)" },
                    "&::-webkit-scrollbar-thumb": { 
                      background: "rgba(185, 246, 202, 0.2)", 
                      borderRadius: "10px" 
                    }
                  }}
                >
                  {messages.map((m, idx) => (
                    <Box
                      key={m.id}
                      sx={{
                        opacity: 0,
                        animation: `slideIn 0.4s ease ${idx * 0.1}s forwards`,
                        "@keyframes slideIn": {
                          from: { opacity: 0, transform: "translateX(-20px)" },
                          to: { opacity: 1, transform: "translateX(0)" }
                        }
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{ justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}
                      >
                        {m.from === "bot" && (
                          <Avatar 
                            sx={{ 
                              width: 40, 
                              height: 40, 
                              background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)",
                              boxShadow: "0 4px 12px rgba(46, 125, 50, 0.4)"
                            }}
                          >
                            🤖
                          </Avatar>
                        )}

                        <Box
                          sx={{
                            maxWidth: "75%",
                            background: m.from === "user" 
                              ? "linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)" 
                              : "rgba(255,255,255,0.06)",
                            color: "#e6f4ea",
                            px: 3,
                            py: 2,
                            borderRadius: 3,
                            boxShadow: m.from === "user" 
                              ? "0 4px 16px rgba(46, 125, 50, 0.3)" 
                              : "0 2px 8px rgba(0, 0, 0, 0.2)",
                            border: m.from === "bot" ? "1px solid rgba(185, 246, 202, 0.1)" : "none"
                          }}
                        >
                          <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                            {m.text}
                          </Typography>
                        </Box>

                        {m.from === "user" && (
                          <Avatar 
                            sx={{ 
                              width: 40, 
                              height: 40, 
                              background: "linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)",
                              boxShadow: "0 4px 12px rgba(76, 175, 80, 0.4)"
                            }}
                          >
                            👤
                          </Avatar>
                        )}
                      </Stack>
                    </Box>
                  ))}
                </Box>

                {/* Premium Input Area */}
                <Box 
                  sx={{ 
                    p: 2, 
                    borderTop: "2px solid rgba(185, 246, 202, 0.1)", 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 2,
                    background: "rgba(255,255,255,0.02)"
                  }}
                >
                  <input 
                    ref={fileRef} 
                    type="file" 
                    accept="application/pdf,image/*" 
                    hidden 
                    onChange={handleFile} 
                  />

                  <Tooltip title="Upload Medical Report" arrow>
                    <IconButton 
                      onClick={pickFile} 
                      disabled={loading}
                      sx={{ 
                        background: "linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)",
                        color: "white",
                        transition: "all 0.3s ease",
                        "&:hover": { 
                          background: "linear-gradient(135deg, #388e3c 0%, #66bb6a 100%)",
                          transform: "scale(1.1)"
                        },
                        "&:disabled": {
                          background: "rgba(100, 116, 139, 0.3)",
                        }
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Tooltip>

                  <Paper 
                    sx={{ 
                      flex: 1, 
                      display: "flex", 
                      alignItems: "center", 
                      px: 3, 
                      py: 1.5,
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(185, 246, 202, 0.2)",
                      borderRadius: 3,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        border: "1px solid rgba(185, 246, 202, 0.4)",
                        background: "rgba(255,255,255,0.08)"
                      }
                    }} 
                    elevation={0}
                  >
                    <InputBase
                      placeholder="Apna sawal yahan likhein aur Enter dabayein..."
                      fullWidth
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      onKeyDown={(e) => {
                          if (e.key === "Enter" && (text.trim() || file) && !loading) {
                            sendMessage();
                          }
                      }}
                      sx={{ color: "#e6f4ea", fontSize: "1rem" }}
                      disabled={loading}
                    />
                    <IconButton 
                      onClick={sendMessage}
                      disabled={(!text.trim() && !file) || loading}
                      sx={{
                        color: "#b9f6ca",
                        transition: "all 0.2s ease",
                        "&:hover": { 
                          color: "#69f0ae",
                          transform: "scale(1.1)"
                        },
                        "&:disabled": {
                          color: "rgba(185, 246, 202, 0.3)"
                        }
                      }}
                    >
                      {loading ? <CircularProgress size={24} sx={{ color: '#b9f6ca' }} /> : <SendIcon />}
                    </IconButton>
                  </Paper>
                </Box>
                
                {/* Error Message Display */}
                {error && (
                    <Typography color="error" sx={{ mt: 2, textAlign: 'center', fontWeight: 600 }}>
                        🚨 {error}
                    </Typography>
                )}
              </Box>

              {/* Right: Sidebar with Family Members & History */}
              <Box 
                sx={{ 
                  width: 380, 
                  background: "linear-gradient(180deg, rgba(18, 35, 55, 0.8) 0%, rgba(10, 21, 37, 0.9) 100%)",
                  p: 3, 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: 3,
                  borderRadius: 2,
                  border: "1px solid rgba(185, 246, 202, 0.1)"
                }}
              >
                {/* Family Members Section */}
                <Box>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 800,
                        color: "#b9f6ca",
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                      }}
                    >
                      <FamilyRestroomIcon /> Family Members
                    </Typography>
                    <Chip 
                      label={familyMembers.length} 
                      size="small"
                      sx={{ 
                        background: "rgba(185, 246, 202, 0.2)",
                        color: "#b9f6ca",
                        fontWeight: 700
                      }}
                    />
                  </Stack>

                  <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
                    {familyMembers.map((member) => (
                      <Chip
                        key={member._id}
                        avatar={<Avatar sx={{ bgcolor: "transparent" }}>{getRelationEmoji(member.relation)}</Avatar>}
                        label={`${member.name}`}
                        onClick={() => handleMemberSelect(member._id, member.name)}
                        sx={{
                          background: selectedMember === member._id 
                            ? "linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)"
                            : "rgba(185, 246, 202, 0.1)",
                          color: "#000000",
                          border: "1px solid rgba(185, 246, 202, 0.2)",
                          fontWeight: 600,
                          transition: "all 0.3s ease",
                          '&:hover': {
                            background: "linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)",
                            transform: "scale(1.05)"
                          }
                        }}
                      />
                    ))}

                    <Tooltip title="Add Family Member" arrow>
                      <IconButton
                        onClick={() => setOpenFamilyDialog(true)}
                        sx={{
                          background: "rgba(185, 246, 202, 0.1)",
                          border: "2px dashed rgba(185, 246, 202, 0.3)",
                          width: 40,
                          height: 40,
                          '&:hover': {
                            background: "rgba(185, 246, 202, 0.2)",
                            border: "2px dashed rgba(185, 246, 202, 0.5)",
                          }
                        }}
                      >
                        <PersonAddIcon sx={{ color: '#b9f6ca', fontSize: 20 }} />
                      </IconButton>
                    </Tooltip>
                  </Stack>

                  {selectedMember && (
                    <Paper
                      sx={{
                        mt: 2,
                        p: 1.5,
                        background: "rgba(76, 175, 80, 0.1)",
                        border: "1px solid rgba(76, 175, 80, 0.3)",
                        borderRadius: 2
                      }}
                    >
                      <Typography variant="caption" sx={{ color: "#69f0ae" }}>
                        📋 Viewing reports for: <strong>{selectedMemberName}</strong>
                      </Typography>
                    </Paper>
                  )}
                </Box>

                <Divider sx={{ borderColor: "rgba(185, 246, 202, 0.1)" }} />

                {/* Report History Section */}
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 800,
                    color: "#b9f6ca",
                    display: "flex",
                    alignItems: "center",
                    gap: 1
                  }}
                >
                  📋 Report History
                  <Chip 
                    label={messages.filter(m => m.from === "user").length} 
                    size="small"
                    sx={{ 
                      ml: "auto",
                      background: "rgba(185, 246, 202, 0.2)",
                      color: "#b9f6ca",
                      fontWeight: 700
                    }}
                  />
                </Typography>

                {/* History List */}
                <Box 
                  sx={{ 
                    flex: 1,
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    "&::-webkit-scrollbar": { width: "6px" },
                    "&::-webkit-scrollbar-track": { background: "rgba(255,255,255,0.02)" },
                    "&::-webkit-scrollbar-thumb": { 
                      background: "rgba(185, 246, 202, 0.2)", 
                      borderRadius: "10px" 
                    }
                  }}
                >
                  {messages.filter(m => m.from === "user").length === 0 ? (
                    <Paper 
                      elevation={4}
                      sx={{ 
                        p: 4, 
                        borderRadius: 3, 
                        background: "rgba(255,255,255,0.04)",
                        border: "2px dashed rgba(185, 246, 202, 0.15)",
                        textAlign: "center"
                      }}
                    >
                      <DescriptionIcon sx={{ fontSize: 64, color: "#4caf50", opacity: 0.5, mb: 2 }} />
                      <Typography variant="body2" sx={{ color: "#b9f6ca", opacity: 0.7 }}>
                        No reports uploaded yet
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#69f0ae", opacity: 0.6, display: "block", mt: 1 }}>
                        Upload your first medical report to get started
                      </Typography>
                    </Paper>
                  ) : (
                    messages
                      .filter(m => m.from === "user")
                      .slice()
                      .reverse()
                      .map((msg, idx) => (
                        <Paper 
                          key={msg.id}
                          elevation={6}
                          sx={{ 
                            p: 2.5, 
                            borderRadius: 3, 
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(185, 246, 202, 0.15)",
                            transition: "all 0.3s ease",
                            cursor: "pointer",
                            "&:hover": {
                              background: "rgba(255,255,255,0.08)",
                              border: "1px solid rgba(185, 246, 202, 0.3)",
                              transform: "translateX(-4px)",
                              boxShadow: "0 8px 24px rgba(46, 125, 50, 0.2)"
                            }
                          }}
                        >
                          <Stack direction="row" spacing={2} alignItems="flex-start">
                            <Avatar 
                              sx={{ 
                                width: 40, 
                                height: 40,
                                background: "linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)",
                                fontWeight: 700
                              }}
                            >
                              {idx + 1}
                            </Avatar>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Typography 
                                variant="subtitle2" 
                                sx={{ 
                                  fontWeight: 700, 
                                  color: "#b9f6ca",
                                  mb: 0.5,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap"
                                }}
                              >
                                {msg.text.includes("Uploaded:") 
                                  ? "📄 " + msg.text.split("Uploaded:")[1].trim() 
                                  : "💬 " + msg.text}
                              </Typography>
                              <Typography variant="caption" sx={{ color: "#69f0ae", opacity: 0.7 }}>
                                {new Date(msg.id).toLocaleString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </Typography>
                            </Box>
                            <IconButton 
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteMessage(msg.id);
                              }}
                              sx={{
                                color: "#ff8a80",
                                opacity: 0.6,
                                transition: "all 0.2s ease",
                                "&:hover": {
                                  opacity: 1,
                                  transform: "scale(1.15)",
                                  background: "rgba(255, 138, 128, 0.1)"
                                }
                              }}
                            >
                              <CloseIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                          </Stack>
                        </Paper>
                      ))
                  )}
                </Box>

                {/* Current Upload Info */}
                {file && (
                  <Paper 
                    elevation={8}
                    sx={{ 
                      p: 2.5, 
                      borderRadius: 3, 
                      background: "linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(102, 187, 106, 0.1) 100%)",
                      border: "2px solid rgba(76, 175, 80, 0.3)",
                      animation: "pulse 2s infinite",
                      "@keyframes pulse": {
                        "0%, 100%": { borderColor: "rgba(76, 175, 80, 0.3)" },
                        "50%": { borderColor: "rgba(76, 175, 80, 0.6)" }
                      }
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar 
                        sx={{ 
                          background: "linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)",
                          boxShadow: "0 4px 12px rgba(76, 175, 80, 0.4)"
                        }}
                      >
                        📎
                      </Avatar>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography 
                          variant="subtitle2" 
                          sx={{ 
                            fontWeight: 700, 
                            color: "#b9f6ca",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                          }}
                        >
                          {file.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#69f0ae" }}>
                          📊 {(file.size / 1024).toFixed(1)} KB • Ready to send
                        </Typography>
                      </Box>
                      <IconButton 
                        size="small"
                        onClick={() => setFile(null)}
                        sx={{
                          color: "#ff8a80",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            transform: "scale(1.15)",
                            background: "rgba(255, 138, 128, 0.2)"
                          }
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Stack>
                  </Paper>
                )}

                <Divider sx={{ borderColor: "rgba(185, 246, 202, 0.1)" }} />

                {/* Features Info */}
                <Stack spacing={1.5}>
                  <Chip 
                    label="🌐 Bilingual: English + Roman Urdu" 
                    size="small"
                    sx={{ 
                      background: "rgba(185, 246, 202, 0.1)",
                      color: "#b9f6ca",
                      border: "1px solid rgba(185, 246, 202, 0.2)",
                      fontWeight: 600,
                      fontSize: "0.8rem",
                      justifyContent: "flex-start"
                    }} 
                  />
                  <Chip 
                    label="🧠 HealthMate Pro AI Analysis" 
                    size="small"
                    sx={{ 
                      background: "rgba(105, 240, 174, 0.1)",
                      color: "#69f0ae",
                      border: "1px solid rgba(105, 240, 174, 0.2)",
                      fontWeight: 600,
                      fontSize: "0.8rem",
                      justifyContent: "flex-start"
                    }} 
                  />
                  <Chip 
                    label="🔒 Secure (JWT + Encryption)" 
                    size="small"
                    sx={{ 
                      background: "rgba(185, 246, 202, 0.08)",
                      color: "#b9f6ca",
                      border: "1px solid rgba(185, 246, 202, 0.15)",
                      fontWeight: 600,
                      fontSize: "0.8rem",
                      justifyContent: "flex-start"
                    }} 
                  />
                </Stack>
              </Box>
            </Box>

            {/* Premium Footer */}
            <Box 
              sx={{ 
                p: 2, 
                textAlign: "center", 
                background: "rgba(0,0,0,0.4)",
                borderTop: "1px solid rgba(185, 246, 202, 0.1)"
              }}
            >
              <Typography variant="caption" sx={{ color: "#b9f6ca", fontSize: "0.85rem" }}>
                © 2025 HealthMate Pro — AI-powered analysis for understanding only, not medical advice. Always consult a healthcare professional.
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>

      {/* Add Family Member Dialog */}
      <Dialog 
        open={openFamilyDialog} 
        onClose={() => setOpenFamilyDialog(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            background: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
            border: "1px solid rgba(185, 246, 202, 0.2)",
            borderRadius: 3
          }
        }}
      >
        <DialogTitle sx={{ 
          color: "#b9f6ca", 
          fontWeight: 700,
          borderBottom: "1px solid rgba(185, 246, 202, 0.1)",
          display: "flex",
          alignItems: "center",
          gap: 1
        }}>
          <PersonAddIcon /> Add Family Member
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Stack spacing={3}>
            <TextField
              label="Name"
              fullWidth
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#e6f4ea',
                  '& fieldset': { borderColor: 'rgba(185, 246, 202, 0.3)' },
                  '&:hover fieldset': { borderColor: 'rgba(185, 246, 202, 0.5)' },
                  '&.Mui-focused fieldset': { borderColor: '#4caf50' },
                },
                '& .MuiInputLabel-root': { color: 'rgba(185, 246, 202, 0.7)' },
                '& .MuiInputLabel-root.Mui-focused': { color: '#4caf50' }
              }}
            />

            <TextField
              label="Relation"
              select
              fullWidth
              value={newMember.relation}
              onChange={(e) => setNewMember({ ...newMember, relation: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#e6f4ea',
                  '& fieldset': { borderColor: 'rgba(185, 246, 202, 0.3)' },
                  '&:hover fieldset': { borderColor: 'rgba(185, 246, 202, 0.5)' },
                  '&.Mui-focused fieldset': { borderColor: '#4caf50' },
                },
                '& .MuiInputLabel-root': { color: 'rgba(185, 246, 202, 0.7)' },
                '& .MuiInputLabel-root.Mui-focused': { color: '#4caf50' }
              }}
            >
              {['Self', 'Father', 'Mother', 'Brother', 'Sister', 'Spouse', 'Son', 'Daughter', 'Grandfather', 'Grandmother', 'Other'].map((rel) => (
                <MenuItem key={rel} value={rel} sx={{ color: '#e6f4ea' }}>
                  {getRelationEmoji(rel)} {rel}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Age"
              type="number"
              fullWidth
              value={newMember.age}
              onChange={(e) => setNewMember({ ...newMember, age: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#e6f4ea',
                  '& fieldset': { borderColor: 'rgba(185, 246, 202, 0.3)' },
                  '&:hover fieldset': { borderColor: 'rgba(185, 246, 202, 0.5)' },
                  '&.Mui-focused fieldset': { borderColor: '#4caf50' },
                },
                '& .MuiInputLabel-root': { color: 'rgba(185, 246, 202, 0.7)' },
                '& .MuiInputLabel-root.Mui-focused': { color: '#4caf50' }
              }}
            />

            <TextField
              label="Gender"
              select
              fullWidth
              value={newMember.gender}
              onChange={(e) => setNewMember({ ...newMember, gender: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#e6f4ea',
                  '& fieldset': { borderColor: 'rgba(185, 246, 202, 0.3)' },
                  '&:hover fieldset': { borderColor: 'rgba(185, 246, 202, 0.5)' },
                  '&.Mui-focused fieldset': { borderColor: '#4caf50' },
                },
                '& .MuiInputLabel-root': { color: 'rgba(185, 246, 202, 0.7)' },
                '& .MuiInputLabel-root.Mui-focused': { color: '#4caf50' }
              }}
            >
              {['Male', 'Female', 'Other'].map((g) => (
                <MenuItem key={g} value={g} sx={{ color: '#e6f4ea' }}>
                  {g}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Blood Group"
              select
              fullWidth
              value={newMember.bloodGroup}
              onChange={(e) => setNewMember({ ...newMember, bloodGroup: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#e6f4ea',
                  '& fieldset': { borderColor: 'rgba(185, 246, 202, 0.3)' },
                  '&:hover fieldset': { borderColor: 'rgba(185, 246, 202, 0.5)' },
                  '&.Mui-focused fieldset': { borderColor: '#4caf50' },
                },
                '& .MuiInputLabel-root': { color: 'rgba(185, 246, 202, 0.7)' },
                '& .MuiInputLabel-root.Mui-focused': { color: '#4caf50' }
              }}
            >
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'].map((bg) => (
                <MenuItem key={bg} value={bg} sx={{ color: '#e6f4ea' }}>
                  {bg}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: "1px solid rgba(185, 246, 202, 0.1)" }}>
          <Button 
            onClick={() => setOpenFamilyDialog(false)}
            sx={{ 
              color: "#ff8a80",
              '&:hover': { background: "rgba(255, 138, 128, 0.1)" }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={addFamilyMember} 
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)",
              '&:hover': {
                background: "linear-gradient(135deg, #388e3c 0%, #66bb6a 100%)",
              }
            }}
          >
            Add Member
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}