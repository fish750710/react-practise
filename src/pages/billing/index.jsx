import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
  memo,
  useId,
} from 'react';
// import axios from 'axios';
import { useAxios } from 'hooks/useAxios';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import './index.scss';

// import { useSelector, useDispatch } from 'react-redux'

function Billing() {
  // const dispatch = useDispatch();
  const BaseUrl = 'https://api.justplus1.com.tw/api/mapcommon/list';
  const [data, setData] = useState([]);
  const [key, setKey] = useState('');
  const [url, setUrl] = useState(BaseUrl);

  const { isLoading, error, sendRequest } = useAxios();

  // 產生唯一 ID，主要在ＳＳＲ狀態下避免 ID 不一致
  const onlyId = useId();

  useEffect(() => {
    // 放在 useEffect裡，第二參數可以 []
    // const fetchData = async() => {
    //   try {
    //     const { data: resData } = await axios.get(url);
    //     if(resData.ResultStatus !== 200) return;
    //     setData(resData.ResultData);
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   // console.log(resData);
    // }
    // fetchData();

    sendRequest({ url }, (res) => {
      if (res.ResultStatus !== 200) return;
      setData(res.ResultData);
    });
  }, []); // 第二參數加入 url

  const [filterData, updateFilterData] = useState('');
  function searchKey() {
    console.log('search..');
    if (key.length <= 0) return;
    const list = data.filter(
      (item) => item.properties.StoreName.indexOf(key) !== -1,
    );
    updateFilterData(list);
  }

  // const refData = useRef('test123');
  // console.log('refData', refData.current);
  const refText = useRef();
  useEffect(() => {
    if (refText.current) {
      console.log(refText.current);
      return;
    }
  }, []);

  const refInput = useRef();
  const clickInputHandler = () => {
    refInput.current.focus();
    console.log(refInput.current.value);
  };

  const isShow = isLoading ? 'show' : 'hide';

  return (
    <>
      <div className={`load-box ${isShow}`}>
        <div className='loading'>
          <CircularProgress />
        </div>
      </div>
      <div>
        {data?.map((item, index) => (
          <div key={index}>{item.properties.StoreName}</div>
        ))}
      </div>
      <div>API Result: {JSON.stringify(data)}</div>
      <input
        type='text'
        value={key}
        onChange={(e) => setKey(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && searchKey()}
      ></input>
      <button type='button' onClick={() => setUrl(`${BaseUrl}?query=${key}`)}>
        key api 搜尋
      </button>
      <button type='button' onClick={searchKey}>
        搜尋
      </button>
      <div>filter: {JSON.stringify(filterData)}</div>
      url: {url}
      <hr></hr>
      <Box mt={2}>
        <Typography variant='h4' gutterBottom style={{ color: 'red' }}>
          使用useRef
        </Typography>
        <div ref={refText}>這是一段字</div>
        <input type='text' ref={refInput}></input>
        <button type='button' onClick={clickInputHandler}>
          抓input value
        </button>
      </Box>
      <Box mt={2}>
        <Typography variant='h4' gutterBottom style={{ color: 'red' }}>
          使用useId
        </Typography>
        <label htmlFor={onlyId}>產生唯一ＩＤ</label>
        <input type='text' id={onlyId} />
      </Box>
      <Box mt={2}>
        <Typography variant='h4' gutterBottom style={{ color: 'red' }}>
          使用 memo
        </Typography>
        <Child reset={reset}></Child>
      </Box>
      <Box mt={2}>
        <Typography variant='h4' gutterBottom style={{ color: 'red' }}>
          使用 useMemo
        </Typography>
        <ColorPicker ></ColorPicker>
      </Box>
    </>
  );
}
export default Billing;

// 第一種先在函式外
// function getFetchUrl(query) {
//   return 'https://api.justplus1.com.tw/api/mapcommon/list' + query;
// }
function SearchResults() {
  const [query, setQuery] = useState('test');
  // 第二種使用 useCallback
  const getFetchUrl = useCallback(() => {
    return 'https://api.justplus1.com.tw/api/mapcommon/list' + query;
  }, [query]);

  useEffect(() => {
    const url = getFetchUrl();
    // ...
  }, [getFetchUrl]);
}

// useCallback (透過記憶 function 的記憶體位置，來避免子物件的重新渲染)

// React.memo (經常變更不一樣的 props 不建議使用 memo。因為使用 memo 也是需要消耗記憶效能)
const Child = memo(({ reset }) => {
  return (
    <>
      {console.log('child render.....')}
      <button onClick={reset}>Reset</button>
    </>
  );
});
const reset = () => {
  console.log('btn onClick reset...');
};

// useMemo (透過保存耗時的運算結果，在 dependency array 未改變時引用前次的運算結果)
function ColorPicker() {
  const [color, setColor] = useState('blue');
  const [fontSize, setFontSize] = useState('20px');
  const style = useMemo(() => {
    {console.log('color useMemo render.....')}
    return color;
  }, [color]); // 第一參數為 callback, 第二參數變更才重新 render (shallow compare)

  // 正常函數為重複計算
  const style2 = () => {
    {console.log('color render.....')}
    return color;
  }
  // console.log('style', style2, style)
  return <div style={{fontSize, color: style}}> useMemo....{style2()}</div>;
}
