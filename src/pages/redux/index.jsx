import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

import { getData } from 'store/user';
import { cakeActions } from 'store/slices/cakeSlice';
import { coffeeActions } from 'store/slices/coffeeSlice';

import { pokemonApi } from 'store/api/pokemonApi';

const index = () => {
  // RTK Query
  const { data, error, isLoading } = pokemonApi.useGetPokemonByNameQuery('bulbasaur')
  // console.log('pokemon', data)

  const dispatch = useDispatch();

  const isLoadding = useSelector((state) => state.user.isLoadding);
  const storeList = useSelector((state) => state.user.storeList);
  const numOfCake = useSelector((state) => state.cake.numOfCake);
  const coffee = useSelector((state) => state.coffee);
  const money = useSelector((state) => state.assets.money);

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
  useEffect(() => {
    if (!storeList.length) {
      dispatch(getData('1111'));
    }
  },[storeList.length])

  const doOrderCoffee = () => {
    // console.log(coffeeRestockQtyRef.current.value, coffeeRestockMoneyRef.current.value)
    const coffeeQty = Number(coffeeRestockQtyRef.current.value);
    const coffeeMoney = Number(coffeeRestockMoneyRef.current.value);
    if (!coffeeQty && !coffeeMoney) return;
    dispatch(
      coffeeActions.coffeeOrdered({
        qty: coffeeQty,
        money: coffeeMoney,
      }),
    );
    // console.log('result:', numOfCake, money, coffee);
  };
  const doRestockCoffee = () => {
    const coffeeQty = Number(coffeeRestockQtyRef.current.value);
    const coffeeMoney = Number(coffeeRestockMoneyRef.current.value);
    if (!coffeeQty && !coffeeMoney) return;
    dispatch(
      coffeeActions.coffeeRestocked({
        qty: coffeeQty,
        money: coffeeMoney,
      }),
    );
  };

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
            {
              storeList?.map((item, index) => (
                <li key={index}>{JSON.stringify(item)}</li>
              ))}
          </ul>
        </Box>
        {/* <div>storeList: {storeList}</div> */}
        {isLoadding ? 'loading...' : ''}
      </Box>
      <Box mt={3}>
        <Typography variant='h5' gutterBottom>
          資金：{money}
        </Typography>
        <Typography variant='h5' gutterBottom>
          咖啡庫存：{coffee.numOfCoffee}
        </Typography>
        <div>
          <label htmlFor='coffeeOrderQty'>數量</label>
          <input id='coffeeOrderQty' type='number' ref={coffeeRestockQtyRef} />
        </div>
        <div>
          <label htmlFor='coffeeOrderMoney'>價錢</label>
          <input
            id='coffeeOrderMoney'
            type='number'
            ref={coffeeRestockMoneyRef}
          ></input>
        </div>
        <button onClick={doOrderCoffee}>賣出</button>
        <button onClick={doRestockCoffee}>進貨</button>
      </Box>
    </>
  );
};

export default index;
