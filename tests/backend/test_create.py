from copy import deepcopy

# Test "Pantries" table
PANTRY_VALID_MANDATORY_DATA = {
    "url": "https://www.google.com",
    "name": "Test Creation Pantry",
    "address": "123 Main Street",
    "city": "Arlington",
    "state": "VA",
    "zip": "20301",
    "latitude": 38.86860932010702,
    "longitude": -77.05817942501781,
    "has_variable_hours": False,
}


def test_pantries_null_data(client):
    response = client.post("/api/pantries", data=None)
    assert response.status_code == 400


def test_pantries_null_data_fields(client):
    response = client.post("/api/pantries", data={None})
    assert response.status_code == 400


def test_pantries_mandatory_fields_some_missing(client):
    data = deepcopy(PANTRY_VALID_MANDATORY_DATA)
    del data["address"]
    del data["zip"]
    del data["has_variable_hours"]
    response = client.post("/api/pantries", data=data)
    assert response.status_code == 400


def test_pantries_mandatory_fields_are_none(client):
    data = deepcopy(PANTRY_VALID_MANDATORY_DATA)
    for k in data:
        data[k] = None
    response = client.post("/api/pantries", data=data)
    assert response.status_code == 400


def test_pantries_mandatory_fields_all_valid(client):
    response = client.post("/api/pantries", PANTRY_VALID_MANDATORY_DATA)
    assert response.status_code == 201
    assert response.location == "/api/pantries/71"
    assert response.body["id"] == 71
    assert response.body["name"] == "Test Creation Pantry"


def test_pantries_malformed_url_type(client):
    data = deepcopy(PANTRY_VALID_MANDATORY_DATA)
    # URL does not have max string length (text type), so test bad type
    data["url"] = -1
    response = client.post("/api/pantries", data=data)
    assert response.status_code == 400


