import { SearchOutlined } from "@mui/icons-material";
import {
  Paper,
  Divider,
  IconButton,
  InputBase,
  Popper,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import PropertyIcon from "./PropertyIcon";
import Image from "next/image";

const Searchbar = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  useEffect(() => {
    if (searchTerm) {
      fetchSearchResults(searchTerm)
        .then((data) => {
          setResults(data);
          setOpen(true);
        })
        .catch((error) => {
          console.error("Search error:", error);
          setResults([]);
          setOpen(false);
        });
    } else {
      setResults([]);
      setOpen(false);
    }
  }, [searchTerm]);

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
        e.preventDefault();
        props.onSubmit(searchTerm ?? "");
        setOpen(false);
      }}
      ref={anchorRef}
    >
      <IconButton
        type="button"
        aria-label="search"
        sx={{
          [`@media (max-width: 600px)`]: {
            padding: 0.5, 
          },
        }}
      >
        <PropertyIcon sx={{ fontSize: { xs: 20, sm: 24, md: 28 } }} />
      </IconButton>

      <Divider sx={{ height: 28, mx: 0.5 }} orientation="vertical" />
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
        placeholder="City, Zip Code, Address..."
        inputProps={{ "aria-label": "search" }}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        {...props.inputProps}
      />

      <Divider
        sx={{ height: 28, mx: 0.5, display: { xs: "none", sm: "block" } }}
        orientation="vertical"
      />
      <IconButton
        type="submit"
        sx={{ [`@media (max-width: 600px)`]: { margin: "8px 0" } }}
      >
        <SearchOutlined />
      </IconButton>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        style={{ zIndex: 1, width: "auto" }}
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 8], 
            },
          },
        ]}
      >
        <Paper>
          <MenuList>
            {results.map((result, index) => (
              <MenuItem
                key={index}
                onClick={() => {
                  onResultSelect(result);
                  setOpen(false);
                  setSearchTerm("");
                }}
              >
                <ListItemIcon>
                  <Image
                    src={result.image}
                    alt={result.address}
                    width={50}
                    height={50}
                  />
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
