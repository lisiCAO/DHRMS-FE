"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import GoogleMapComponent from '@/components/GoogleMapComponent'; 
import { useLoadScript } from '@react-google-maps/api';
import ErrorComponent from '@/components/ErrorComponent';

const SearchPage = () => {
    const [searchParams] = useSearchParams();  // Hook to get the search parameters
    const [error, setError] = useState('');
    const [properties, setProperties] = useState([]);

    // Loads the Google Maps script
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,  // API key for Google Maps
        version: "weekly"  // Specifies which version of the API to load
    });

    useEffect(() => {
        // Parse the property data from the URL search parameters
        const propertiesData = JSON.parse(searchParams.get('properties') || '[]');
        setProperties(propertiesData);
        // Fetch geolocation data for each property based on its address
        propertiesData.forEach(property => {
            fetchGeoLocation(property.propertyAddress);
        });
    }, [searchParams]);

    // Function to fetch geolocation data from Google Maps API
    const fetchGeoLocation = async (address) => {
        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`);
            if (response.data.results.length > 0) {
                const location = response.data.results[0].geometry.location;
                // Update properties with the fetched location data
                setProperties(prevProps => prevProps.map(prop => 
                    prop.propertyAddress === address ? { ...prop, location } : prop
                ));
            }
        } catch (error) {
            console.error('Geocoding error:', error);
            setError('Failed to fetch location data');  // Set error state if geocoding fails
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
