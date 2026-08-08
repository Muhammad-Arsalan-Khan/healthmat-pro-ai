import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  TextField,
  Button,
  Avatar,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Divider,
  Container,
  Stack,
  Chip,
  CircularProgress,
  Fade,
  Slide,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Add as AddIcon,
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  ChatBubbleOutline as ChatIcon,
  Delete as DeleteIcon,
  Description as DocumentIcon,
  QuestionAnswer as QuestionIcon,
} from "@mui/icons-material";

const API_URL = "http://localhost:5000/api";
const drawerWidth = 300;

export default function HealthMateChat() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Get real userId from localStorage after login
  // If not logged in, create a temporary MongoDB-compatible ID
  const getUserId = () => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) return storedUserId;

    // Generate a valid MongoDB ObjectId format (24 hex characters)
    const tempId = "000000000000000000000000"; // You can generate random one
    localStorage.setItem("userId", tempId);
    return tempId;
  };

  const userId = getUserId();
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    if (userId) {
      loadAllChats();
      // createNewChat();
    }
  }, [userId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Helper function to get auth headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const loadAllChats = async () => {
    try {
      const response = await fetch(`${API_URL}/chats/${userId}`, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (data.success) {
        setChatHistory(data.chats || []);
      }
    } catch (err) {
      console.error("Error loading chats:", err);
    }
  };

  const createNewChat = async () => {
    try {
      const response = await fetch(`${API_URL}/chat/new/${userId}`, {
        method: "POST",
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (data.success) {
        setCurrentSessionId(data.sessionId);
        setMessages([]);
        setFile(null);
        setInputText("");
        loadAllChats();
      }
    } catch (err) {
      console.error("Error creating new chat:", err);
    }
  };

  const loadChat = async (sessionId) => {
    try {
      const response = await fetch(`${API_URL}/chat/${userId}/${sessionId}`, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (data.success) {
        setMessages(data.messages || []);
        setCurrentSessionId(sessionId);
        if (isMobile) setMobileOpen(false);
      }
    } catch (err) {
      console.error("Error loading chat:", err);
    }
  };

  const deleteChat = async (sessionId, e) => {
    e.stopPropagation();
    if (!window.confirm("Kya aap is chat ko delete karna chahte hain?")) return;

    try {
      const response = await fetch(`${API_URL}/chat/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ sessionId }),
      });
      const data = await response.json();
      if (data.success) {
        loadAllChats();
        if (currentSessionId === sessionId) {
          createNewChat();
        }
      }
    } catch (err) {
      console.error("Error deleting chat:", err);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      e.target.value = null;
    }
  };

  const sendMessage = async () => {
    if ((!inputText.trim() && !file) || loading) return;

    setLoading(true);
    const userMsg = {
      from: "user",
      text: inputText.trim() || `📎 ${file.name}`,
      timestamp: new Date(),
    };
    setMessages((m) => [...m, userMsg]);

    const formData = new FormData();
    if (inputText.trim()) formData.append("text", inputText.trim());
    if (file) formData.append("medicalReportFile", file);
    if (currentSessionId) formData.append("sessionId", currentSessionId);

    setInputText("");
    setFile(null);

    try {
      const response = await fetch(`${API_URL}/analyze-combined/${userId}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        const botMsg = {
          from: "bot",
          text: data.analysis || "Analysis complete.",
          timestamp: new Date(),
        };
        setMessages((m) => [...m, botMsg]);
        if (data.sessionId) setCurrentSessionId(data.sessionId);
        loadAllChats();
      } else {
        const errorMsg = {
          from: "bot",
          text: `❌ Error: ${data.error}`,
        };
        setMessages((m) => [...m, errorMsg]);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      const errorMsg = {
        from: "bot",
        text: "❌ Network Error",
      };
      setMessages((m) => [...m, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Sidebar Content
  const drawer = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#0d1b2a",
      }}
    >
      {/* Sidebar Header */}
      <Box sx={{ p: 2.5, borderBottom: "1px solid #1b2838" }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Avatar
            sx={{
              bgcolor: "linear-gradient(135deg, #22c55e, #16a34a)",
              width: 40,
              height: 40,
            }}
          >
            🏥
          </Avatar>
          <Typography
            variant="h6"
            sx={{ color: "#4ade80", fontWeight: 700, flex: 1 }}
          >
            HealthMate Pro
          </Typography>
          {isMobile && (
            <IconButton
              onClick={() => setMobileOpen(false)}
              sx={{ color: "#64748b" }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </Stack>
      </Box>

      {/* New Chat Button */}
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<AddIcon />}
          onClick={createNewChat}
          sx={{
            background: "linear-gradient(135deg, #22c55e, #16a34a)",
            color: "white",
            fontWeight: 600,
            py: 1.5,
            borderRadius: 2,
            textTransform: "none",
            boxShadow: "0 4px 16px rgba(34, 197, 94, 0.25)",
            "&:hover": {
              background: "linear-gradient(135deg, #16a34a, #15803d)",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 20px rgba(34, 197, 94, 0.35)",
            },
            transition: "all 0.3s",
          }}
        >
          New Chat
        </Button>
      </Box>

      {/* Chat History */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 1.5,
          // hide scrollbar but keep scrolling
          "&::-webkit-scrollbar": { width: 0, height: 0 },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {chatHistory.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 6, color: "#475569" }}>
            <ChatIcon sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
            <Typography variant="body2">Koi chat nahi hai</Typography>
          </Box>
        ) : (
          <List sx={{ py: 0 }}>
            {chatHistory.map((chat) => (
              <ListItem
                key={chat.sessionId}
                disablePadding
                sx={{ mb: 1 }}
                secondaryAction={
                  <IconButton
                    edge="end"
                    onClick={(e) => deleteChat(chat.sessionId, e)}
                    sx={{
                      color: "#ef4444",
                      opacity: 0.6,
                      "&:hover": {
                        opacity: 1,
                        bgcolor: "rgba(127, 29, 29, 0.2)",
                      },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                }
              >
                <ListItemButton
                  selected={currentSessionId === chat.sessionId}
                  onClick={() => loadChat(chat.sessionId)}
                  sx={{
                    borderRadius: 2,
                    bgcolor:
                      currentSessionId === chat.sessionId
                        ? "#1e3a29"
                        : "#1b2838",
                    border:
                      currentSessionId === chat.sessionId
                        ? "1px solid #22c55e"
                        : "1px solid transparent",
                    "&:hover": {
                      bgcolor:
                        currentSessionId === chat.sessionId
                          ? "#1e3a29"
                          : "#1e293b",
                    },
                    "&.Mui-selected": {
                      bgcolor: "#1e3a29",
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        sx={{
                          color:
                            currentSessionId === chat.sessionId
                              ? "#4ade80"
                              : "#e2e8f0",
                          fontWeight: 600,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {chat.title}
                      </Typography>
                    }
                    secondary={
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#64748b",
                            display: "block",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {chat.lastMessage}
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={0.5}
                          alignItems="center"
                          sx={{ mt: 0.5 }}
                        >
                          <Chip
                            label={`${chat.messageCount} msg`}
                            size="small"
                            sx={{
                              height: 18,
                              fontSize: "0.7rem",
                              bgcolor: "#0f172a",
                              color: "#475569",
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{ color: "#334155" }}
                          >
                            •
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: "#475569" }}
                          >
                            {new Date(chat.updatedAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                              }
                            )}
                          </Typography>
                        </Stack>
                      </Box>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#0a1525", overflowX: "hidden" }}>
      {/* Sidebar Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                bgcolor: "#0d1b2a",
                borderRight: "1px solid #1b2838",
              },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                bgcolor: "#0d1b2a",
                borderRight: "1px solid #1b2838",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        )}
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: { md: `calc(100% - ${drawerWidth}px)` },
          height: "100vh",
        }}
      >
        {/* Messages Area */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            background: "linear-gradient(to bottom, #0a1525, #0f1d2e)",
            p: { xs: 2, md: 3 },
            // hide vertical scrollbar but allow scrolling
            "&::-webkit-scrollbar": { width: 0, height: 0 },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {messages.length === 0 ? (
            <Container
              maxWidth="md"
              sx={{ height: "100%", display: "flex", alignItems: "center" }}
            >
              <Box sx={{ textAlign: "center", width: "100%" }}>
                <Fade in timeout={800}>
                  <Box>
                    <Avatar
                      sx={{
                        width: 120,
                        height: 120,
                        margin: "0 auto 3rem",
                        background: "linear-gradient(135deg, #1e3a29, #15803d)",
                        fontSize: "4rem",
                        boxShadow: "0 8px 32px rgba(34, 197, 94, 0.2)",
                      }}
                    >
                      🩺
                    </Avatar>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        background: "linear-gradient(135deg, #4ade80, #22c55e)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        mb: 2,
                      }}
                    >
                      Assalamualaikum!
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ color: "#94a3b8", mb: 5, lineHeight: 1.6 }}
                    >
                      Main aapka HealthMate Pro hoon. Aap apni medical reports
                      upload kar sakte hain ya mujhse koi bhi health-related
                      sawal pooch sakte hain.
                    </Typography>

                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      spacing={2}
                      sx={{ mt: 4 }}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          flex: 1,
                          p: 3,
                          background:
                            "linear-gradient(135deg, #1e293b, #0f172a)",
                          border: "1px solid #1b2838",
                          borderRadius: 3,
                          textAlign: "left",
                          transition: "all 0.3s",
                          "&:hover": {
                            border: "1px solid #22c55e",
                            transform: "translateY(-4px)",
                            boxShadow: "0 8px 24px rgba(34, 197, 94, 0.15)",
                          },
                        }}
                      >
                        <DocumentIcon
                          sx={{ fontSize: 40, color: "#4ade80", mb: 1.5 }}
                        />
                        <Typography
                          variant="h6"
                          sx={{ color: "white", fontWeight: 700, mb: 1 }}
                        >
                          Upload Reports
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#64748b", lineHeight: 1.5 }}
                        >
                          PDF ya image format mein apni medical reports upload
                          karein
                        </Typography>
                      </Paper>

                      <Paper
                        elevation={0}
                        sx={{
                          flex: 1,
                          p: 3,
                          background:
                            "linear-gradient(135deg, #1e293b, #0f172a)",
                          border: "1px solid #1b2838",
                          borderRadius: 3,
                          textAlign: "left",
                          transition: "all 0.3s",
                          "&:hover": {
                            border: "1px solid #22c55e",
                            transform: "translateY(-4px)",
                            boxShadow: "0 8px 24px rgba(34, 197, 94, 0.15)",
                          },
                        }}
                      >
                        <QuestionIcon
                          sx={{ fontSize: 40, color: "#4ade80", mb: 1.5 }}
                        />
                        <Typography
                          variant="h6"
                          sx={{ color: "white", fontWeight: 700, mb: 1 }}
                        >
                          Ask Questions
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#64748b", lineHeight: 1.5 }}
                        >
                          Apni health concerns ke baare mein mujhse sawal karein
                        </Typography>
                      </Paper>
                    </Stack>
                  </Box>
                </Fade>
              </Box>
            </Container>
          ) : (
            <Container maxWidth="md">
              <Stack spacing={2.5} sx={{ pb: 2 }}>
                {messages.map((msg, idx) => (
                  <Slide key={idx} direction="up" in timeout={300}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent:
                          msg.from === "user" ? "flex-end" : "flex-start",
                        overflowX: "hidden",
                      }}
                    >
                      <Stack
                        direction={msg.from === "user" ? "row-reverse" : "row"}
                        spacing={1.5}
                        sx={{ maxWidth: { xs: "100%", md: "65%" }, alignItems: "flex-start", minWidth: 0 }}
                      >
                        <Avatar
                          sx={{
                            background:
                              msg.from === "user"
                                ? "linear-gradient(135deg, #3b82f6, #2563eb)"
                                : "linear-gradient(135deg, #22c55e, #16a34a)",
                            width: 36,
                            height: 36,
                            boxShadow:
                              msg.from === "user"
                                ? "0 4px 12px rgba(59, 130, 246, 0.3)"
                                : "0 4px 12px rgba(34, 197, 94, 0.3)",
                          }}
                        >
                          {msg.from === "user" ? "👤" : "🤖"}
                        </Avatar>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            borderRadius: "14px",
                            transition: "all 0.25s ease",
                            background:
                              msg.from === "user"
                                ? "linear-gradient(135deg, #3b82f6, #2563eb)"
                                : "linear-gradient(135deg, #1e293b, #0f172a)",
                            border:
                              msg.from === "bot" ? "1px solid #1b2838" : "none",
                            boxShadow:
                              msg.from === "user"
                                ? "0 4px 16px rgba(59, 130, 246, 0.2)"
                                : "0 4px 16px rgba(0, 0, 0, 0.3)",
                            wordBreak: "break-word",
                            overflowWrap: "anywhere",
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              color: msg.from === "user" ? "white" : "#e2e8f0",
                              whiteSpace: "pre-wrap",
                              lineHeight: 1.6,
                            }}
                          >
                            {msg.text}
                          </Typography>
                        </Paper>
                      </Stack>
                    </Box>
                  </Slide>
                ))}

                {loading && (
                  <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                    <Stack
                      direction="row"
                      spacing={1.5}
                      alignItems="flex-start"
                    >
                      <Avatar
                        sx={{
                          background:
                            "linear-gradient(135deg, #22c55e, #16a34a)",
                          width: 36,
                          height: 36,
                        }}
                      >
                        🤖
                      </Avatar>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          borderRadius: 3,
                          background:
                            "linear-gradient(135deg, #1e293b, #0f172a)",
                          border: "1px solid #1b2838",
                        }}
                      >
                        <Stack direction="row" spacing={0.75}>
                          {[0, 1, 2].map((i) => (
                            <Box
                              key={i}
                              sx={{
                                width: 8,
                                height: 8,
                                bgcolor: "#4ade80",
                                borderRadius: "50%",
                                animation: "bounce 1s infinite",
                                animationDelay: `${i * 0.2}s`,
                                "@keyframes bounce": {
                                  "0%, 100%": { transform: "translateY(0)" },
                                  "50%": { transform: "translateY(-8px)" },
                                },
                              }}
                            />
                          ))}
                        </Stack>
                      </Paper>
                    </Stack>
                  </Box>
                )}
                <div ref={messagesEndRef} />
              </Stack>
            </Container>
          )}
        </Box>

        {/* Input Area */}
        <Box
          sx={{
            borderTop: "1px solid #1b2838",
            bgcolor: "#0d1b2a",
            p: { xs: 2, md: 2.5 },
          }}
        >
          <Container maxWidth="md">
            {file && (
              <Paper
                elevation={0}
                sx={{
                  mb: 1.5,
                  p: 1.5,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  background: "linear-gradient(135deg, #1e3a29, #15803d)",
                  border: "1px solid #22c55e",
                  borderRadius: 2,
                }}
              >
                <Avatar
                  sx={{
                    background: "linear-gradient(135deg, #22c55e, #16a34a)",
                    width: 44,
                    height: 44,
                  }}
                >
                  📎
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "white",
                      fontWeight: 600,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {file.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#4ade80" }}>
                    {(file.size / 1024).toFixed(1)} KB
                  </Typography>
                </Box>
                <IconButton
                  onClick={() => setFile(null)}
                  sx={{ color: "#ef4444" }}
                >
                  <CloseIcon />
                </IconButton>
              </Paper>
            )}

            <Stack direction="row" spacing={1.5} alignItems="flex-end">
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf,image/*"
                hidden
                onChange={handleFileSelect}
              />

              <IconButton
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
                sx={{
                  bgcolor: "#1e293b",
                  border: "1px solid #334155",
                  color: "#cbd5e1",
                  borderRadius: "10px",
                  transition: "all 0.2s ease",
                  "&:hover": { bgcolor: "#334155", transform: "translateY(-2px)" },
                  "&:disabled": { opacity: 0.5 },
                }}
              >
                <AttachFileIcon />
              </IconButton>

              <TextField
                fullWidth
                multiline
                maxRows={4}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Apna sawal yahan likhein..."
                disabled={loading}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "12px",
                    color: "white",
                    transition: "all 0.22s ease",
                    boxShadow: "inset 0 2px 8px rgba(0,0,0,0.35)",
                    "& fieldset": { border: "none" },
                    "&:hover": {
                      border: "1px solid #475569",
                      transform: "translateY(-1px)",
                    },
                    "&.Mui-focused": {
                      border: "1px solid #22c55e",
                      boxShadow: "0 6px 20px rgba(34,197,94,0.12)",
                    },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "#64748b",
                    opacity: 1,
                  },
                }}
              />

              <IconButton
                onClick={sendMessage}
                disabled={(!inputText.trim() && !file) || loading}
                sx={{
                  background:
                    (!inputText.trim() && !file) || loading
                      ? "#334155"
                      : "linear-gradient(135deg, #22c55e, #16a34a)",
                  color: "white",
                  borderRadius: "10px",
                  transition: "all 0.18s ease",
                  "&:hover": {
                    background:
                      (!inputText.trim() && !file) || loading
                        ? "#334155"
                        : "linear-gradient(135deg, #16a34a, #15803d)",
                    transform: "translateY(-2px)",
                  },
                  "&:disabled": { opacity: 0.5 },
                  boxShadow:
                    (!inputText.trim() && !file) || loading
                      ? "none"
                      : "0 4px 12px rgba(34, 197, 94, 0.3)",
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  <SendIcon />
                )}
              </IconButton>
            </Stack>

            <Typography
              variant="caption"
              sx={{
                display: "block",
                textAlign: "center",
                color: "#64748b",
                mt: 1.5,
              }}
            >
              HealthMate Pro AI-powered analysis — Sirf samajhne ke liye,
              medical advice nahi
            </Typography>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
