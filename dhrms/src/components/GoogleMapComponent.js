"use client";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { useState } from "react";
import MapCard from "./MapCard";

const GoogleMapComponent = ({ properties }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  const containerStyle = {
    width: "100%",
    height: "50vh",  // Setting the height of the map
  };

  // Determine the initial center of the map based on the properties or default to Montreal
  const center = properties.length > 0 ? {
    lat: properties[0].location.lat,  // Use the latitude of the first property
    lng: properties[0].location.lng,  // Use the longitude of the first property
  } : {
    lat: 45.5017, // Latitude for Montreal
    lng: -73.5673, // Longitude for Montreal
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}  // Apply the container styles
      center={center}  // Set the center of the map
      zoom={10}  // Set the zoom level of the map
    >
      {properties.map((property) => (
        <Marker
          key={property.id}
          position={{ lat: property.location.lat, lng: property.location.lng }}
          onClick={() => setSelectedPlace(property)}  // Set selected property when marker is clicked
        />
      ))}
      {selectedPlace && (  // Display an InfoWindow when a place is selected
        <InfoWindow
          position={{
            lat: selectedPlace.location.lat,
            lng: selectedPlace.location.lng,
          }}
          onCloseClick={() => setSelectedPlace(null)}  // Clear the selected place on close
        >
          <MapCard  // Pass selected place data to the MapCard for display
            image={selectedPlace.imageUrl}
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
