class FinanceEngine:
    @staticmethod
    def calculate_loan(p, r, t):
        # Monthly interest rate
        rate = r / (12 * 100)
        # Monthly EMI formula
        emi = (p * rate * pow(1 + rate, t)) / (pow(1 + rate, t) - 1)
        total_payable = emi * t
        return {
            "emi": round(emi, 2),
            "interest": round(total_payable - p, 2),
            "total": round(total_payable, 2)
        }