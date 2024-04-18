"use client";
import { GoogleMap, Marker } from '@react-google-maps/api';

const GoogleMapComponent = ({ results }) => {
    const containerStyle = {
        width: '400px',
        height: '400px'
    };

    const center = {
        lat: -34.397,
        lng: 150.644
    };

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
        >
            {results.map(result => (
                <Marker key={result.id} position={{ lat: result.latitude, lng: result.longitude }} />
            ))}
        </GoogleMap>
    );
};

export default GoogleMapComponent;
