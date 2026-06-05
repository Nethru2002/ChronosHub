from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import requests

# Import all custom engines
from engine.calculator import ChronosEngine
from engine.math_engine import MathEngine
from engine.unit_engine import UnitEngine
from engine.finance_engine import FinanceEngine
from engine.dev_engine import DevEngine

app = FastAPI(title="ChronosHub Universal OS", version="3.0.0")

# Enable CORS for the Vite Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 1. TIME ENGINE ---
@app.get("/calculate")
def calculate_time(start: str, end: str):
    return ChronosEngine.calculate_between(start, end)

# --- 2. MATH & GRAPH ENGINE ---
@app.get("/math")
def calculate_math(expr: str):
    return MathEngine.calculate(expr)

# --- 3. UNIT CONVERTER ---
@app.get("/convert")
def convert_units(cat: str, val: float, f: str, t: str):
    return UnitEngine.convert(cat, val, f, t)

# --- 4. LIVE CURRENCY EXCHANGE (USD to LKR, etc.) ---
@app.get("/currency")
def convert_currency(f: str, t: str, v: float):
    try:
        # Fetching live rates from ExchangeRate-API
        url = f"https://api.exchangerate-api.com/v4/latest/{f.upper()}"
        response = requests.get(url, timeout=5)
        data = response.json()
        rate = data['rates'].get(t.upper())
        if rate:
            return {"result": round(v * rate, 4)}
        return {"error": f"Currency {t} not found"}
    except Exception:
        return {"error": "Currency service offline"}

# --- 5. FINANCE ENGINE ---
@app.get("/finance")
def finance_api(p: float, r: float, t: int):
    return FinanceEngine.calculate_loan(p, r, t)

# --- 6. DEVELOPER TOOLBOX ---
@app.get("/dev")
def dev_api(action: str, text: str = ""):
    return DevEngine.process(action, text)

@app.get("/")
def health():
    return {"status": "ChronosHub Core Online", "version": "3.0.0"}