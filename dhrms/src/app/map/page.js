"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import GoogleMapComponent from '@/components/GoogleMapComponent'; 
import { useLoadScript } from '@react-google-maps/api';
import ErrorComponent from '@/components/ErrorComponent';

const SearchPage = () => {
    const searchParams = useSearchParams()
    const [error, setError] = useState('');
    const [properties, setProperties] = useState([]);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        version: "weekly"
    });

    useEffect(() => {
        const propertiesData = JSON.parse(searchParams.get('properties') || '[]');
        setProperties(propertiesData);
        propertiesData.forEach(property => {
            fetchGeoLocation(property.propertyAddress);
        });
    }, [searchParams]);

     const fetchGeoLocation = async (address) => {
        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`);
            if (response.data.results.length > 0) {
                const location = response.data.results[0].geometry.location;
                setProperties(prevProps => prevProps.map(prop => 
                    prop.propertyAddress === address ? { ...prop, location } : prop
                ));
            }
        } catch (error) {
            console.error('Geocoding error:', error);
        }
    };

    if (loadError) return <ErrorComponent message="Error loading map" />;
    if (!isLoaded) return <div>Loading map...</div>;
    if (error) return <ErrorComponent message={error} />;

    return (
        <GoogleMapComponent
            properties={properties}
        />
    );
};

export default SearchPage;
