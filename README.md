# 💼 Job Seeking Web Application (MERN Stack)

A full-stack Job Seeking platform built using the MERN stack where users can register, create profiles, browse job listings, and apply for jobs.  
The project focuses on real-world hiring workflow, authentication, and clean UI/UX.

---

## 🚀 Features

### 👤 Job Seekers
- User Registration & Login (JWT Authentication)
- Create & Update Profile
- Browse Job Listings
- Search & Filter Jobs
- Apply for Jobs
- View Applied Jobs

### 🏢 Recruiters / Admin
- Post New Jobs
- Edit / Delete Job Listings
- View Applicants
- Manage Users

---

## 🧑‍💻 Tech Stack

### Frontend
- React (Vite)
- CSS / Bootstrap
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Authentication
- JWT (JSON Web Tokens)
- Bcrypt Password Hashing

---

## 📁 Project Structure

client/
├── components/
├── pages/
├── common/
└── App.js

server/
├── models/
├── routes/
├── controllers/
└── index.js


---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/dev220805/Job-Seeking
Backend Setup
cd server
npm install
npm start
Create .env file:

MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
PORT=5000
Frontend Setup
cd client
npm install
npm run dev
🔐 Environment Variables
MONGO_URI

JWT_SECRET

PORT
