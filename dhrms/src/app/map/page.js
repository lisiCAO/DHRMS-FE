"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GoogleMapComponent from '@/components/GoogleMapComponent'; 
import { useLoadScript } from '@react-google-maps/api';
import ErrorComponent from '@/components/ErrorComponent';

const SearchPage = () => {
    const [error, setError] = useState('');
    const [properties, setProperties] = useState([]);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        version: "weekly"
    });

    useEffect(() => {
        const storedResults = localStorage.getItem('searchResults');
        if (storedResults) {
            const propertiesData = JSON.parse(storedResults);
            setProperties(propertiesData);
            localStorage.removeItem('searchResults');
        }
    }, []);

    useEffect(() => {
        properties.forEach(property => {
            if (!property.property.location || !property.property.location.lat || !property.property.location.lng) {
                fetchGeoLocation(property.property.address, property.property.id);
            }
        });
    }, [properties]);

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

    if (loadError) return <ErrorComponent message="Error loading map" />;
    if (!isLoaded) return <div>Loading map...</div>;
    if (error) return <ErrorComponent message={error} />;

    return (
        <GoogleMapComponent properties={properties} />
    );
};

export default SearchPage;
