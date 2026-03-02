# 📊 Logs Viewer (MERN Stack)

This page displays the system access logs, developed using the **MERN Stack** (MongoDB, Express, React, Node.js).

🔗 **Live Demo:** [View Project](https://logs-viewer-frontend.onrender.com/)

---

## ✨ Key Features

* **Log Dashboard:** Interactive data table for real-time log monitoring.
* **Advanced Filtering System:** Highly granular search capabilities including:
    * **Date Range:** Filter by specific timeframes (Start Date - End Date).
    * **User Identification:** Search by specific users (Dynamic dropdown from DB).
    * **Action Types:** Categorize by system activities and events.
    * **HTTP Status Codes:** Quickly isolate errors or successful requests.
    * **Lab Number:** Direct lookup for specific laboratory identifiers.
    * **Response Time:** Performance-based filtering (Min - Max ms).
* **Optimized Pagination:** Smooth data handling with 50 records per page for better performance.

---

## 🛠 Tech Stack

### Frontend
* **React (Vite)** - Modern and fast development environment.
* **Tailwind CSS** - Utility-first CSS framework for responsive design.
* **Axios** - Promise-based HTTP client for API communication.
* **Lucide React** - Clean and consistent iconography.

### Backend
* **Node.js & Express.js** - Robust server-side framework.
* **MongoDB & Mongoose** - Scalable NoSQL database with schema modeling.
* **CORS** - Managed Cross-Origin Resource Sharing.

---

## 🚀 Installation & Setup

### 1. Prerequisites
* [Node.js](https://nodejs.org/) (v22 or higher recommended)
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or a local MongoDB instance.

### 2. Backend Configuration
1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file and configure your environment variables:
    ```env
    MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/myDatabase
    PORT=5001
    FRONTEND_URL=http://localhost:5173
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```

### 3. Frontend Configuration
1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file and set the API endpoint:
    ```env
    VITE_API_URL=http://localhost:5001
    ```
4.  Launch the application:
    ```bash
    npm run dev
    ```

---

## 📁 Project Structure

```text
Logs-Viewer/
├── backend/
│   ├── config/          # Database connection setup
│   ├── controllers/     # Logic (logsController.js, usersController.js)
│   ├── models/          # Mongoose Schemas (Log.js, User.js)
│   ├── routes/          # API Route definitions
│   └── server.js        # Backend entry point
│
└── frontend/
    ├── src/
    │   ├── pages/       # Page components (LogPage.jsx)
    │   └── App.jsx      # Main application component
    └── tailwind.config.js
