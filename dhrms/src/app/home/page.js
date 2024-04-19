"use client";
import { Box, Typography } from "@mui/material";
import Searchbar from "@/components/SearchBar";
import { useRouter } from "next/navigation";
import { fetchSearchResults } from "@/services/searchService"; 

const Home = () => {
  const router = useRouter();

  // Handles submitting the search term to fetch results and navigate to the map page with these results
  const handleSearchSubmit = async (searchTerm) => {
    try {
      const results = await fetchSearchResults(searchTerm); // Fetch search results from the backend
      router.push({
        pathname: "/map",
        query: { properties: JSON.stringify(results) } // Pass results to the map page as a query parameter
      });
    } catch (error) {
      console.error("Failed to fetch search results:", error);
    }
  };

  // Handles selecting a specific search result to navigate to the map page with that particular result
  const handleSelectResult = (result) => {
    router.push({
      pathname: "/map",
      query: { properties: JSON.stringify([result]) } // Pass the selected result to the map page
    });
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

