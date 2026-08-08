import { GoogleGenerativeAI } from "@google/generative-ai";
import * as pdf from "pdf-parse";
import dotenv from "dotenv";
import ChatHistory from "../../models/history/history.js";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getMedicalPrompt = (chatHistory = []) => {
  let contextPrompt = `Aap ek highly advanced medical AI assistant hain, jiska naam **HealthMate Pro** hai.
    
    **IMPORTANT INSTRUCTIONS - STRICTLY FOLLOW:**
    
    1. **Identity & Greeting:**
       - Agar yeh conversation ka pehla message hai, toh "Assalamualaikum" se greeting dein
       - Agar user "Walaikum Assalam" ya koi aur Islamic greeting de, toh aap bhi properly respond karein
    
    2. **Language Requirements - CRITICAL:**
       - Apko user ki language aur tone ko samajh kar jawab dena hai ya phir os language main jis language main user demand karein
       - Medical terms ke saath user ki language main  explanation bhi dein
    
    3. **Context Awareness:**
       - Aapko is conversation ki poori history yaad hai
       - User ki previous health concerns, reports, aur problems ka reference dein
       - Agar user pehle kuch pucha tha aur ab follow-up kar raha hai, toh us context mein jawab dein
    
    4. **Response Style:**
       - Simple, aasan, aur samajhne layak user ki language main
       - Friendly aur caring tone
       - Jahan zaroorat ho emojis use karein
    
    **Gemini ka zikr bilkul na karein. Hamesha apne aap ko 'HealthMate Pro' ya 'main' kehkar refer karein.**`;

  // Add conversation history for context
  if (chatHistory && chatHistory.length > 0) {
    contextPrompt += `\n\n**Previous Conversation History (for context):**\n`;
    chatHistory.forEach((msg) => {
      if (msg.from === "user") {
        contextPrompt += `User: ${msg.text}\n`;
      } else {
        contextPrompt += `HealthMate Pro: ${msg.text}\n`;
      }
    });
    contextPrompt += `\n**Ab naya message:**\n`;
  }

  return contextPrompt;
};

// Create new chat session
const createNewChat = async (req, res) => {
  try {
    const userId = req.params.id;

    const newSession = new ChatHistory({
      userId,
      title: "New Chat",
      messages: [],
      createdAt: new Date(),
    });

    await newSession.save();

    res.json({
      success: true,
      sessionId: newSession._id,
      message: "New chat created successfully",
    });
  } catch (error) {
    console.error("Error creating new chat:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create new chat",
    });
  }
};

// Get all chat sessions for user
const getAllChats = async (req, res) => {
  try {
    const userId = req.params.id;

    const chats = await ChatHistory.find({ userId })
      .sort({ updatedAt: -1 })
      .select("_id title messages createdAt updatedAt")
      .lean();

    // Format chats for sidebar
    const formattedChats = chats.map((chat) => ({
      sessionId: chat._id,
      title:
        chat.title || chat.messages[0]?.text?.substring(0, 30) || "New Chat",
      messageCount: chat.messages.length,
      lastMessage:
        chat.messages[chat.messages.length - 1]?.text?.substring(0, 50) || "",
      createdAt: chat.createdAt,
      updatedAt: chat.updatedAt,
    }));

    res.json({
      success: true,
      chats: formattedChats,
    });
  } catch (error) {
    console.error("Error getting all chats:", error);
    res.status(500).json({
      success: false,
      error: "Failed to load chats",
    });
  }
};

// Get specific chat session
const getChatById = async (req, res) => {
  try {
    const userId = req.params.id;
    const { sessionId } = req.params;

    const chat = await ChatHistory.findOne({
      _id: sessionId,
      userId,
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        error: "Chat not found",
      });
    }

    res.json({
      success: true,
      sessionId: chat._id,
      title: chat.title,
      messages: chat.messages,
      metadata: chat.reportMetadata,
    });
  } catch (error) {
    console.error("Error getting chat:", error);
    res.status(500).json({
      success: false,
      error: "Failed to load chat",
    });
  }
};

