import { useEffect, useState } from "react";
import { getAllPantries } from "../utils/api_requests";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function DisplayMap() {
  const [pantryLocations, setPantryLocations] = useState([]);

  useEffect(() => {
    // Define wrapper function to handle async behavior
    async function setFromAPI() {
      const pantries = await getAllPantries();

      /* Only obtain position and name of pantry to display.
       * TODO: Change this later to more detailed information.
       */
      let locations = [];
      for (let p of pantries) {
        locations.push({
          position: [p["latitude"], p["longitude"]],
          name: p["name"],
        });
      }
      setPantryLocations(locations);
    }
    setFromAPI();
  }, []); // NOTE: No dependency only runs this effect on page load, for now.

  if (pantryLocations.length === 0) return <>Loading...</>;

  return (
    <div style={{ width: "30vw", height: "30vw" }}>
      <MapContainer
        center={pantryLocations[0].position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        whenReady={(map) => {
          const bounds = pantryLocations.map((loc) => loc.position);
          map.target.fitBounds(bounds, { padding: [10, 10] });
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pantryLocations.map((loc, index) => (
          <Marker key={index} position={loc.position}>
            <Popup>{loc.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default DisplayMap;
