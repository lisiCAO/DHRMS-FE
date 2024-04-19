"use client";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { InfoWindow } from "@react-google-maps/api";
import { useState } from "react";
import MapCard from "./MapCard";

const GoogleMapComponent = ({ results }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  const containerStyle = {
    width: "100%",
    height: "50vh",
  };

  const center =
    results.length > 0
      ? {
          lat: results[0].latitude,
          lng: results[0].longitude,
        }
      : {
          lat: 45.5017, // Latitude for Montreal
          lng: -73.5673, // Longitude for Montreal
        };

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
      {results.map((result) => (
        <Marker
          key={result.id}
          position={{ lat: result.latitude, lng: result.longitude }}
          onClick={() => setSelectedPlace(result)}
        />
      ))}
      {selectedPlace && (
        <InfoWindow
          position={{
            lat: selectedPlace.latitude,
            lng: selectedPlace.longitude,
          }}
          onCloseClick={() => setSelectedPlace(null)}
        >
          <MapCard
            image={selectedPlace.image}
            data={{
              Address: selectedPlace.address,
              ...selectedPlace.additionalData,
            }}
          />
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default GoogleMapComponent;
