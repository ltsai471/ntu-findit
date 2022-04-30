import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMapEvents,
} from "react-leaflet"; // npm install react-leaflet
import { Button, Stack } from "@mui/material";
import styled from "styled-components"; // npm install --save styled-components
import L from "leaflet"; // npm install leaflet
import RawMarker from "./RawMarker";

const StyledPopup = styled(Popup)`
  background-color: rgba(255, 255, 255, 0.65);
  border-radius: 0;
  .leaflet-popup-tip-container {
    visibility: hidden;
  }
`;

const popupContent = { textAlign: "center", marginTop: "20px" };
const popupHead = { fontWeight: "bold", fontSize: "22px" };
const popupText = {
  fontSize: "20px",
  mb: "4%",
  fontWeight: "bold",
  ml: "2%",
  mr: "2%",
};

const defaultCoords = { latitude: 25.017147167360264, longitude: 121.54050190934258 }; // prettier-ignore

const pastMarkers = [
  {
    latitude: 25.018,
    longitude: 121.541,
    lostItemType: "手機",
    lostTime: new Date(),
  },
  {
    latitude: 25.019,
    longitude: 121.545,
    lostItemType: "錢包",
    lostTime: new Date(),
  },
];

const GoogleMap = ({
  itemPlace,
  itemTypeLevel1,
  itemTypeLevel2,
  endDatetime,
  startDatetime,
}) => {
  // useEffect(() => {
  //   const getItemData = async () => {
  //     const { data } = await axios.get(
  //       "https://ntulost.herokuapp.com/api/item/",
  //       {
  //         headers: { "Content-Type": "application/json" },
  //       }
  //     );
  //     console.log("This is item data: ", data);
  //   };
  //   getItemData();
  // }, []);

  const avgLatitude =
    pastMarkers.length === 0
      ? defaultCoords.latitude
      : pastMarkers
          .map(({ latitude }) => latitude)
          .reduce((a, b, _, { length }) => a + b / length, 0);

  const avgLongitude =
    pastMarkers.length === 0
      ? defaultCoords.longitude
      : pastMarkers
          .map(({ longitude }) => longitude)
          .reduce((a, b, _, { length }) => a + b / length, 0);

  const [centerLocation, setCenterLocation] = useState({
    latitude: avgLatitude,
    longitude: avgLongitude,
  });

  useEffect(() => {
    if (pastMarkers.length === 0) {
      navigator.geolocation && // Geolocation Library
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            setCenterLocation({
              latitude: coords.latitude,
              longitude: coords.longitude,
            });
          },
          () => {
            alert("無法取得你的地理位置，將預設為台大總圖書館");
            setCenterLocation(defaultCoords);
          }
        );
    }
  }, []);

  const renderedMarkers = pastMarkers.map(
    ({ latitude, longitude, lostItemType, lostTime }, i) => {
      return (
        <Marker key={i + 1} position={[latitude, longitude]}>
          <StyledPopup>
            <div style={popupContent}>
              <img
                src="https://cdn3.iconfinder.com/data/icons/basicolor-arrows-checks/24/149_check_ok-512.png"
                width="35"
                height="35"
                alt="Success Image"
              />
              <div style={popupHead}>Success!</div>
              <span style={popupText}>
                {`${lostItemType} ${lostTime.toLocaleString()}`}
              </span>
            </div>
          </StyledPopup>
        </Marker>
      );
    }
  );

  return (
    <MapContainer
      center={[centerLocation.latitude, centerLocation.longitude]}
      zoom={15}
      style={{ height: "80vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {renderedMarkers}
      <RawMarker />
    </MapContainer>
  );
};

export default GoogleMap;
