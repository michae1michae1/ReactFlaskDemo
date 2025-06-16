# React + Flask + SQLite Energy Resiliency Demo

A full-stack demo app for visualizing and managing energy resiliency projects for data centers. Features a modern dark mode UI, animated system flow visualization, and full CRUD (create, read, update, delete) for project data.

---

## 🛠️ Stack
- **Frontend:** React (TypeScript, Tailwind CSS, dark mode)
- **Backend:** Flask (Python, REST API)
- **Database:** SQLite (mock data, not tracked in git)

---

## ✨ Features
- **Animated System Flow:**
  - Static diagram shows the real-time flow: Frontend → API → Backend → DB → Response → Table Update
  - Each step is highlighted and status text updates as actions happen
- **CRUD for Energy Projects:**
  - Add, edit, delete, and view energy resiliency projects (mock data for data centers)
- **API Call Transparency:**
  - See the actual API call being made during each operation
  - Last API call is always visible
- **Modern Dark Mode UI:**
  - Beautiful, accessible, and easy on the eyes

---

## 🚀 Quick Start

### 1. Clone and Install
```sh
git clone https://github.com/yourusername/energy-resiliency-demo.git
cd energy-resiliency-demo
```

### 2. Backend Setup
```sh
cd backend
python3 -m pip install -r requirements.txt
python3 generate_db.py
python3 app.py
```
- Flask API runs at [http://localhost:8050](http://localhost:8050)

### 3. Frontend Setup
```sh
cd frontend
npm install
REACT_APP_API_BASE_URL=http://localhost:8050 npm start
```
- React app runs at [http://localhost:3000](http://localhost:3000)

---

## 📊 Example Data
- Projects table includes mock energy projects (solar, battery, wind, etc.) for data centers

---

## 📁 Project Structure
```
energy-resiliency-demo/
├── backend/
│   ├── app.py
│   ├── generate_db.py
│   ├── requirements.txt
│   └── sample.db  # (ignored by git)
├── frontend/
│   ├── src/
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── ...
└── README.md
```

---

## 📝 License
MIT