import React, { useRef } from "react";
import {
  Menu,
  MenuItem,
  MenuList,
  Popper,
  Paper,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useRecentSearches } from "../hooks/useRecentSearches";
import { AccessTime, Close } from "@mui/icons-material";
import { useOnClickOutside } from "usehooks-ts";
// We add an onClose prop in addition to the PopperProps
const RecentSearches = ({ open, anchorEl, onClose }) => {
  const { recentSearches, setRecentSearches } = useRecentSearches();
  const paperRef = useRef(null);

  const el = anchorEl;
  // Remove item when x button is clicked for an item
  const removeItem = (searchTerm) => {
    setRecentSearches(recentSearches.filter((item) => item !== searchTerm));
  };
  // Listen to clickOutside events using this hook from usehooks-ts
  useOnClickOutside(paperRef, onClose);
  if (!anchorEl) return null;
  return (
    <Popper anchorEl={anchorEl} open={open} disablePortal>
      {/* Set the width the same as the anchorElement */}
      <Paper sx={{ width: el.clientWidth }} ref={paperRef}>
        <MenuList>
          {!recentSearches.length ? (
            <MenuItem disabled>You have no recent searches...</MenuItem>
          ) : (
            recentSearches.map((searchTerm, i) => (
              <MenuItem key={i}>
                <ListItemIcon>
                  <AccessTime />
                </ListItemIcon>
                <ListItemText>{searchTerm}</ListItemText>
                <IconButton onClick={() => removeItem(searchTerm)}>
                  <Close />
                </IconButton>
              </MenuItem>
            ))
          )}
        </MenuList>
      </Paper>
    </Popper>
  );
};
export default RecentSearches;