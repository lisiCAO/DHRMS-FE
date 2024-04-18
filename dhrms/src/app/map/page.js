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
        axios.get(`/api/search?query=${encodeURIComponent(searchTerm)}`)
            .then(response => {
                setResults(response.data);
                setError('');
            })
            .catch(error => {
                console.error('Search error:', error);
                setError('Failed to fetch results. Please try again.');
            });
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
