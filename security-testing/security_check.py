import requests

BASE_URL = "http://127.0.0.1:5000"

endpoints = [
    "/",
    "/health",
    "/ai/search"
]

print("=" * 50)
print("Security and Availability Check")
print("=" * 50)

for endpoint in endpoints:
    url = BASE_URL + endpoint
    try:
        if endpoint == "/ai/search":
            response = requests.post(
                url,
                json={"text": "SQL injection"}
            )
        else:
            response = requests.get(url)

        print(f"\nEndpoint: {endpoint}")
        print(f"Status Code: {response.status_code}")

        print("Headers:")
        for key, value in response.headers.items():
            print(f"  {key}: {value}")

    except Exception as e:
        print(f"\nEndpoint: {endpoint}")
        print(f"Error: {e}")

print("\nCheck completed.")