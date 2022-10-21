import React, { useMemo, useState, useEffect, useCallback } from 'react';
import TapPay from 'components/Payment/TapPay';
// import NewebPay from 'components/Payment/NewebPay';
import ECPay from 'components/Payment/ECPay';

import Box from '@mui/material/Box';
// import BottomNavigation from '@mui/material/BottomNavigation';
// import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const show = { opacity: 1 };
const hide = { opacity: 0 };

const index = () => {
  const [val, setVal] = useState(0);
  const [number, setNumber] = useState(1);
  const [dark, setDark] = useState(true);

  // 頻繁觸發效能差
  const Content = () => {
    return val === 1 ? <TapPay /> : <ECPay />;
  };

  const handleChange = (event, index) => {
    setVal(index);
  };

  // ********** useMemo start
  const slowFn = (num) => {
    console.log('Calling Slow Function');
    for(let i=0; i< 100000000; i++) {
    }
    return num*2;
  }
  // const computed = slowFn(1); //每次都會重新計算，效能差
  const computed = useMemo(() => { // 第一次存起來，number改變才重新計算
    return slowFn(number);
  }, [number]);

  const updateNumber = (e) => {
    setNumber(e.target.value);
  }


  const changeTheme = () => {
    setDark(prevDark => !prevDark)
  }
  //每次都會重新計算，效能差
  // const themeStyle = {
  //   backgroundColor: dark ? '#2c3e50': '#ecf0f1',
  //   color: dark ? '#ecf0f1' : '#2c3e50'
  // }
  const themeStyle = useMemo(() => {
    return {
      backgroundColor: dark ? '#2c3e50': '#ecf0f1',
      color: dark ? '#ecf0f1' : '#2c3e50'
    }
  }, [dark])
  useEffect(() => {
    console.log('Theme Change')
  }, [themeStyle])
  // ********** useMemo end

  // ********** useCallback start
  const getItems = useCallback(() => {
    return [number, number +1, number +2]
  }, [number])
  // ********** useCallback end

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

        {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={val} onChange={handleChange} aria-label="tabs">
            <Tab label="ECPay" />
            <Tab label="TapPay" />
          </Tabs>
        </Box> */}

        <p>useMemo 測試效能：</p>
        <input type="number" value={number} onChange={updateNumber} />
        <button onClick={changeTheme}>Change Theme</button>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={val} onChange={handleChange} aria-label='tabs'>
            <Tab label='ECPay' />
            <Tab label='TapPay' />
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
