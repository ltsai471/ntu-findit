import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Marker, Popup, Tooltip, useMapEvents } from "react-leaflet"; // npm install react-leaflet
import { Button, Stack } from "@mui/material";
import styled from "styled-components"; // npm install --save styled-components
import L from "leaflet"; // npm install leaflet

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

const RawMarker = () => {
  const [rawMarker, setRawMarker] = useState(null);
  const rawMarkerRef = useRef(null);
  let navigate = useNavigate();
  const onClickRedirect = (path, lat, lng) => navigate(path, lat, lng);

  const map = useMapEvents({
    click: (e) => {
      map.flyTo(e.latlng, map.getZoom());
      const marker = { latlng: e.latlng };
      setRawMarker(marker); // rerender new markers
    },
    preclick: () => {
      L.DomUtil.addClass(map._container, "default-cursor-enabled");
    },
  });

  if (!rawMarker) {
    L.DomUtil.removeClass(map._container, "default-cursor-enabled");
    return null;
  }
  const { lat, lng } = rawMarker.latlng;

  const greenIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <Marker key={0} position={[lat, lng]} ref={rawMarkerRef} icon={greenIcon}>
      <StyledPopup>
        <div style={{ popupContent }}>
          <div style={popupText}>請問你...</div>
          <Stack spacing={2} direction="row">
            <Button
              variant="outlined"
              onClick={() => onClickRedirect("/lostReport", lat, lng)}
              style={{
                ml: "30%",
                mr: "30%",
                backgroundColor: "rgba(255, 255, 255, 1.0)",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              遺落物品？
            </Button>
            <Button
              variant="outlined"
              onClick={() => onClickRedirect("/lostPublish", lat, lng)}
              style={{
                ml: "30%",
                mr: "30%",
                backgroundColor: "rgba(255, 255, 255, 1.0)",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              撿到東西？
            </Button>
          </Stack>
        </div>
      </StyledPopup>
    </Marker>
  );
};

export default RawMarker;
