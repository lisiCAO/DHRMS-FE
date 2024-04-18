import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import GoogleMapComponent from '@/components/GoogleMapComponent'; 
import Loading from '@/components/Loading';  

const SearchPage = () => {
    const router = useRouter();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const searchTerm = router.query.search;
        if (searchTerm) {
            setLoading(true);
            setProgress(10); 
 
            const interval = setInterval(() => {
                setProgress(prevProgress => prevProgress < 100 ? prevProgress + 20 : 100);
            }, 1000);

            axios.get(`/api/search?query=${encodeURIComponent(searchTerm)}`)
                .then(response => {
                    setResults(response.data);
                    setProgress(100);  
                })
                .catch(error => {
                    console.error('Search error:', error);
                    setProgress(100);  
                })
                .finally(() => {
                    setLoading(false);
                    clearInterval(interval); 
                });
        }
    }, [router.query.search]);

    return (
        <div>
            {loading ? <Loading value={progress} /> : <GoogleMapComponent results={results} />}
        </div>
    );
};

export default SearchPage;
