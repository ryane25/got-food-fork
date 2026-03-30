import validators as val
import requests

def test_all_links(client):
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
    response = client.get("/api/pantries")
    assert response.status_code == 200
    data = response.get_json()
    for pantry in data:
        pantry_url = pantry["url"]
        assert val.url(pantry_url)
        response = requests.get(pantry_url, headers=headers)
        if (response.status_code != 200) :
            print("invalid response from", pantry_url, "check manually")