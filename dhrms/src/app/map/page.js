"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GoogleMapComponent from '@/components/GoogleMapComponent'; 
import { useLoadScript } from '@react-google-maps/api';
import ErrorComponent from '@/components/ErrorComponent';

const SearchPage = () => {

    const [error, setError] = useState('');
    const [properties, setProperties] = useState([]);

    // Loads the Google Maps script
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,  // API key for Google Maps
        version: "weekly"  // Specifies which version of the API to load
    });

    useEffect(() => {
        const storedResults = localStorage.getItem('searchResults');
        if (storedResults) {
            const propertiesData = JSON.parse(storedResults);

            setProperties(propertiesData);
            // Optionally clear the item if it's no longer needed
            localStorage.removeItem('searchResults');
        }
    }, []);

    useEffect(() => {
        properties.forEach(property => {
            if (!property.property.location || property.property.location.lat === null || property.property.location.lng === null) {
                fetchGeoLocation(property.property.address);
            }
        });
    }, [properties]);


    // Function to fetch geolocation data from Google Maps API
    const fetchGeoLocation = async (address, id) => {
        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`);
            if (response.data.results.length > 0) {
                const location = response.data.results[0].geometry.location;
                setProperties(prevProps => prevProps.map(prop => 
                    prop.property.id === id ? { ...prop, property: { ...prop.property, location } } : prop
                ));
            }
        } catch (error) {
            console.error('Geocoding error:', error);
            setError('Failed to fetch location data');
        }
    };
    

    // Handling loading and error states
    if (loadError) return <ErrorComponent message="Error loading map" />;
    if (!isLoaded) return <div>Loading map...</div>;
    if (error) return <ErrorComponent message={error} />;

    // Render the GoogleMapComponent with the properties that include geolocation data
    return (
        <GoogleMapComponent
            properties={properties}
        />
    );
};

export default SearchPage;
