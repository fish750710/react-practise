export function initECPaySDK() {
  const newScript = document.createElement('script');
  newScript.src = 'https://cdn.jsdelivr.net/npm/node-forge@0.7.0/dist/forge.min.js';
  document.head.appendChild(newScript);
  const ECPaySDK = document.createElement('script');
  ECPaySDK.src = 'https://ecpg.ecpay.com.tw/Scripts/sdk-1.0.0.js?t=20210121100116';
  document.head.appendChild(ECPaySDK);
  // window.onload = () => {
  //   console.log('win', ECPay);
  //   var Environment = 'STAGE'; //請設定要連線的環境: 測試 STAGE ,正式PROD
  //   var envi = GetEnvi(Environment);
  //   var _token = 'a93c0ed84a924def920f9e653f13621f'; //請設定你取到的廠商驗證碼
  //   //初始化SDK畫面
  //   ECPay.initialize(envi, 1, function (errMsg) {
  //       if (_token === '') {
  //           _token = prompt('請填入Token: ');
  //       }
  //       try {
  //           ECPay.createPayment(_token, ECPay.Language.zhTW, function (errMsg) {
  //               //console.log('Callback Message: ' + errMsg);
  //               if (errMsg != null)
  //                   ErrHandle(errMsg);
  //           },'V2');
  //           $('#Language').val(ECPay.Language.zhTW);
  //       } catch (err) {
  //           ErrHandle(err);
  //       }
  //   });
  // }

}
