import React, { useState } from 'react';
import TapPay from 'components/Payment/TapPay';
// import NewebPay from 'components/Payment/NewebPay';
import ECPay from 'components/Payment/ECPay';

import Box from '@mui/material/Box';
// import BottomNavigation from '@mui/material/BottomNavigation';
// import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const index = () => {
  const [val, setVal] = useState(0);

  const Content = () => {
    return val === 1 ? <TapPay /> : <ECPay />;
  };
  const handleChange = (event, index) => {
    setVal(index);
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        {/* <BottomNavigation
          showLabels
          value={val}
          onChange={(event, index) => {
            // console.log(event, index)
            setVal(index);
          }}
        >
          <BottomNavigationAction label='ECPay' />
          <BottomNavigationAction label='TapPay' />
        </BottomNavigation> */}


        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={val} onChange={handleChange} aria-label="tabs">
            <Tab label="ECPay" />
            <Tab label="TapPay" />
          </Tabs>
        </Box>
        <Box sx={{ p: 3 }}>
          <Content />
        </Box>
      </Box>
    </>
  );
};

export default index;
