// import axios from "axios";
import React, { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet"; // npm install react-leaflet
import { Button } from "@mui/material";
import styled from "styled-components"; // npm install --save styled-components
import L from "leaflet"; // npm install leaflet
import RawMarker from "./RawMarker";
import i18n from "i18next";

// const changeLanguage= (val) => {
//   i18n.changeLanguage(val);
// };
// changeLanguage('en')

const StyledPopup = styled(Popup)`
  background-color: rgba(255, 255, 255, 0.65);
  border-radius: 0;
  .leaflet-popup-tip-container {
    visibility: hidden;
  }
`;

const defaultCoords = { latitude: 25.017147167360264, longitude: 121.54050190934258 }; // prettier-ignore

const GoogleMap = ({ pastMarkers }) => {
  let navigate = useNavigate();
  const onContactButtonClickRedirect = (path) => navigate(path);

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
    ({ id, latitude, longitude, itemType, lossDatetime, itemDesc, img }) => {
      return (
        <Marker key={id} position={[latitude, longitude]}>
          <StyledPopup>
            <div style={{ textAlign: "center", mt: "20px" }}>
              <img
                // src="https://cdn3.iconfinder.com/data/icons/basicolor-arrows-checks/24/149_check_ok-512.png"
                src={img === null ? "" : img.slice(6)}
                width="80%"
                height="80%"
                alt={`${itemType}圖片`}
              />
              <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                {itemType}
              </div>
              <span
                style={{
                  fontSize: "14px",
                  mb: "4%",
                  fontWeight: "bold",
                  ml: "2%",
                  mr: "2%",
                }}
              >
                {`${lossDatetime.toLocaleString()}`}
              </span>
              <br />
              <span
                style={{
                  color: "gray",
                  fontSize: "14px",
                  mb: "4%",
                  ml: "2%",
                  mr: "2%",
                }}
              >
                {itemDesc}
              </span>
            </div>
            <br />
            <div style={{ textAlign: "center" }}>
              <Button
                variant="outlined"
                onClick={() => onContactButtonClickRedirect("/chatroom")}
                style={{
                  ml: "10%",
                  mr: "10%",
                  backgroundColor: "rgba(255, 255, 255, 1.0)",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {i18n.t("googlemap.contact")}
              </Button>
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
