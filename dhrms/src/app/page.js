"use client";
import { Box, Typography } from "@mui/material";
import Searchbar from "../components/SearchBar";
import { useRouter } from "next/navigation";
import RecentSearches from "../components/RecentSearches"; // Adjust the import path
import { useRecentSearches } from "../hooks/useRecentSearches"; // Adjust the import path
import { useState } from "react"; // Adjust the import to use useState

const Home = () => {
  const router = useRouter();
  const { recentSearches, setRecentSearches } = useRecentSearches();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // Use useState to manage the anchorEl

  console.log("open:", open);
  console.log("recentSearches:", recentSearches);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh" // Ensure the container takes up the full height of the viewport
    >
      <Box maxWidth={"md"}>
        <Typography textAlign="center" my={2}>
          MUI <code>{`<SearchBar/>`}</code> Tutorial
        </Typography>
        <Box width="100%">
          <Searchbar
            onSubmit={(searchTerm) => {
              router.push({
                pathname: "/search",
                query: {
                  search: searchTerm,
                },
              });
              // Add the search term to the recent searches list
              if (!recentSearches.includes(searchTerm)) {
                setRecentSearches([searchTerm, ...recentSearches]);
              }
            }}
            inputProps={{
              onFocus: (event) => {
                setOpen(true);
                setAnchorEl(event.currentTarget); // Set the anchorEl using useState
              },
              onBlur: () => setOpen(false),
            }}
          />
          {/* Pass the anchorEl as a prop */}
          <RecentSearches open={open} anchorEl={anchorEl} onClose={() => setOpen(false)} />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
