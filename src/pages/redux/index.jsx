import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

import { getData } from 'store/user';
import { cakeActions } from 'store/slices/cakeSlice';
import { coffeeActions } from 'store/slices/coffeeSlice';

const index = () => {
  const dispatch = useDispatch();

  const isLoadding = useSelector((state) => state.user.isLoadding);
  const storeList = useSelector((state) => state.user.storeList);
  const numOfCake = useSelector(state => state.cake.numOfCake);
  const coffee = useSelector(state => state.coffee);
  const money = useSelector(state => state.assets.money);

  const coffeeRestockQtyRef = useRef(null);
  const coffeeRestockMoneyRef = useRef(null);

  const getApi = async () => {
    const url = 'https://api.justplus1.com.tw/api/mapcommon/list';
    const { data: resData } = await axios.get(url);
    if (resData.ResultStatus !== 200) return;
    console.log('resData', resData);
  };
  const getData2 = () => {
    dispatch(getData('1111'));
  };
  
  const doOrderCoffee = () => {
    console.log(coffeeRestockQtyRef.current.value, coffeeRestockMoneyRef.current.value)
    // dispatch(cakeActions.cakeOrdered({qty: 2, money: 20}))
    // dispatch(coffeeActions.coffeeOrdered({qty: 1, money: 30}))
    // console.log(numOfCake, money, coffee);

  }
  const inputRef = useRef(null);

  function handleClick() {
    console.log(inputRef, inputRef.current.value);
  }

  return (
    <>
      <Box>
        <Typography variant='h5' gutterBottom>
          API TEST:
        </Typography>
        <div>
          <button className='border-2' onClick={getApi}>
            getData
          </button>
        </div>
        <div>
          <button onClick={getData2}>redux getData </button>
        </div>
        <Box sx={{ margin: '10px' }}>
          <ul className='bg-yellow-500'>
            {storeList &&
              storeList.map((item, index) => (
                <li key={index}>{JSON.stringify(item)}</li>
              ))}
          </ul>
        </Box>
        {/* <div>storeList: {storeList}</div> */}
        {isLoadding ? 'loading...' : ''}
      </Box>
      <Box mt={3}>
        <Typography variant='h5' gutterBottom>
          咖啡庫存：{coffee.numOfCoffee}
        </Typography>
        <div>
          <label htmlFor="coffeeOrderQty">數量</label>
          <input id="coffeeOrderQty" type="number" ref={coffeeRestockQtyRef} />
        </div>
        <div>
          <label htmlFor="coffeeOrderMoney">價錢</label>
          <input id="coffeeOrderMoney" type="number" ref={coffeeRestockMoneyRef}></input>
        </div>
        <button onClick={doOrderCoffee}>購買</button>
      </Box>
    </>
  );
};

export default index;
