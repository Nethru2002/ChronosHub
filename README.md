# 🌌 ChronosHub: The Universal Precision Engine

ChronosHub is a high-performance, multi-module utility platform designed for professionals, engineers, and scientists. It combines high-precision temporal tracking with symbolic mathematics, global currency exchange, and developer security tools.

![Version](https://img.shields.io/badge/version-3.5.0-blueviolet.svg)
![React](https://img.shields.io/badge/Frontend-React_18_%2B_Vite-blue.svg)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI_%2B_Python-green.svg)

---

## 🚀 Key Modules

### 1. ⏱️ Chronos Engine (Time)
*   **Hierarchical Delta:** Accurate age breakdown (Years/Months/Days/Hours/Min/Sec).
*   **Live Atomic Sync:** Real-time calculation engine that updates every second.
*   **Absolute Metrics:** Total life accumulation in weeks, days, and seconds.

### 2. 📉 Math & Graph Visualizer
*   **Symbolic Evaluation:** Powered by **SymPy** for exact mathematical results (e.g., constants, fractions, and square roots).
*   **Function Grapher:** Dynamic **Recharts** integration that plots any equation containing `x` (e.g., `sin(x)`).
*   **Calculation Tape:** Persistent history of recent mathematical operations.

### 3. 💱 Universal Convert & FX
*   **Live Currency Exchange:** Real-time rates for **160+ World Currencies** (e.g., USD to LKR, EUR to JPY).
*   **Scientific Metrics:** 10+ categories including Length, Mass, Energy, Pressure, and Digital Data.
*   **Linear & Non-Linear Logic:** Specialized handling for Temperature (C/F/K) and Scientific units.

### 4. 🌍 World Clock Terminal
*   **Global IANA Database:** Searchable access to every official time zone on Earth.
*   **Contextual Data:** Displays localized dates and UTC offsets for 400+ locations.

### 5. 💳 Finance & Dev Toolbox
*   **Finance:** Loan/EMI amortization engine with interest breakdown.
*   **Security:** SHA-256 Hashing, Base64 encoding, and high-entropy password generation.

---

## 🛠️ Technical Stack

*   **Frontend:** React 18, Vite, Tailwind CSS, Recharts.
*   **Backend:** Python 3.10+, FastAPI, SymPy (Symbolic Math), Numpy (Data Processing).
*   **External APIs:** ExchangeRate-API (Live FX Streaming).

---

## ⚙️ Installation & Launch

### 1. Backend Setup
```bash
cd backend
pip install fastapi uvicorn python-dateutil sympy numpy requests
python -m uvicorn main:app --reload
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 📐 Engineering Logic
*   **Symbolic Math:** Uses `sympy.lambdify` to convert string expressions into executable NumPy functions for graphing.
*   **Temporal Precision:** Leverages `dateutil.relativedelta` to handle the varying length of months and leap years.
*   **Unit Consistency:** All physical measurements are normalized to an **SI Base Unit** before target conversion to eliminate rounding errors.

---
**Maintained by: Nethru Randev**
*Precision. Speed. Universality.*
```