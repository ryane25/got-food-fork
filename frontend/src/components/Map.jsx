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

const example_banks = [
  { position: [38.9072, -77.0369], name: "Washington DC" },
  { position: [39.084, -77.6413], name: "Loudoun County" },
  { position: [38.8816, -77.091], name: "Arlington" },
];

function DisplayMap() {
  return (
    <div style={{ width: "30vw", height: "30vw" }}>
      <MapContainer
        center={example_banks[0].position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        whenReady={(map) => {
          const bounds = example_banks.map((loc) => loc.position);
          map.target.fitBounds(bounds, { padding: [10, 10] });
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {example_banks.map((loc, index) => (
          <Marker key={index} position={loc.position}>
            <Popup>{loc.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default DisplayMap;
