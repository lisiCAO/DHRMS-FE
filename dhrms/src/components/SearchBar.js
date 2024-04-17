import { SearchOutlined } from "@mui/icons-material";
import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import { useState } from "react";
import PropertyIcon from "./PropertyIcon";

const Searchbar = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Paper
      component='form'
      elevation={3}
      sx={{ display: "flex", alignItems: "center", px: 1, py: 0.5 }}
      onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit(searchTerm ?? "");
      }}>
           {/* Add the IconButton component here */}
      <IconButton type='button' aria-label='search'>
        <PropertyIcon />
      </IconButton>
      {/* Add a divider between the IconButton and the InputBase */}
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
    </Paper>
  );
};
export default Searchbar;
