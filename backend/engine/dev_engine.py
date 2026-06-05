import hashlib
import base64
import secrets
import string

class DevEngine:
    @staticmethod
    def process(action, text):
        if action == "hash":
            return {"result": hashlib.sha256(text.encode()).hexdigest()}
        if action == "b64_enc":
            return {"result": base64.b64encode(text.encode()).decode()}
        if action == "gen_pass":
            alphabet = string.ascii_letters + string.digits + string.punctuation
            return {"result": ''.join(secrets.choice(alphabet) for i in range(16))}
        return {"error": "Unknown action"}