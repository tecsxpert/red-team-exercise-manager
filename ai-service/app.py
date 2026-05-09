from flask import Flask, request, jsonify
from flask_cors import CORS
from services.groq_client import call_groq

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "AI Service Running"

@app.route("/test")
def test():
    return "Test endpoint working"

@app.route("/report", methods=["POST"])
def report():
    data = request.json
    if not data or "text" not in data:
        return jsonify({"error": "Missing input text"}), 400
    text = data.get("text", "")
    response = call_groq(f"""
Generate a detailed cybersecurity incident report for the following input:
{text}
Include:
- Title
- Summary of the issue
- Risk level (Low/Medium/High)
- Possible impact
- Recommended actions
Focus strictly on cybersecurity context.
""")
    return jsonify({
        "report": response,
        "status": "success",
        "topic": text
    })

if __name__ == "__main__":
    app.run(debug=True)