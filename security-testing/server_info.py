import requests

response = requests.get("http://127.0.0.1:5000/")

print("=" * 50)
print("Server Information Disclosure Test")
print("=" * 50)

server = response.headers.get("Server", "Not found")
print("Server Header:", server)