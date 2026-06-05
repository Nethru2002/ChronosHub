class UnitEngine:
    # Everything is relative to a "Base Unit" for that category
    CONVERSIONS = {
        "length": {
            "base": "m",
            "units": {
                "mm": 0.001, "cm": 0.01, "m": 1, "km": 1000, 
                "in": 0.0254, "ft": 0.3048, "yd": 0.9144, "mi": 1609.34,
                "nautical_mi": 1852, "lightyear": 9.461e+15
            }
        },
        "mass": {
            "base": "kg",
            "units": {
                "mg": 1e-6, "g": 0.001, "kg": 1, "t": 1000,
                "oz": 0.0283495, "lb": 0.453592, "st": 6.35029
            }
        },
        "area": {
            "base": "m2",
            "units": {
                "mm2": 1e-6, "cm2": 0.0001, "m2": 1, "km2": 1e+6,
                "in2": 0.00064516, "ft2": 0.092903, "ac": 4046.86, "ha": 10000
            }
        },
        "volume": {
            "base": "l",
            "units": {
                "ml": 0.001, "l": 1, "m3": 1000, "tsp": 0.00492892,
                "tbsp": 0.0147868, "cup": 0.24, "pt": 0.473176, "qt": 0.946353, "gal": 3.78541
            }
        },
        "speed": {
            "base": "m/s",
            "units": {
                "m/s": 1, "km/h": 0.277778, "mph": 0.44704, "knot": 0.514444, "mach": 343
            }
        },
        "data": {
            "base": "b",
            "units": {
                "b": 1, "B": 8, "kb": 1000, "KB": 8000, "mb": 1e+6, "MB": 8e+6,
                "gb": 1e+9, "GB": 8e+9, "tb": 1e+12, "TB": 8e+12
            }
        },
        "pressure": {
            "base": "pa",
            "units": {
                "pa": 1, "hpa": 100, "bar": 100000, "psi": 6894.76, "atm": 101325
            }
        },
        "energy": {
            "base": "j",
            "units": {
                "j": 1, "kj": 1000, "cal": 4.184, "kcal": 4184, "wh": 3600, "kwh": 3.6e+6, "ev": 1.602e-19
            }
        }
    }

    @staticmethod
    def convert(category, value, from_unit, to_unit):
        try:
            # Handle Temperature separately (it uses formulas, not just multipliers)
            if category == "temperature":
                return UnitEngine.handle_temp(value, from_unit, to_unit)

            cat_data = UnitEngine.CONVERSIONS.get(category)
            if not cat_data: return {"error": "Invalid Category"}

            # Convert to Base Unit
            base_val = value * cat_data["units"][from_unit]
            # Convert from Base to Target
            result = base_val / cat_data["units"][to_unit]
            
            return {"result": round(result, 8)}
        except Exception:
            return {"error": "Calculation Error"}

    @staticmethod
    def handle_temp(v, f, t):
        # Convert to Celsius first
        if f == "f": c = (v - 32) * 5/9
        elif f == "k": c = v - 273.15
        else: c = v
        
        # Convert Celsius to Target
        if t == "f": res = (c * 9/5) + 32
        elif t == "k": res = c + 273.15
        else: res = c
        return {"result": round(res, 2)}