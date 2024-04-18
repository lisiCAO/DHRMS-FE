"use client";
import React,{ createContext } from 'react';
import GoogleMapComponent from '@/components/GoogleMapComponent'; 
import { useLoadScript } from '@react-google-maps/api';

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; 

const MapPage = () => {
    const results = [
        { id: 1, latitude: 37.7749, longitude: -122.4194 }, // San Francisco
        { id: 2, latitude: 34.0522, longitude: -118.2437 }, // Los Angeles
        { id: 3, latitude: 40.7128, longitude: -74.0060 }   // New York
    ];

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        version: "weekly"
    });

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading Maps...</div>;
    }

    return (
        <div>
            <h1>Map Showing Locations</h1>
            <GoogleMapComponent results={results} />
        </div>
    );
};

export default MapPage;
