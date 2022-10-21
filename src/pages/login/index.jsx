// import { Outlet, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, setAccountUser } from '../../store/user';
import { Box, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { parse } from 'postcss';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);
  
  // 2023/3 即將棄用
  // function initGapi() {
  //   console.log('init')
  //   window.gapi.load('auth2', () => {
  //     window.gapi.auth2.init({
  //       client_id: '411525327701-bi083i37cuha648m7mg77pb9am5fohh1.apps.googleusercontent.com',
  //       cookiepolicy: 'single_host_origin',
  //     })
  //   })
  // }
  // initGapi();
  // function initBtn() {
  //   window.gapi.signin2.render('google-sign-in-button', {
  //     scope: 'profile email',
  //     width: 240,
  //     height: 50,
  //     longtitle: true,
  //     theme: 'dark',
  //     onsuccess: signIn,
  //     onfailure: () => {}
  //   });
  // }
  // function signIn(googleUser) {
  //   const idToken = googleUser.getAuthResponse().id_token;
  // }

  // const renderGoogleBtn = () => {
  //   try {
  //     console.log('render')
  //     window.google?.accounts.id.renderButton(document.getElementById('google-sign-in-button'), {
  //       width: '1000',
  //       type: 'standard',
  //       // theme: 'filled_blue',
  //       size: 'large',
  //       text: 'continue_with',
  //       shape: 'rectangular',
  //       logo_alignment: 'left',
  //       locale: 'zh_TW',
  //     })
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
  // const initGapi = () => {
  //   window.onload = () => {
  //     google.accounts.id.initialize({
  //       client_id: '411525327701-bi083i37cuha648m7mg77pb9am5fohh1.apps.googleusercontent.com',
  //       callback: handleCallback
  //     })
  //     google.accounts.id.renderButton(document.getElementById('google-sign-in-button'), {
  //       width: '1000',
  //       type: 'standard',
  //       // theme: 'filled_blue',
  //       size: 'large',
  //       text: 'continue_with',
  //       shape: 'rectangular',
  //       logo_alignment: 'left',
  //       locale: 'zh_TW',
  //     })
  //     // google.accounts.id.prompt(); // One Tap dialog 顯示
  //   }
  // }
  // initGapi();

  // jwt-decode
  const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }
  const handleCallback = (response) => {
    if (!response.credential) return;
    console.log('handleCallback', response)
    localStorage.setItem('token', response.credential);
    const data = parseJwt(response.credential)
    const googleProfile = {
      id : data.sub,
      name: data.name,
      picture: data.picture,
      email: data.email,
    }
    console.log(googleProfile, data)
    navigate('/'); // 跳轉
  }

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.google.accounts.id.initialize({
        client_id: '411525327701-bi083i37cuha648m7mg77pb9am5fohh1.apps.googleusercontent.com',
        callback: handleCallback
      })
      window.google.accounts.id.renderButton(document.getElementById('google-sign-in-button'), {
        width: '1000',
        type: 'standard',
        // theme: 'filled_blue',
        size: 'large',
        text: 'continue_with',
        shape: 'rectangular',
        logo_alignment: 'left',
        locale: 'zh_TW',
      })
      window.google.accounts.id.prompt(); // One Tap dialog 顯示
    } catch (err) {
      console.log('initGapi', err);
    }
    // console.log('test')
  },[]);

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

  function back() {
    navigate(-1);
  }

  const lineLogin = () => {
    // 另一種方式安裝 line LIFF包
    console.log("lineLogin......")
    const client_id = '1657508037'; // line 後台的 channel ID
    const redirect_uri = 'https://fish750710.github.io/my-resumes/'; // callback url
    // const redirect_uri = 'http://localhost:3000/'; // callback url
    const lineUrl = 'https://access.line.me/oauth2/v2.1/authorize';
    const state = 'test1234'; // 自訂驗證碼
    const url = `${lineUrl}?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}&scope=openid%20profile%20email`;
    window.location.href = url;
    // 登入允許後 跳轉到 https://fish750710.github.io/my-resumes/?code=MDXxnuIShr4ggey1F4Wy&state=test1234
  }
  const handleLine = async() => {
    const client_id = '1657508037'; // line 後台的 channel ID
    const client_secret = '86e17515c843c75d68c6bfb797e576f6'; // line 後台的 channel ID
    const code = 'mco7peIJkxzCBLq9HlY0'; // 返回的 code 時效一分鐘很短
    const redirect_uri = 'https://fish750710.github.io/my-resumes/';
    const tokenPayload = `grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}&client_id=${client_id}&client_secret=${client_secret}`;
    const { data: tokenData } = await axios.post('https://api.line.me/oauth2/v2.1/token', tokenPayload);
    const token = tokenData.access_token;
    const id_token = tokenData.id_token;
    // console.log('tokenData', tokenData);
    // get user data
    const profileHeader = { headers: {Authorization: `Bearer ${token}`}}
    const { data: profileData } = await axios.get('https://api.line.me/v2/profile', profileHeader);
    // console.log('profileData', profileData);
    const user = {
      userId: profileData.userId,
      displayName: profileData.displayName,
      pictureUrl: profileData.pictureUrl,
    }
    // get user email
    const userPayload = `client_id=${client_id}&id_token=${id_token}`;
    const { data: userData } = await axios.post('https://api.line.me/oauth2/v2.1/verify', userPayload);
    // console.log('userData', userData);
    const user2 = {
      id: userData.sub,
      name: userData.name,
      picture: userData.picture,
      email: userData.email,
    }
    console.log(user, user2)
  }

  
  return (
    <>
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
          <h2>Login: {isLogin ? 'true' : 'false'}</h2>
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
          <div className="g-signin2" data-onsuccess="onSignIn"></div>
          <div>
            <Button onClick={lineLogin}>Line Login</Button>
            <Button onClick={handleLine}>Line 登錄成功調用Line API</Button>
          </div>
          <div>
            <div id="google-sign-in-button"></div>
            
          </div>

        </Box>
      </Box>
    </>
  );
}
export default Login;
