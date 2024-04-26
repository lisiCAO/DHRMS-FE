import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import React, { useState } from "react";
import MapCard from "./MapCard";

const GoogleMapComponent = ({ properties }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const containerStyle = {
    width: "100%",
    height: "50vh",
  };

  const defaultCenter = { lat: 45.5017, lng: -73.5673 };

  // Filter properties with valid location and map them to flat structure for easier handling
  const validProperties = properties.filter(p => p.property && p.property.location && p.property.location.lat && p.property.location.lng);

  // Determine the initial center of the map based on the valid properties or default to Montreal
  const center = validProperties.length > 0 ? {
    lat: validProperties[0].property.location.lat,
    lng: validProperties[0].property.location.lng,
  } : defaultCenter;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
    >
      {validProperties.map((property) => (
        <Marker
          key={property.property.id}
          position={{ lat: property.property.location.lat, lng: property.property.location.lng }}
          onClick={() => setSelectedPlace(property)}
        />
      ))}
      {selectedPlace && (
        <InfoWindow
          position={{
            lat: selectedPlace.property.location.lat,
            lng: selectedPlace.property.location.lng,
          }}
          onCloseClick={() => setSelectedPlace(null)}
        >
          <MapCard
            image={selectedPlace.files && selectedPlace.files.length > 0 ? selectedPlace.files[0].publicUrl : ''}
            data={{
              Address: selectedPlace.property.address,
              ...selectedPlace.property.amenities
            }}
          />
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default GoogleMapComponent;
