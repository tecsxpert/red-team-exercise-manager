import requests

url = "http://127.0.0.1:5000/"

required_headers = [
    "Content-Security-Policy",
    "X-Frame-Options",
    "X-Content-Type-Options"
]

response = requests.get(url)

print("=" * 50)
print("Security Header Check")
print("=" * 50)

for header in required_headers:
    if header in response.headers:
        print(f"{header}: PRESENT")
    else:
        print(f"{header}: MISSING")