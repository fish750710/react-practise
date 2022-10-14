import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useInput } from 'hooks/useInput';
import styled from 'styled-components';
import styles from 'styles/_export.scss';

const PayBoxStyled = styled.div`
  width: 100%;
  height: 100%;
  font-size: 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #1f2d3d;
`;
const InputBoxStyled = styled.div`
  width: 200px;
  height: 60px;
  margin: 12px;
`;
// const InputStyled = styled.input`
//   width: 200px;
//   height: 38px;
//   padding: 3px 10px;
//   border-radius: 4px;
//   border: 1px solid #bfcbd9;
//   color: #1f2d3d;
//   margin-top: 5px;
// `;
const TpfieldStyled = styled.div`
  width: 200px;
  height: 38px;
  padding: 3px 10px;
  border-radius: 4px;
  border: 1px solid #bfcbd9;
  color: #1f2d3d;
  margin-top: 5px;
`;
const BtnStyled = styled.div`
  background: #4a4a4a;
  color: #fff;
  border-radius: 5px;
  padding: 12px;
  text-align: center;
  font-size: 15px;
  width: 200px;
`;
const MsgStyled = styled.div`
  margin: 1rem;
`;

// ECPay


// TapPay
// App Key: app_whdEWBH8e8Lzy4N6BysVRRMILYORF6UxXbiOFsICkz0J9j1C0JUlCHv1tVJC
// App ID: 11327
// Partner Key: partner_6ID1DoDlaPrfHw6HBZsULfTYtDmWs0q0ZZGKMBpp4YICWBxgK97eK3RM
// Merchant ID: GlobalTesting_CTBC
// card number 4242424242424242
// month 01
// year 23
// ccv 123
const tapPayConfig = {
  appId: 11327,
  appKey: 'app_whdEWBH8e8Lzy4N6BysVRRMILYORF6UxXbiOFsICkz0J9j1C0JUlCHv1tVJC',
  mode: 'sandbox',
};

// 載入有些問題
// const tapPaySdkId = 'tappaysdk';
// const tapPaySdkSrc = 'https://js.tappaysdk.com/tpdirect/v5.13.1';
// const loadTapPaySDK = () => {
//   const script = document.getElementsByTagName('script')[0];
//   const newScript = document.createElement('script');
//   newScript.id = tapPaySdkId;
//   newScript.src = tapPaySdkSrc;
//   script.parentNode.insertBefore(newScript, script);
//   newScript.onload = () => {
//     // initTapPay();
//     // initLinePay();
//   };
//   newScript.onerror = (err) => console.log(err);
// };

const initTapPay = async () => {
  await TPDirect.setupSDK(
    tapPayConfig.appId,
    tapPayConfig.appKey,
    tapPayConfig.mode,
  );
  await TPDirect.card.setup({
    fields: {
      number: {
        // css selector
        element: '#card-number',
        placeholder: '**** **** **** ****',
      },
      expirationDate: {
        // DOM object
        element: '#card-expiration-date',
        placeholder: 'MM / YY',
      },
      ccv: {
        element: '#card-ccv',
        placeholder: '後三碼',
      },
    },
    styles: {
      // Style all elements
      input: {},
      // Styling ccv field
      'input.cvc': {
        // 'font-size': '16px'
      },
      // Styling expiration-date field
      'input.expiration-date': {
        // 'font-size': '16px'
      },
      // Styling card-number field
      'input.card-number': {
        // 'font-size': '16px'
      },
      // style focus state
      ':focus': {
        // 'color': 'black'
      },
      // style valid state
      '.valid': {
        color: 'green',
      },
      // style invalid state
      '.invalid': {
        color: 'red',
      },
      // Media queries
      // Note that these apply to the iframe, not the root window.
      '@media screen and (max-width: 400px)': {
        input: {
          color: 'orange',
        },
      },
    },
    // 此設定會顯示卡號輸入正確後，會顯示前六後四碼信用卡卡號
    isMaskCreditCardNumber: true,
    maskCreditCardNumberRange: {
      beginIndex: 6,
      endIndex: 11,
    },
  });
};

