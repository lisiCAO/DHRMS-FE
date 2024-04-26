"use client";
import { Box, Typography } from "@mui/material";
import Searchbar from "@/components/SearchBar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();

  const handleSearchSubmit = (results) => {
    localStorage.setItem('searchResults', JSON.stringify(results));
    router.push("/map");
};

// Map Page Component
useEffect(() => {
    const storedResults = localStorage.getItem('searchResults');
    if (storedResults) {
        const propertiesData = JSON.parse(storedResults);
        setProperties(propertiesData);
        // Optionally clear the item if it's no longer needed
        localStorage.removeItem('searchResults');
    }
}, []);

  // Handles selecting a specific search result to navigate to the map page with that particular result
  const handleSelectResult = (result) => {
    localStorage.setItem('searchResults', JSON.stringify([result]));
    router.push("/map");
  };

  // Render the Home component with a search bar and appropriate layout
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Box maxWidth={"md"}>
        <Typography textAlign="center" my={2}>
          MUI <code>{`<SearchBar/>`}</code> Tutorial
        </Typography>
        <Box width="100%" px={2}>
          <Searchbar onSubmit={handleSearchSubmit} onResultSelect={handleSelectResult} />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;

const mockProperties = [
    {
        property: {
            address: "1600 Amphitheatre Parkway, Mountain View, CA",
            latitude: null,  // 地理位置数据将被填充
            longitude: null
        }
    },
    {
        property: {
            address: "1 Infinite Loop, Cupertino, CA",
            latitude: null,
            longitude: null
        }
    }
];
