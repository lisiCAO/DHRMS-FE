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
                image={selectedPlace.files.length > 0 ? selectedPlace.files[0].publicUrl : ''}
                data={{
                    Address: selectedPlace.property.address,
                    ...selectedPlace.property
                }}
            />
        </InfoWindow>
    )}
    </GoogleMap>
  );
};

export default GoogleMapComponent;
