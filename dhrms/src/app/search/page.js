"use client";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import GoogleMapComponent from '@/components/GoogleMapComponent'; 

const SearchPage = () => {
    const router = useRouter();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const searchTerm = router.query.search;
        if (searchTerm) {
            setLoading(true);
            axios.get(`/api/search?query=${encodeURIComponent(searchTerm)}`)
                .then(response => {
                    setResults(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Search error:', error);
                    setLoading(false);
                });
        }
    }, [router.query.search]);

    return (
        <div>
            {loading ? <p>Loading...</p> : <GoogleMapComponent results={results} />}
        </div>
    );
};

export default SearchPage;