import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

function InventoryTabNavigation() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction component={Link} to="/" value="/" label="Home" icon={<HomeIcon/>} />
          <BottomNavigationAction component={Link} to="/containers" value="/containers" label="Contianers" icon={<InventoryIcon />} />
          <BottomNavigationAction component={Link} to="/items" value="/items" label="Items" icon={<CategoryIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

export default InventoryTabNavigation;