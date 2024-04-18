import { SearchOutlined } from "@mui/icons-material";
import {  Paper, Divider, IconButton, InputBase, Popper, MenuList, MenuItem, ListItemIcon, ListItemText, Box  } from "@mui/material";
import { useState, useEffect, useRef  } from "react";
import PropertyIcon from "./PropertyIcon";
import Image from 'next/image';

const Searchbar = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  useEffect(() => {
    if (searchTerm) {
      fetchSearchResults(searchTerm)
        .then(data => {
          setResults(data);
          setOpen(true);
        })
        .catch(error => {
          console.error('Search error:', error);
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
      component='form'
      elevation={3}
      sx={{ display: "flex", alignItems: "center", px: 1, py: 0.5 }}
      onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit(searchTerm ?? "");
        setOpen(false); 
      }}
      ref={anchorRef}
      >
      <IconButton type='button' aria-label='search'>
        <PropertyIcon />
      </IconButton>
      <Divider sx={{ height: 28, mx: 0.5 }} orientation='vertical' />
      <InputBase
        sx={{ ml: 1, flex: 1, minWidth: 600 }}
        placeholder='City, Zip Code, Address...'
        inputProps={{ "aria-label": "search" }}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        {...props.inputProps}
      />
      <Divider sx={{ height: 28, mx: 0.5 }} orientation='vertical' />
      <IconButton type='submit'>
        <SearchOutlined />
      </IconButton>
      <Popper open={open} anchorEl={anchorRef.current} style={{ zIndex: 1 }}>
        <Paper>
          <MenuList>
            {results.map((result, index) => (
              <MenuItem key={index} onClick={() => {
                onResultSelect(result);
                setOpen(false);
                setSearchTerm("");
              }}>
                <ListItemIcon>
                  <Box sx={{ width: 50, height: 50 }}>
                    <Image src={result.image} alt={result.address} width={50} height={50} />
                  </Box>
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
