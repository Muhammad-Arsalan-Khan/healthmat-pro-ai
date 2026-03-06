# 💚 HealthMate – Sehat ka Smart Dost

> **AI-powered health companion app** that helps users upload, understand, and manage their medical reports — in **English + Roman Urdu**.  
> Built for the **Sehat Files Hackathon 2025**.

--

live : https://healthmatpro.netlify.app/

## 🧭 The Real-Life Story

Every family has someone who needs regular tests and prescriptions. Managing all those reports and follow-ups becomes messy.  
When the doctor says, *“Pichlay reports laao,”* we start scrolling through WhatsApp or digging into folders 😩.

**HealthMate** solves this by providing a single, secure space to:
- Upload all your **medical reports** (PDF or image)
- Get **AI-powered summaries** (no OCR needed!)
- View your entire **health timeline**
- Add manual vitals like **BP, Sugar, Weight**
- Read everything in **simple bilingual format** (English + Roman Urdu)

---

## ✨ Features

- 🤖 **AI-Powered Analysis** - Google Gemini 1.5 Flash integration
- 📄 **Multi-Format Support** - PDF, JPG, PNG, WEBP
- 🌐 **Bilingual** - English + Roman Urdu responses
- 💬 **Chat Interface** - Interactive conversation with AI
- 🔒 **Secure** - JWT authentication & encrypted data
- 📱 **Responsive Design** - Works on all devices
- ⚡ **Real-time Processing** - Instant report analysis

## 💡 The Big Idea

> “Yeh sirf ek project nahi — ek real-life problem ka digital solution hai.”

HealthMate uses **Gemini AI** to automatically read and explain uploaded medical reports.  
It simplifies complex lab data, highlights important points, and gives you insights you can actually understand.

---

## 🧩 Tech Stack

| Layer | Technologies Used |
|-------|--------------------|
| **Frontend** | React + Material UI (MUI) |
| **Backend** | Node.js + Express |
| **Database** | MongoDB Atlas |
| **AI Model** | Gemini 1.5 Pro / 1.5 Flash |
| **Hosting** | Vercel (frontend) + Render (backend) |

---

## 🧱 Architecture Overview

```text
Frontend (React + MUI)
        ↓
Backend API (Express)
        ↓
Gemini AI Model (PDF/Image Reader)
        ↓
MongoDB Database
```
Flow:

User uploads report or enters vitals.

Backend sends it to Gemini for analysis.

Gemini returns bilingual summary.

Backend stores it in MongoDB.

UI displays reports, summaries, and vitals timeline.

🎨 UI Highlights

Elegant green-themed interface with Material UI

Chat-style input field for uploading and talking with AI

Advanced animated layout for report upload and summary display

Fully responsive design — smooth on both desktop and mobile

Simple, bilingual (English + Roman Urdu) text system

⚙️ Local Setup
# Clone the repository
git clone https://github.com/yourusername/healthmate.git
cd healthmate

# Install dependencies
npm install

# Run locally
npm start


Make sure to configure your .env file for backend APIs (MongoDB, Gemini Key, etc.)

🔐 Security & Privacy

JWT authentication

Signed URLs for secure file access

Encrypted user data

Disclaimer:

“AI is for understanding only, not for medical advice.”
“Yeh AI sirf samajhne ke liye hai, ilaaj ke liye nahi.”

🧠 How Gemini Helps

Reads PDF or image reports directly — no manual OCR needed

Highlights abnormal values (e.g., WBC high, Hb low)

Gives bilingual summaries

Suggests questions to ask your doctor

Recommends dietary and home remedies

Always ends with a safety note: Consult your doctor before acting.

🚀 Deployment

Frontend: netlify

Backend: localhost

Database: MongoDB Atlas

🏆 Credits

Team: HealthMate (Sehat Files Hackathon 2025)

💬 Final Words

“AI ke zariye kisi ke liye life easy banana — that’s real impact.”
Think creatively, build independently, and always keep user trust first.
