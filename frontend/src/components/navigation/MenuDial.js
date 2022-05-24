import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import ItemForm from '../forms/ItemForm';
import ContainerForm from '../forms/ContainerForm';

const actions = [
  { icon: <InventoryIcon />, name: 'New Container' },
  { icon: <CategoryIcon />, name: 'New Item' },
];

function MenuDial() {
  const [openIF, setOpenIF] = React.useState(false);
  const [openCF, setOpenCF] = React.useState(false);

  const handleClickOpenIF = () => {
    setOpenIF(true);
  };

  const handleCloseIF = () => {
    setOpenIF(false);
  };

  const handleClickOpenCF = () => {
    setOpenCF(true);
  };

  const handleCloseCF = () => {
    setOpenCF(false);
  };

  function getForm(name) {
    if (name === 'New Container') {
      return handleClickOpenCF;
    } else if (name === 'New Item') {
      return handleClickOpenIF
    }
  }

  return (
    <Box sx={{ position: 'relative', mt: 3, height: 100 }}>
      <SpeedDial
        ariaLabel='Menu Button'
        style={{
          margin: 0,
          top: 'auto',
          right: 25,
          bottom: 80,
          left: 'auto',
          position: 'fixed',
        }}
        FabProps={{size: "large"}}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={getForm(action.name)}
          />
        ))}
      </SpeedDial>
      
      <ItemForm open={openIF} close={handleCloseIF}/>
      <ContainerForm open={openCF} close={handleCloseCF}/>
    </Box>
  );
}

export default MenuDial;
