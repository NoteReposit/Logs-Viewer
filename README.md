# Logs Viewer (MERN Stack)

หน้าแสดงรายการบันทึกการใช้งานระบบ (System Access Logs) พัฒนาด้วย **MERN Stack** (MongoDB, Express, React, Node.js)
## ฟีเจอร์หลัก (Features)

* **Log Dashboard:** แสดงรายการ Log ในรูปแบบตาราง
* **Advanced Filtering:** ระบบค้นหาข้อมูลอย่างละเอียด ประกอบด้วย:
    * **Date Range:** ค้นหาตามช่วงเวลา (Start Date - End Date)
    * **User:** ค้นหาตามผู้ใช้งาน (Dropdown list จากฐานข้อมูล)
    * **Action:** ค้นหาตามประเภทกิจกรรม (Dropdown)
    * **Status Code:** ค้นหาตาม HTTP Status Code
    * **Lab Number:** ค้นหาเลข Lab Number
    * **Response Time:** ค้นหาตามช่วงเวลาการประมวลผล (Min - Max ms)
* **Pagination:** ระบบแบ่งหน้าข้อมูล (แสดงผล 50 รายการต่อหน้า)

## Tech Stack

### Frontend
* **React** (Vite)
* **Tailwind CSS** - สำหรับการตกแต่ง UI
* **Axios** - สำหรับเชื่อมต่อ API
* **Lucide React** - สำหรับ Icons (Arrow, Pagination)

### Backend
* **Node.js** & **Express.js** - Server Framework
* **MongoDB** & **Mongoose** - Database
* **Cors** - จัดการ Cross-Origin Resource Sharing

## วิธีการติดตั้งและใช้งาน (Installation)

### 1. เตรียมความพร้อม (Prerequisites)
* [Node.js](https://nodejs.org/) (v22)
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) หรือ MongoDB ที่ติดตั้งในเครื่อง

### 2. การติดตั้งส่วน Backend (Server)

1. เข้าไปที่โฟลเดอร์ `backend`
   ```bash
   cd backend
2. ติดตั้ง Dependencies
   ```bash
   npm install
3. สร้างไฟล์ .env และกำหนดค่า Config
   ```Code snippet
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/myDatabase
   PORT=5001
4. รัน Server
   ```bash
   npm run dev
### 3. การติดตั้งส่วน Frontend (Client)
1. เข้าไปที่โฟลเดอร์ `backend`
   ```bash
   cd frontend
2. ติดตั้ง Dependencies
   ```bash
   npm install
3. รัน Server
   ```bash
   npm run dev

## โครงสร้าง (Structure)
    Logs-Viewer/
    ├── backend/
    │   ├── config/          # Database connection
    │   ├── controllers/     # Logic (logsController.js, usersController.js)
    │   ├── models/          # Mongoose Schema (Log.js, User.js)
    │   ├── routes/          # API Routes
    │   └── server.js        # Entry Point
    │
    └── frontend/
        ├── src/
        │   ├── pages/       # LogPage.jsx
        │   └── App.jsx
        └── tailwind.config.js