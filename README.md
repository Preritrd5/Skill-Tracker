# Skill Tracker

A full-stack application that allows users to track, monitor, and analyze their skills over time.  
The project contains two standalone apps:

- **Backend_App** — Node.js + Express + MongoDB API
- **Frontend_App** — React (Vite) client application

---

## 🚀 Features

### Frontend (React)
- User authentication pages (Login / Signup)
- Dashboard with analytics and progress tracking
- Add / edit / view skills
- Protected routes using context-based auth
- Clean UI with reusable components

### Backend (Node.js + Express)
- JWT authentication (login/signup)
- Skill CRUD APIs
- Session tracking
- Analytics endpoints
- MongoDB models for Users, Skills, Sessions

---

## 📂 Project Structure

Skill-Tracker/
│
├── Backend_App/
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ └── server.js
│
├── Frontend_App/
│ ├── public/
│ └── src/
│
└── .gitignore

## 🛠️ Installation & Setup

### 1️⃣ Clone the repo
```bash
git clone https://github.com/Preritrd5/Skill-Tracker.git
cd Skill-Tracker

2️⃣ Backend Setup
cd Backend_App
npm install


Create a .env file:

MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
PORT=4000


Run backend:

npm start

3️⃣ Frontend Setup
cd ../Frontend_App
npm install
npm run dev