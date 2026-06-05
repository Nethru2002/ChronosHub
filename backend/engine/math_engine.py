import sympy
import numpy as np

class MathEngine:
    @staticmethod
    def calculate(expression):
        try:
            expr = sympy.sympify(expression)
            numeric_res = float(expr.evalf())
            
            # Generate Graph Data if the expression has 'x'
            graph_data = []
            if 'x' in expression:
                f = sympy.lambdify(sympy.Symbol('x'), expr, "numpy")
                x_vals = np.linspace(-10, 10, 50)
                y_vals = f(x_vals)
                graph_data = [{"x": float(x), "y": float(y)} for x, y in zip(x_vals, y_vals)]

            return {
                "symbolic": str(expr),
                "numeric": numeric_res,
                "graph": graph_data
            }
        except Exception as e:
            return {"error": str(e)}