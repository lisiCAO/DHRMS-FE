import { SearchOutlined } from "@mui/icons-material";
import {
  Paper, IconButton, InputBase, Popper, MenuList, MenuItem, ListItemIcon, ListItemText
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import PropertyIcon from "./PropertyIcon";
import Image from "next/image";
import { debounce } from "lodash";
import { fetchSearchResults } from "@/services/searchService";

const Searchbar = ({ onSubmit, onResultSelect }) => {
  // State to manage search term, search results, and popper visibility
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  // Debounced search to reduce the number of API calls during user input
  useEffect(() => {
    const performSearch = async () => {
      // If search term is empty, clear results and close popper
      if (!searchTerm.trim()) {
        setResults([]);
        setOpen(false);
        return;
      }
  
      try {
        // Fetching search results based on the searchTerm
        const data = await fetchSearchResults(searchTerm);
        setResults(data);
        setOpen(data.length > 0);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
        setOpen(false);
      }
    };
  
    const debouncedSearch = debounce(performSearch, 300);
    debouncedSearch();
  
    // Cleanup function to cancel debounced calls on component unmount or before re-running effect
    return () => debouncedSearch.cancel();
  }, [searchTerm]);

  // Function to handle selection of a search result item
  const handleItemClick = (item) => {
    onResultSelect(item);
    setOpen(false);
    setSearchTerm("");
  };

  // Rendering the search bar interface
  return (
    <Paper
      component="form"
      elevation={3}
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        maxWidth: "800px",
        mx: "auto", 
        px: 1,
        py: 0.5,
        [`@media (max-width: 600px)`]: {
          flexDirection: "column", 
          py: 1,
        },
      }}
      onSubmit={(e) => {
        e.preventDefault();  // Prevent form submission default behavior
        onSubmit(searchTerm); // Trigger onSubmit prop with the current search term
        setOpen(false); // Close the popper on submit
      }}
      ref={anchorRef} // Ref to anchor the popper for search results
    >
      <IconButton type="button" aria-label="search" sx={{ [`@media (max-width: 600px)`]: { padding: 0.5 } }}>
        <PropertyIcon /> // Icon to indicate the search functionality visually
      </IconButton>
      <InputBase
        sx={{
          ml: 1,
          flex: 1, 
          minWidth: "0", 
          width: "60vw",
          [`@media (max-width: 600px)`]: {
            marginBottom: 1, 
          },
        }}
        placeholder="City, Zip Code, Address..." // Placeholder text for the input
        inputProps={{ "aria-label": "search" }} // Accessibility label for the search input
        value={searchTerm} // Controlled input value
        onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm state on input change
      />
      <IconButton type="submit" aria-label="search">
        <SearchOutlined /> // Icon button for submitting the search form
      </IconButton>
      <Popper open={open} anchorEl={anchorRef.current} style={{ zIndex: 1 }}>
        <Paper>
          <MenuList>
            {results.map((result, index) => (
              <MenuItem key={index} onClick={() => handleItemClick(result)}>
                <ListItemIcon>
                  <Image src={result.image} alt={result.address} width={50} height={50} />
                </ListItemIcon>
                <ListItemText primary={result.address} />
              </MenuItem>
            ))}
          </MenuList>
        </Paper>
      </Popper>
    </Paper>
  );
};

export default Searchbar;
