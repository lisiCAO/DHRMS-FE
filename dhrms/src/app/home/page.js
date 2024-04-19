"use client";
import { Box, Typography } from "@mui/material";
import Searchbar from "@/components/SearchBar";
import { useRouter } from "next/navigation"; 
import RecentSearches from "@/components/RecentSearches"; 
import { useRecentSearches } from "@/hooks/useRecentSearches";
import { useState } from "react";

const Home = () => {
  const router = useRouter();
  const { recentSearches, setRecentSearches } = useRecentSearches();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSearchSubmit = (searchTerm) => {
    router.push({
      pathname: "/search",
      query: { search: searchTerm },
    });

    if (!recentSearches.includes(searchTerm)) {
      setRecentSearches([searchTerm, ...recentSearches]);
    }
  };

  const handleSelectResult = (result) => {
    router.push({
      pathname: "/map",
      query: { location: JSON.stringify(result) }
    });
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Box maxWidth={"md"}>
        <Typography textAlign="center" my={2}>
          MUI <code>{`<SearchBar/>`}</code> Tutorial
        </Typography>
        <Box width="100%" px={2}> 
          <Searchbar onSubmit={handleSearchSubmit} inputProps={{
              onFocus: (event) => {
                setOpen(true);
                setAnchorEl(event.currentTarget);
              },
              onBlur: () => {
                setOpen(false);
              }
            }}
            onResultSelect={handleSelectResult} />
          <RecentSearches open={open} anchorEl={anchorEl} onClose={() => setOpen(false)} />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
