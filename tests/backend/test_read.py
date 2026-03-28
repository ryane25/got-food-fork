def test_read(client):
    response = client.get("/api/pantries/1")
    assert response is not None