def test_pantries_malformed_name_max_len(client):
    data = deepcopy(PANTRY_VALID_MANDATORY_DATA)
    # Test max string length constraint
    data["name"] = "NULL" * (255 // 4 + 1)
    response = client.post("/api/pantries", data=data)
    assert response.status_code == 400


def test_pantries_malformed_name_type(client):
    data = deepcopy(PANTRY_VALID_MANDATORY_DATA)
    # Test max string length constraint
    data["name"] = -1
    response = client.post("/api/pantries", data=data)
    assert response.status_code == 400


def test_pantries_malformed_address_max_len(client):
    data = deepcopy(PANTRY_VALID_MANDATORY_DATA)
    data["address"] = "NULL" * (255 // 4 + 1)
    response = client.post("/api/pantries", data=data)
    assert response.status_code == 400


def test_pantries_malformed_address_type(client):
    data = deepcopy(PANTRY_VALID_MANDATORY_DATA)
    data["address"] = -1
    response = client.post("/api/pantries", data=data)
    assert response.status_code == 400


def test_pantries_malformed_city_max_len(client):
    data = deepcopy(PANTRY_VALID_MANDATORY_DATA)
    data["city"] = "NULL" * (100 // 4) + 1
    response = client.post("/api/pantries", data=data)
    assert response.status_code == 400


def test_pantries_malformed_city_type(client):
    data = deepcopy(PANTRY_VALID_MANDATORY_DATA)
    data["city"] = -1
    response = client.post("/api/pantries", data=data)
    assert response.status_code == 400


def test_pantries_malformed_state_max_len(client):
    data = deepcopy(PANTRY_VALID_MANDATORY_DATA)
    data["state"] = "ABC"
    response = client.post("/api/pantries", data=data)
    assert response.status_code == 400


def test_pantries_malformed_state_type(client):
    data = deepcopy(PANTRY_VALID_MANDATORY_DATA)
    data["state"] = -1
    response = client.post("/api/pantries", data=data)
    assert response.status_code == 400


def test_pantries_malformed_zip_max_len(client):
    data = deepcopy(PANTRY_VALID_MANDATORY_DATA)
    data["zip"] = "X" * 12
    response = client.post("/api/pantries", data=data)
    assert response.status_code == 400


def test_pantries_malformed_zip_type(client):
    data = deepcopy(PANTRY_VALID_MANDATORY_DATA)
    data["zip"] = -1
    response = client.post("/api/pantries", data=data)
    assert response.status_code == 400


def test_pantries_malformed_latitude_max_len(client):
    data = deepcopy(PANTRY_VALID_MANDATORY_DATA)
    data["latitude"] = 1 * 10**20
    response = client.post("/api/pantries", data=data)
    assert response.status_code == 400


def test_pantries_malformed_latitude_type(client):
    data = deepcopy(PANTRY_VALID_MANDATORY_DATA)
    data["latitude"] = "Hello world!"
    response = client.post("/api/pantries", data=data)
    assert response.status_code == 400


def test_pantries_malformed_longitude_max_len(client):
    data = deepcopy(PANTRY_VALID_MANDATORY_DATA)
    data["longitude"] = 1 * 10**20
    response = client.post("/api/pantries", data=data)
    assert response.status_code == 400


def test_pantries_malformed_longitude_type(client):
    data = deepcopy(PANTRY_VALID_MANDATORY_DATA)
    data["longitude"] = "Hello world!"
    response = client.post("/api/pantries", data=data)
    assert response.status_code == 400


def test_pantries_malformed_has_variable_hours_type(client):
    data = deepcopy(PANTRY_VALID_MANDATORY_DATA)
    data["has_variable_hours"] = "Hello world!"
    response = client.post("/api/pantries", data=data)
    assert response.status_code == 400


def test_pantries_optional_fields_some_missing(client):
    data = deepcopy(PANTRY_VALID_MANDATORY_DATA)
    data["comments"] = "Hello world!"
    response = client.post("/api/pantries", data=data)
    assert response.status_code == 201


def test_pantries_optional_fields_some_none(client):
    data = deepcopy(PANTRY_VALID_MANDATORY_DATA)
    data["comments"] = None
    data["supported_diet"] = None
    data["eligibility"] = "20301"
    response = client.post("/api/pantries", data=data)
    assert response.status_code == 201


def test_pantries_eligibility_violating_constraint(client):
    data = deepcopy(PANTRY_VALID_MANDATORY_DATA)
    data["comments"] = None
    data["supported_diet"] = None
    data["eligibility"] = "Hello world!"
    response = client.post("/api/pantries", data=data)
    assert response.status_code == 400


def test_pantries_coordinates_violating_constraint(client):
    data = deepcopy(PANTRY_VALID_MANDATORY_DATA)
    data["latitude"] = 47.605356379302464
    data["longitude"] = -122.33293685730997
    response = client.post("/api/pantries", data=data)
    assert response.status_code == 400


def test_pantries_optional_fields_all_valid(client):
    data = deepcopy(PANTRY_VALID_MANDATORY_DATA)
    data["comments"] = "Only open on every third Saturday of the month."
    data["supported_diet"] = "Halal"
    data["eligibility"] = "20301"
    response = client.post("/api/pantries", data=data)
    assert response.status_code == 201


def test_pantries_colliding_id(client):
    data = deepcopy(PANTRY_VALID_MANDATORY_DATA)
    data["id"] = 1
    response = client.post("/api/pantries", data=data)
    assert response.status_code == 201
    assert response.body["id"] == 71


def test_pantries_any_id(client):
    data = deepcopy(PANTRY_VALID_MANDATORY_DATA)
    data["id"] = 10000
    response = client.post("/api/pantries", data=data)
    assert response.status_code == 201
    assert response.body["id"] == 71


# Test "PantryHours" table
def test_hours_null_data(client):
    pass


def test_hours_mandatory_fields_some_missing(client):
    pass


def test_hours_mandatory_fields_are_none(client):
    pass


def test_hours_mandatory_fields_all_valid(client):
    pass


def test_hours_optional_fields_some_missing(client):
    pass


def test_hours_optional_fields_some_none(client):
    pass


def test_hours_optional_fields_violating_constraints(client):
    pass


def test_hours_optional_fields_all_valid(client):
    pass


def test_hours_colliding_entry(client):
    pass


def test_hours_valid_entry(client):
    pass
