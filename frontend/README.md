# 🌌 ChronosHub: Universal Precision Engine

**ChronosHub** is a high-performance, multi-module calculation suite designed for scientific precision, temporal analysis, and universal measurement conversions. It bridges the gap between simple tools and professional engineering software.

![Version](https://img.shields.io/badge/version-3.0.0-blue.svg)
![Python](https://img.shields.io/badge/Python-3.10+-yellow.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)
![Vite](https://img.shields.io/badge/Vite-5-purple.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-3-cyan.svg)

---

## 🚀 The Six Pillars (Modules)

### 1. ⏱️ Chronos (Time Engine)
An atomic-precision temporal engine that calculates the exact gap between any two points in history.
*   **Hierarchical Delta:** Breakdown by Years, Months, Days, Hours, Minutes, and Seconds.
*   **Absolute Accumulation:** View life in total Weeks, Days, or Seconds.
*   **Live Sync Mode:** A real-time heartbeat that updates your age/duration every second.

### 2. 🧮 Math & Graph Engine
Powered by **SymPy**, this module handles symbolic mathematics—not just floating-point numbers.
*   **Symbolic Logic:** Returns exact values (e.g., `2*sqrt(2)`) for scientific accuracy.
*   **Function Visualizer:** Input equations like `sin(x) * 5` to generate a dynamic graph using **Recharts**.
*   **Advanced Keypad:** Professional scientific interface for complex formulas.

### 3. 💱 Unit & FX Converter
The most comprehensive conversion tool in the suite, combining physics and finance.
*   **160+ World Currencies:** Live real-time exchange rates (e.g., **USD to LKR**, EUR to INR).
*   **9 Scientific Categories:** Length, Mass, Temperature, Area, Volume, Speed, Digital Data, Pressure, and Energy.
*   **Base-Unit Logic:** Uses SI base-unit conversion for 100% mathematical consistency.

### 4. 🌍 World Time Synchronizer
A global searchable database of every time zone on the planet.
*   **IANA Database:** Access 400+ indexed locations across all countries and continents.
*   **Dynamic Search:** Find any city or country (e.g., "Colombo", "Dubai", "New York") instantly.
*   **DST Aware:** Automatically handles Daylight Savings Time and UTC offsets.

### 5. 💳 Financial Engineering
Professional-grade money math for loans and investments.
*   **EMI Calculator:** Calculate monthly installments, total interest, and full repayment schedules.
*   **Amortization Logic:** Understand the true cost of borrowing over time.

### 6. 🔐 Developer & Security Toolbox
Technical utilities for programmers and security-conscious users.
*   **Hashing:** Secure SHA-256 generation.
*   **Encoding:** Base64 Data encoding/decoding.
*   **Security:** High-entropy random password generator.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, Recharts, Lucide Icons |
| **Backend** | FastAPI (Python), SymPy, NumPy, Requests, Dateutil |
| **Deployment** | Docker, Docker Compose, Git |
| **APIs** | ExchangeRate-API (Live FX), IANA Timezone Database |

---

## 📂 Folder Structure

```text
CHRONOSHUB/
├── backend/
│   ├── main.py             # Central API Router & CORS
│   ├── requirements.txt    # Python Dependencies
│   └── engine/             # Logic Modules
│       ├── calculator.py   # Time Math
│       ├── math_engine.py  # Symbolic Math & Graphing
│       ├── unit_engine.py  # Unit Conversions
│       ├── finance_engine.py # Loan/EMI Math
│       └── dev_engine.py    # Hashing & Security
├── frontend/
│   ├── index.html          # Root HTML (Vite Entry)
│   ├── package.json        # JS Dependencies
│   ├── vite.config.js      # Build Configuration
│   └── src/
│       ├── App.jsx         # Main Dashboard & Tab Controller
│       ├── main.jsx        # React Injection Logic
│       ├── components/     # Reusable UI (StatCard.jsx)
│       └── tabs/           # Module Views (Time, Math, Units, etc.)
└── docker-compose.yml      # Multi-container Deployment
```

---

## ⚙️ Installation & Execution

### 1. Backend Setup
```bash
cd backend
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Install requirements:
pip install fastapi uvicorn python-dateutil sympy numpy requests
# Start Engine:
python -m uvicorn main:app --reload
```

### 2. Frontend Setup
```bash
cd frontend
# Install dependencies:
npm install
# Fix Vite dependencies if needed:
npm install react-is recharts
# Start Dashboard:
npm run dev
```

---

## 🐳 Docker Deployment
To launch the entire platform in isolated containers:
```bash
docker-compose up --build
```

---

## 📜 Engineering Highlights
*   **Zero-Loop Business Logic:** High-speed math formulas replace heavy loops for business day calculations.
*   **Batch State Management:** Category-based state updates prevent cascading renders and improve UI snappiness.
*   **Symbolic Evaluation:** Bypasses standard Python `eval()` for `sympy.sympify()`, providing both safety and infinite mathematical precision.

---
**Developed by [Your Name/Nethru]**  
*Universal. Precise. Unlimited.*