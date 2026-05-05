import requests

url = "http://127.0.0.1:5000/"

success = 0
fail = 0

print("=" * 50)
print("Availability Test")
print("=" * 50)

for i in range(20):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            success += 1
        else:
            fail += 1
    except:
        fail += 1

print(f"Successful requests: {success}")
print(f"Failed requests: {fail}")