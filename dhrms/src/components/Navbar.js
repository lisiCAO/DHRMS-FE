import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { Menu as MenuIcon, Brightness4 as Brightness4Icon, Language as LanguageIcon } from "@mui/icons-material";
import { useTheme } from '@/contexts/ThemeContext';
import Menu from './Menu';

const NavBar = () => {
  const { theme, toggleTheme } = useTheme();
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <AppBar position="fixed" color='default' elevation={0} className='shadow-none'>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton color='inherit' aria-label='menu' onClick={handleChange}>
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' style={{ textAlign: "center", flexGrow: 1 }}>
          DHRMS
        </Typography>
        <div>
          <IconButton color='inherit' onClick={toggleTheme}>
            <Brightness4Icon />
          </IconButton>
          <IconButton color='inherit'>
            <LanguageIcon />
          </IconButton>
        </div>
      </Toolbar>
      {/* Use the GrowEffect component */}
      <Menu checked={checked} />
    </AppBar>
  );
};

export default NavBar;