// Main chat/analysis endpoint
const getData = async (req, res) => {
  try {
    const userId = req.params.id;
    const { text, sessionId } = req.body;
    const file = req.file;

    if (!text && !file) {
      return res.status(400).json({
        error: "Text ya file required hai.",
        source: "HealthMate Pro",
      });
    }

    // Get or create chat session
    let chatSession;
    if (sessionId) {
      chatSession = await ChatHistory.findOne({ _id: sessionId, userId });
      if (!chatSession) {
        return res.status(404).json({
          success: false,
          error: "Chat session not found",
        });
      }
    } else {
      // Create new session
      chatSession = new ChatHistory({
        userId,
        title: text?.substring(0, 30) || "New Chat",
        messages: [],
      });
    }

    // Save user's message
    const userMessageData = {
      from: "user",
      text: text || "File uploaded",
      timestamp: new Date(),
    };

    if (file) {
      userMessageData.fileInfo = {
        fileName: file.originalname,
        fileSize: file.size,
        fileType: file.mimetype,
        filePath: file.path || file.filename,
      };
    }

    chatSession.messages.push(userMessageData);

    // Update chat title from first user message
    if (chatSession.messages.filter((m) => m.from === "user").length === 1) {
      chatSession.title = text?.substring(0, 30) || "New Chat";
    }

    // Prepare AI prompt with conversation history
    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash",
    });
    let contentParts = [getMedicalPrompt(chatSession.messages.slice(0, -1))]; // Exclude current message
    let promptText = "";

    if (text) {
      promptText += `\n\n**User ka Current Message:**\n"${text}"`;
    }

    if (file) {
      const mimeType = file.mimetype;

      if (mimeType === "application/pdf") {
        const pdfData = await pdf(file.buffer);
        const extractedText = pdfData.text;
        promptText += `\n\n**PDF Medical Report:**\n${extractedText}`;
      } else if (mimeType.startsWith("image/")) {
        contentParts.push({
          inlineData: {
            data: file.buffer.toString("base64"),
            mimeType: mimeType,
          },
        });
        promptText += `\n\n**File Type:** Image-based Medical Report`;
      } else {
        return res.status(400).json({
          error: `Unsupported file type: ${mimeType}`,
          source: "HealthMate Pro",
        });
      }
    }

    contentParts[0] += promptText;

    // Generate AI response
    const result = await model.generateContent(contentParts);
    let analysisText = result.response.text();

    // Clean up response
    analysisText = analysisText.replace(/gemini/gi, "HealthMate Pro");

    // Only add Assalamualaikum for first message
    const isFirstBotMessage =
      chatSession.messages.filter((m) => m.from === "bot").length === 0;
    if (isFirstBotMessage && !analysisText.toLowerCase().includes("assalam")) {
      analysisText = `Assalamualaikum! 🌙\n\n${analysisText}`;
    }

    // Add disclaimer if not present
    const disclaimerText =
      "\n\n⚠️ **Yaad Rakhein:** Yeh analysis sirf samajhne ke liye hai. Behtar ilaaj ke liye apne doctor se zaroor milein.";
    if (!analysisText.includes("Yaad Rakhein")) {
      analysisText += disclaimerText;
    }

    // Save bot's response
    chatSession.messages.push({
      from: "bot",
      text: analysisText,
      timestamp: new Date(),
    });

    chatSession.updatedAt = new Date();
    await chatSession.save();

    res.json({
      success: true,
      source_ai: "HealthMate Pro",
      hasText: !!text,
      hasFile: !!file,
      fileName: file ? file.originalname : null,
      analysis: analysisText,
      sessionId: chatSession._id,
      messageCount: chatSession.messages.length,
      chatTitle: chatSession.title,
    });
  } catch (error) {
    console.error("AI Analysis Error:", error);
    res.status(500).json({
      success: false,
      error: `Analysis fail ho gaya: ${error.message}`,
      source: "HealthMate Pro",
    });
  }
};

// Delete entire chat session
const deleteChat = async (req, res) => {
  try {
    const userId = req.params.id;
    const { sessionId } = req.body;

    const result = await ChatHistory.deleteOne({
      _id: sessionId,
      userId,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        error: "Chat not found",
      });
    }

    res.json({
      success: true,
      message: "Chat deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting chat:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete chat",
    });
  }
};

export { getData, createNewChat, getAllChats, getChatById, deleteChat };
