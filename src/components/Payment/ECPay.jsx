import React, { useState, useEffect, useRef } from 'react';
import CryptoJS from 'crypto-js';
import {
  Box,
  TextField,
  Button,
  Alert,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Stack,
  Typography,
} from '@mui/material';

// https://vendor-stage.ecpay.com.tw/User/LogOn_Step1#
// 站內付2.0_Web: https://github.com/ECPay/ECPayPaymentGatewayKit_Web
// test帳號: stagetest1234 test1234 53538851
// 商店代號: 2000132 3002607
// HashKey: 5294y06JbISpM5x9
// HashIV: v77hoKGq4kWxNNIS
// card number 4311-9522-2222-2222  ccv 222
// 分期：4938-1777-7777-7777 ccv 222
// 測試環境：https://ecpg-stage.ecpay.com.tw/Merchant/GetTokenbyTrade
const storeId = '2000132';
const key = '5294y06JbISpM5x9';
// const key = 'pwFHCqoQZGmho4w6';
const iv = 'v77hoKGq4kWxNNIS';
// const iv = 'EkRm7iFT261dpevs';

function formatTime() {
  const d = new Date();
  const date = d.toISOString().split('T')[0].replace(/-/g, '/');
  const time = d.toTimeString().split(' ')[0];
  return `${date} ${time}`;
}
const config = {
  MerchantID: storeId,
  RememberCard: 1,
  PaymentUIType: 2,
  ChoosePaymentList: '1,3',
  OrderInfo: {
    MerchantTradeNo: Math.floor(new Date() / 1000)
      .toString()
      .padStart(20, '0'),
    MerchantTradeDate: formatTime(),
    TotalAmount: 100,
    ReturnURL: 'http://localhost:3000',
    // ReturnURL: 'https://fish750710.github.io/my-resumes/',
    TradeDesc: 'test',
    ItemName: 'test 紅茶店',
  },
  CardInfo: {
    OrderResultURL: 'http://localhost:3000', // 3D驗證時用
    CreditInstallment: '3,6,9,12', // 分期期數
  },
  ATMInfo: {
    ExpireDate: 3, // 繳費有效天數
  },
  ConsumerInfo: {
    // 會員資料
    MerchantMemberID: 'test123456',
    Email: 'customer@email.com',
    Phone: '0912345678',
    Name: 'Test',
    CountryCode: '158',
  },
};

// 加密
function encryption(data) {
  const econfig = {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv: CryptoJS.enc.Utf8.parse(iv),
  };

  return CryptoJS.AES.encrypt(
    encodeURIComponent(JSON.stringify(data)),
    CryptoJS.enc.Utf8.parse(key),
    econfig,
  ).toString();
}
// 解密
function decryption(data) {
  const econfig = {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv: CryptoJS.enc.Utf8.parse(iv),
  };
  return decodeURIComponent(
    CryptoJS.AES.decrypt(
      String(data),
      CryptoJS.enc.Utf8.parse(key),
      econfig,
    ).toString(CryptoJS.enc.Utf8),
  );
}

function getEnvi(env) {
  var result = 'STAGE';
  switch (env) {
    case 'STAGE':
      result = 'Stage';
      break;
    case 'PROD':
      result = 'Prod';
      break;
  }
  return result;
}

