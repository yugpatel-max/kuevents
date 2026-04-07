# 🎓 KU Events Management System

## 📌 Project Overview
This project is a full-stack web application for managing university events.  
Users can browse events, register, and view their profile.

---

## 🚀 Features

### 👤 Authentication
- User Registration
- User Login
- Logout functionality
- Session handling using localStorage

### 🎉 Events
- View all events
- Filter & search events
- Register for events

### 📊 User Profile
- View logged-in user details
- Logout option

---

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MySQL

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone <your-repo-link>
cd kuevents
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup MySQL
- Create database: `ku_events`
- Run SQL scripts to create tables

### 4. Start backend
```bash
node backend/server.js
```

### 5. Run frontend
- Open `index.html` using Live Server

---

## 📡 API Endpoints

### Auth
- POST `/api/auth/register`
- POST `/api/auth/login`

### Events
- GET `/api/events`

### Registration
- POST `/api/register`
- GET `/api/register/:userId`

### Newsletter
- POST `/api/newsletter`

---

## 🧪 Usage Flow
1. Register a new user
2. Login
3. Browse events
4. Register for an event
5. View profile & logout

---

## 📌 Future Improvements
- JWT Authentication
- Admin panel
- Event seat tracking
- Cloud deployment (GCP)

---

## 👨‍💻 Author
Salman Shaikh

---

## 📄 License
This project is for educational purposes.
