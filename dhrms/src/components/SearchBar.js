import { SearchOutlined } from "@mui/icons-material";
import {
  Paper, IconButton, InputBase, Popper, MenuList, MenuItem, ListItemIcon, ListItemText
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import PropertyIcon from "./PropertyIcon";
import Image from "next/image";
import { debounce } from "lodash";
import { fetchSearchResults } from "@/services/searchService";
import { getFilesByEntityWithoutAuth } from "@/services/fileService";

const Searchbar = ({ onSubmit, onResultSelect }) => {
  // State to manage search term, search results, and popper visibility
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [popperWidth, setPopperWidth] = useState();

  const popperStyles = {
    borderRadius: '4px',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)', // 可根据搜索栏的阴影进行调整
    width: popperWidth, 
    maxWidth: '800px', 
    mt: '2px', 
    zIndex: 1,
  };
  
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
        const data = await fetchSearchResults(searchTerm, false);
        const filesPromises = data.map((result) =>
          getFilesByEntityWithoutAuth(result.propertyId)
            .then((files) => ({ ...result, files }))
            .catch((error) => {
              console.error("Failed to fetch files for property:", result.propertyId, error);
              return { ...result, files: [] };
            })
        );
        const propertiesWithFiles = await Promise.all(filesPromises);
        setResults(propertiesWithFiles);
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

  useEffect(() => {
    if (anchorRef.current) {
      setPopperWidth(anchorRef.current.clientWidth);
    }
  
    const handleResize = () => {
      if (anchorRef.current) {
        setPopperWidth(anchorRef.current.clientWidth);
      }
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
        onSubmit(results); // Trigger onSubmit prop with the current search term
        setOpen(false); // Close the popper on submit
      }}
      ref={anchorRef} // Ref to anchor the popper for search results
    >
      <IconButton type="button" aria-label="search" sx={{ [`@media (max-width: 600px)`]: { padding: 0.5 } }}>
        <PropertyIcon />  
        {/* Icon to indicate the search functionality visually */}
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
        <SearchOutlined /> 
         {/* Icon button for submitting the search form */}
      </IconButton>
      <Popper open={open} anchorEl={anchorRef.current} style={popperStyles}>
        <Paper>
          <MenuList>
            {results.map((result, index) => (
              <MenuItem key={index} onClick={() => handleItemClick(result)}>
                <ListItemIcon>
                  {result.files.length > 0 ? (
                      <Image src={result.files[0].publicUrl} alt={result.property.address} width={50} height={50} />
                    ) : (
                      <div style={{ width: 50, height: 50 }} /> 
                    )}
                </ListItemIcon>
                <ListItemText primary={result.property.address} />
              </MenuItem>
            ))}
          </MenuList>
        </Paper>
      </Popper>
    </Paper>
  );
};

export default Searchbar;

