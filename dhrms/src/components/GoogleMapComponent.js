"use client";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { InfoWindow } from "@react-google-maps/api";
import { useState } from "react";
import MapCard from "./MapCard";

const GoogleMapComponent = ({ properties }) => {
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
      {results.map((property) => (
        <Marker
          key={property.id}
          position={{ lat: property.latitude, lng: property.longitude }}
          onClick={() => setSelectedPlace(property)}
        />
      ))}
      {selectedProperty && (
        <InfoWindow
          position={{
            lat: selectedProperty.latitude,
            lng: selectedProperty.longitude,
          }}
          onCloseClick={() => setSelectedPlace(null)}
        >
          <MapCard
            image={selectedProperty.imageUrl}
            data={{
              Address: selectedProperty.address,
              ...selectedPlace.additionalData,
            }}
          />
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default GoogleMapComponent;
