import requests

url = "http://127.0.0.1:5000/"

payloads = [
    "",
    "SQL injection",
    "' OR 1=1 --",
    "<script>alert('xss')</script>",
    "A" * 5000
]

print("=" * 50)
print("Input Validation Test")
print("=" * 50)

for payload in payloads:
    try:
        response = requests.get(url)
        print(f"\nPayload tested: {payload[:50]}")
        print(f"Status code: {response.status_code}")
        print(f"Response length: {len(response.text)}")

    except Exception as e:
        print(f"Error: {e}")