const initLinePay = async () => {
  await TPDirect.linePay.getPrime((result) => {
    console.log('linePay', result);
  });
};

const TapPay = () => {
  const renderRef = useRef(true);
  const [username, setUsername] = useInput({
    placeholder: '請輸入持卡人姓名',
    type: 'text',
    id: 'name',
    name: 'name',
  });
  const [email, setEmail] = useInput({
    placeholder: '請輸入eamil',
    type: 'email',
    id: 'email',
    name: 'email',
  });
  const [phoneNumber, setPhoneNumber] = useInput({
    placeholder: '請輸入手機號碼',
    type: 'tel',
    id: 'phoneNumber',
    name: 'phoneNumber',
  });
  const [message, setMessage] = useState('');
  const [cardholder, setCardholder] = useState({
    email: '',
    name: '',
    phoneNumber: '',
  });
  const [tapPay, setTapPay] = useState({
    prime: '',
    redirectPath: '/payment/redirect',
    cardholder: '',
  });

  useEffect(() => {
    setCardholder({
      email,
      phoneNumber,
      name:username
    })
  },[username, email, phoneNumber]);


  const checkStatus = () => {
    // 取得 TapPay Fields 的 status
    const tpdObj = TPDirect.card.getTappayFieldsStatus();
    // console.log('tpdObj', tpdObj);
    // 確認是否可以 getPrime
    if (tpdObj.canGetPrime === false) {
      setMessage('can not get prime');
      return;
    }
  };
  const onSubmit = () => {
    checkStatus();
    TPDirect.card.getPrime((result) => {
      if (result.status !== 0) {
        setMessage('get prime error ' + result.msg);
        return;
      }
      setMessage('get prime 成功');
      setTapPay({ ...tapPay, prime: result.card.prime, cardholder });
    });
  };

  useEffect(() => {
    // React 18 避免渲染兩次，或是把嚴格模式拿掉 React.StrictMode
    if (renderRef.current) {
      renderRef.current = false;
      return;
    }
    initTapPay();
  }, []);

  useEffect(() => {
    // console.log('tapPay:', tapPay);
  }, [tapPay]);

  return (
    <>
      <PayBoxStyled>
        <InputBoxStyled>
          <div>持卡人姓名</div>
          {setUsername}
        </InputBoxStyled>
        <InputBoxStyled>
          <div>手機號碼</div>
          {setPhoneNumber}
        </InputBoxStyled>
        <InputBoxStyled>
          <div>E-mail</div>
          {setEmail}
        </InputBoxStyled>
        <InputBoxStyled>
          <div>卡號 ex:4242424242424242</div>
          <TpfieldStyled className='tpfield' id='card-number'></TpfieldStyled>
        </InputBoxStyled>
        <InputBoxStyled>
          <div>卡片到期日</div>
          <TpfieldStyled
            className='tpfield'
            id='card-expiration-date'
          ></TpfieldStyled>
        </InputBoxStyled>
        <InputBoxStyled>
          <div>安全碼</div>
          <TpfieldStyled className='tpfield' id='card-ccv'></TpfieldStyled>
        </InputBoxStyled>
        <BtnStyled onClick={onSubmit}>Pay</BtnStyled>
        <MsgStyled>Message: {message}</MsgStyled>
        <MsgStyled>
          <p>TapPay Data:</p>
          <div>
            <div>ID: </div>
            <div>Prime: {tapPay.prime}</div>
            <div>Path: {tapPay.redirectPath}</div>
            <div>Name: {tapPay.cardholder.name}</div>
            <div>Phone: {tapPay.cardholder.phoneNumber}</div>
            <div>Email: {tapPay.cardholder.email}</div>
          </div>
        </MsgStyled>
      </PayBoxStyled>
    </>
  );
};

export default TapPay;
