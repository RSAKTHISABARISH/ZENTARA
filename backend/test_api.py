import urllib.request
import json

data = json.dumps({"message": "Find me the latest UPS Service Guarantee updates from the web"}).encode('utf-8')
req = urllib.request.Request("http://127.0.0.1:8000/chat", data=data, headers={"Content-Type": "application/json"})
try:
    with urllib.request.urlopen(req) as response:
        print(response.read().decode('utf-8'))
except Exception as e:
    print(f"Error: {e}")
