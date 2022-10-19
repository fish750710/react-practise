import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './styles/main.scss';
import App from './App';
import store from './store';
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
// import { installGapiSDK } from './plugins/google-api';
// import { initECPaySDK } from './plugins/ecpay-api';

(async() => {
  // await installGapiSDK();
  // await initECPaySDK();

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
})();


// reportWebVitals(console.log);

