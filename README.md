# React + Flask + SQLite Energy Resiliency Demo

A full-stack demo app for visualizing and managing energy resiliency projects for data centers. Features a modern dark mode UI, animated system flow visualization, project detail generation, and full CRUD (create, read, update, delete) for project data.

---

## 🛠️ Stack
- **Frontend:** React (TypeScript, Tailwind CSS, dark mode)
- **Backend:** Flask (Python, REST API)
- **Database:** SQLite (mock data, not tracked in git)

---

## ✨ Features
- **Animated System Flow:**
  - Diagram shows the flow: Frontend → API → Backend → DB → Response → Table Update
  - Each step is highlighted and status text updates as actions happen
- **CRUD for Energy Projects:**
  - Add, edit, delete, and view energy resiliency projects (mock data for data centers)
- **Project Detail Generation:**
  - Use the "Generate" button in the Add Project dialog to auto-fill project details
  - Details are generated from a pool of 20 US cities and 20 project title/description templates
  - Impact score is randomly generated (0–10, 1 decimal)
- **API Call Transparency:**
  - See the actual API call being made during each operation
  - Last API call is always visible
- **Delay Toggle:**
  - Toggle the animation delay on/off for instant or step-by-step flow visualization
  - The toggle is next to the Add Project button in the table header
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

## 📝 Usage Notes
- **Generate Project Details:**
  - Click "+ Add Project" → then click "Generate" in the dialog to auto-fill all fields with realistic data
- **Delay Toggle:**
  - Use the "Delay" slider next to the Add Project button to enable/disable step-by-step animation
- **Data:**
  - Project locations and templates are stored in separate tables in the backend and used for generation only
  - The main projects table is user-facing and supports full CRUD

---

## 📊 Example Data
- Projects table includes mock energy projects (solar, battery, wind, etc.) for data centers
- Generation uses 20 US cities and 20 project templates

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

!NFA1!1vzWVTrruyC2MyNMwstdT00EQRehO5asXRTtDuav5AIDIKBAI3nKko1H1JTNM1Z80mRDbHqvOkegHqa35ahrcjoXrehraxG)d4ccj4g)hGSNDw869nxNVFFZ7nFZBN1zsrWz8sqHWiIsToSmNmKcxxsvXc3EcjDmv6grgXdhafurIy1KxzPjlblFoJ3fkOaAueCbw3lEN)mX71AtvkQ09akjIX77EgzmTaQJVkXXlop6kyOB9Se0l1yaHXNT3xgDp)9eWl3mImK66pqeE(6OKFNHCFImEGMCnmYv)(eY1Nr(omEx3armD4gO77FN2bsHkwVVphJ82sKEDveYBwCVFjbDLomiM1L(PyB4f2iH6kTz9heZNgP3xefFTjlNhEVb4WWsXc4XFcAd)UihTpgL8jiH7hH1g3(3mdbbs6qHuNS6M4EOg(xZTrlPyeV70(EopFaMNTCs8SXdiCIRpixW17JwP)kX1nowWucUBJikHRwW6(iwVzX9(rZX6msmv66pGrJ6QD8mSIDNFnXWM(XskVF8axrpxD6nx1Oyv761(ztMm78fW6sN3uF0c(ngp(XcovDoJpVNq0e5Fmn5BYuuIIIhjTW8(fhyM3MrYcD7qdjrrAlhIMIFRzG(LmEowkEcnmMj4AFFiwPU3RBSDejEKK(Qkx)NY6fZPkL22lJoLm0Ki6hzs)Uq7Pb(f9TsmTAtMK6EKymrJ)gyL4KTsOVADEivfljrU(atYs(S7ZqVP(PetR5tjlo5El07P2jokC8izFQMCt0Z8yZTYzmE3EJKV38B(NJA55M0TLKesNoMwNL572VeZ2Lo18eERbtF84mrupnED0d9pKz8mmI805lbd1ZFy(9L5hkt)wImCEJqXHKqPq91VaCXPVKZ49vt2gCkbRvVrWHp8O7FAqWdpQe44LDfpWPC2vkdovYUsfWPA2vQconYUYoGtaCLm1ABWP5clvcCATWsEWk(hCyZGxRjS5doTDWHjQ17uk1ucrlBeP7rj4g4egaplaP7qzlaLnavSauXau1cqvdqdla7ya23cWDnaNybOMbOJfGDnab2IYTbN9ZEZExW5KSRudC6KDLDHInc60oF(7zYFTEU43Ze)A9CPVNj9165cFpt4R1ZL9EMSxRNl69mrVwpxYxoB)NlxlNT)cSOB6VCxCLZE(BAr30)TSOVduOEBKXFpZv4mzBPFnTSTWFxTCLfhz8shzMPx1MEjTEdB6EGZBB5CLoXBdOg48ilsPZ6pAXcx()N1FlBAPVyyLW7)a

```
