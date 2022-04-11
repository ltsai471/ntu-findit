import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; // npm install react-leaflet

class GoogleMap extends React.Component {
  render() {
    return (
      <MapContainer
        center={[25.016224652153706, 121.53065911378008]}
        zoom={13}
        style={{ height: "80vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[25.016224652153706, 121.53065911378008]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    );
  }
}

export default GoogleMap;
