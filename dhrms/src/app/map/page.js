"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import GoogleMapComponent from '@/components/GoogleMapComponent'; 
import { useLoadScript } from '@react-google-maps/api';
import ErrorComponent from '@/components/ErrorComponent';

const SearchPage = () => {
    const searchParams = useSearchParams()
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        version: "weekly"
    });

    useEffect(() => {
        const searchTerm = searchParams.get('search');
        if (!searchTerm) return;
    
        let isMounted = true;
    
        // Calling the geocoding API
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(searchTerm)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`)
            .then(response => {
                if (isMounted && response.data.results.length > 0) {
                    const location = response.data.results[0].geometry.location;
                    setResults([{ id: 'result', latitude: location.lat, longitude: location.lng }]);
                    setError('');
                } else if (isMounted) {
                    setError('No results found for this location.');
                }
            })
            .catch(error => {
                console.error('Geocoding error:', error);
                if (isMounted) {
                    setError('Failed to fetch location. Please try again.');
                }
            });
    
        return () => {
            isMounted = false;
        };
    }, [searchParams]);  

    if (loadError) return <ErrorComponent message="Error loading map" />;
    if (!isLoaded) return <div>Loading map...</div>;
    if (error) return <ErrorComponent message={error} />;

    return (
        <div className=''>
            <GoogleMapComponent results={results} />
        </div>
    );
};

export default SearchPage;