function EcPay(props) {
  const renderRef = useRef(true);
  const [message, setMessage] = useState('');
  const [lang, setLang] = useState('');
  const [token, setToken] = useState('');
  const [payToken, setPayToken] = useState('');
  const [orderInfo, setOrderInfo] = useState({
    OrderInfo: {},
    ATMInfo: {},
  });

  async function getToken() {
    const url = 'https://ecpg-stage.ecpay.com.tw/Merchant/GetTokenbyTrade';
    const body = {
      MerchantID: storeId,
      RqHeader: {
        Timestamp: Math.floor(Date.now() / 1000),
      },
      Data: encryption(config),
    };
    const dataFetch = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const result = await dataFetch.json();
    if (result.TransCode === 1) {
      const parseData = JSON.parse(decryption(result.Data));
      // console.log('parseData', parseData);
      if (parseData.RtnCode === 1) {
        return parseData.Token;
      } else {
        setMessage(parseData.RtnMsg);
      }
    }
  }
  async function createPayment(token, payToken) {
    const url = 'https://ecpg-stage.ecpay.com.tw/Merchant/CreatePayment';
    const paymentData = {
      MerchantID: storeId,
      PayToken: payToken,
      MerchantTradeNo: config.OrderInfo.MerchantTradeNo,
    };
    const body = {
      MerchantID: storeId,
      RqHeader: {
        Timestamp: Math.floor(Date.now() / 1000),
      },
      Data: encryption(paymentData),
    };
    const dataFetch = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const result = await dataFetch.json();
    if (result.TransCode === 1) {
      const parseData = JSON.parse(decryption(result.Data));
      console.log('parseData:', parseData);
      if (parseData.RtnCode === 1) {
        setOrderInfo(parseData);
      } else {
        setMessage(parseData.RtnMsg);
      }
    }
  }

  async function initECPay() {
    // console.log('init...');
    const newScript = document.createElement('script');
    newScript.src =
      'https://cdn.jsdelivr.net/npm/node-forge@0.7.0/dist/forge.min.js';
    document.head.appendChild(newScript);
    const ECPaySDK = document.createElement('script');
    ECPaySDK.src =
      'https://ecpg.ecpay.com.tw/Scripts/sdk-1.0.0.js?t=20210121100116';
    document.head.appendChild(ECPaySDK);
    const Environment = 'STAGE'; //請設定要連線的環境: 測試 STAGE ,正式 PROD
    const envi = getEnvi(Environment);
    const _token = await getToken(); //請設定你取到的廠商驗證碼

    // console.log(_token);
    //初始化SDK畫面
    ECPay.initialize(envi, 1, function (errMsg) {
      if (_token === '') {
        _token = prompt('請填入Token: ');
      }
      try {
        // console.log(_token, ECPay.Language.zhTW);
        ECPay.createPayment(
          _token,
          ECPay.Language.zhTW,
          function (errMsg) {
            // console.log('Callback Message: ' + errMsg);
            if (errMsg != null) setMessage(errMsg);
          },
          'V2',
        );
        // console.log('lang', lang)
        setLang(ECPay.Language.zhTW);
        setToken(_token);
      } catch (err) {
        setMessage(err);
      }
    });
  }

  useEffect(() => {
    try {
      if (renderRef.current) {
        renderRef.current = false;
        return;
      }
      setMessage('');
      initECPay();
    } catch (error) {
      console.log(error);
    }
  }, []);

  //消費者選擇完成付款方式,取得PayToken
  async function handleSubmit() {
    try {
      ECPay.getPayToken(function (paymentInfo, errMsg) {
        if (errMsg != null) {
          setMessage(errMsg);
          return;
        }
        createPayment(token, paymentInfo.PayToken);
        setPayToken(paymentInfo.PayToken);
        return true;
      });
    } catch (err) {
      setMessage(err);
    }
  }
  //切換SDK語系
  function langHanlder(e) {
    setLang(e.target.value);
    // console.log('langHanlder', lang, e.target.value, token)
    try {
      ECPay.createPayment(
        token,
        e.target.value,
        function (errMsg) {
          // console.log('Callback Message: ' + errMsg);
          if (errMsg != null) setMessage(errMsg);
        },
        'V2',
      );
    } catch (err) {
      setMessage(err);
    }
  }
  // 查詢訂單
  async function getOrderInfo() {
    const url = 'https://ecpayment-stage.ecpay.com.tw/1.0.0/Cashier/QueryTrade';
    const encryptData = {
      MerchantID: storeId,
      MerchantTradeNo: config.OrderInfo.MerchantTradeNo,
    };
    const body = {
      MerchantID: storeId,
      RqHeader: {
        Timestamp: Math.floor(Date.now() / 1000),
      },
      Data: encryption(encryptData),
    };
    console.log(encryptData, body);
    const dataFetch = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const result = await dataFetch.json();
    if (result.TransCode === 1) {
      const parseData = JSON.parse(decryption(result.Data));
      console.log('getOrderInfo:', parseData);
      if (parseData.RtnCode === 1) {
        // setOrderInfo(parseData);
      } else {
        setMessage(parseData.RtnMsg);
      }
    }
  }

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
        <InputLabel id='lang-select-label'>Language</InputLabel>
        <Select
          labelId='lang-select-label'
          id='lang-select'
          value={lang}
          label='Language'
          onChange={langHanlder}
        >
          <MenuItem value={'zh-TW'}>繁體中文</MenuItem>
          <MenuItem value={'en-US'}>English</MenuItem>
        </Select>
      </FormControl>
      <div className='order-info'>
        <div id='ECPayPayment'></div>
        <br />
        <Stack spacing={3}>
          <Button variant='contained' id='btnPay' onClick={handleSubmit}>
            確認付款
          </Button>
          {/* <input id='PaymentType' name='PaymentType' type='hidden' value='' /> */}
          <p>消費者選擇付款方式取得的PayToken : </p>
          <br />
          <TextField
            id='PayToken'
            label='PayToken'
            variant='outlined'
            size='small'
            value={payToken}
            fullWidth
          />
        </Stack>
      </div>

      {/* v-if */}
      {message && <Alert severity='error'>{message}</Alert>}
      {/* {message ? <Alert severity="error">{message}</Alert> : null} */}

      {/* v-show */}
      {/* <Alert severity="error" style={{display: message ? 'block': 'none'}}>{message}</Alert> */}
      {Object.keys(orderInfo.ATMInfo).length > 0 && (
        <Box mt={2}>
          <Typography variant='h5' gutterBottom>
            ATM繳費資訊
          </Typography>
          <Stack spacing={1}>
            <div>繳費銀行代碼：{orderInfo.ATMInfo.BankCode}</div>
            <div>繳費帳號：{orderInfo.ATMInfo.vAccount}</div>
            <div>繳費期限：{orderInfo.ATMInfo.ExpireDate}</div>
          </Stack>
        </Box>
      )}
      <Box mt={3}>
        <Typography variant='h5' gutterBottom>
          訂單資訊
        </Typography>
        <Stack spacing={1}>
          <div>
            交易狀態：
            {orderInfo.OrderInfo.TradeStatus === '1' ? '已付款' : '未付款'}
          </div>
          <div>交易金額：{orderInfo.OrderInfo.TradeAmt}</div>
          <div>付款時間：{orderInfo.OrderInfo.PaymentDate}</div>
          <div>訂單成立時間：{orderInfo.OrderInfo.TradeDate}</div>
          <div>手續費：{orderInfo.OrderInfo.ChargeFee}</div>
          <div>付款方式：{orderInfo.OrderInfo.PaymentType}</div>
          <div>交易編號：{orderInfo.OrderInfo.MerchantTradeNo}</div>
          <div>EC交易編號：{orderInfo.OrderInfo.TradeNo}</div>
          {/* <Button variant='contained' id='' onClick={getOrderInfo}>
            查詢訂單
          </Button> */}
        </Stack>
      </Box>
    </>
  );
}

export default EcPay;
