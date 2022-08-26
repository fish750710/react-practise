// import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, setAccountUser, getData } from '../../store/user';
// import { useInput } from '../hooks/useInput';
import { Box, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.isLogin);
  const isLoadding = useSelector((state) => state.isLoadding);
  const storeList = useSelector((state) => state.storeList);
  // const [email, setEmail] = useInput({
  //   placeholder: '請輸入eamil',
  //   type: 'email',
  //   id: 'email',
  //   name: 'email',
  // });
  // const [password, setPassword] = useInput({
  //   placeholder: '請輸入密碼',
  //   type: 'password',
  //   id: 'password',
  //   name: 'password',
  // });
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      mail: data.get('email'), // 抓input上的 name
      password: data.get('password'),
    };
    console.log(formData);
    if (formData.password.length < 6) {
      setMessage('請輸入正確密碼')
    } else {
      setMessage('');
      dispatch(setAccountUser(formData));
      // dispatch(formData);
      navigate('/'); // 跳轉
    }
  };

  const getApi = async() => {
    const url = 'https://api.justplus1.com.tw/api/mapcommon/list';
    const { data:resData } = await axios.get(url);
    if (resData.ResultStatus !== 200) return;
    console.log('resData', resData)
  }
  const getData2 = () => {
    dispatch(getData('1111'));
  }
  function back() {
    navigate(-1);
  }
  
  return (
    <>
      {/* <form onSubmit={loginHandler}>
        <div>
          <label htmlFor="email">Email</label>
          {setEmail}
          <input type="email" id="email" name="email" placeholder="請輸入eamil" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="請輸入密碼" />
          {setPassword}
        </div>
      </form> */}

      <ul className='bg-yellow-500'>
        {storeList.map((item, index)=> (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
      <div>storeList.length: {storeList.length}</div>

      {isLoadding? 'loading...': ''}
      <div>
        <button className='border-2' onClick={getApi}>getData</button>
      </div>
      <div>
        <button onClick={getData2}>redux getData </button>
      </div>
      <div>
        <button onClick={back}>上一頁</button>
      </div>
      
      
      
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <main>
          <h2>Login</h2>
          {isLogin ? 'true' : 'false'}
        </main>
        <div style={{ color: 'red' }}>{message}</div>
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <Button type='submit' variant='contained' fullWidth>
            登入
          </Button>
        </Box>
      </Box>
    </>
  );
}
export default Login;
