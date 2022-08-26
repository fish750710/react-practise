import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
// import { useSelector, useDispatch } from 'react-redux'

function Billing() {
  // const dispatch = useDispatch();
  const BaseUrl = 'https://api.justplus1.com.tw/api/mapcommon/list';
  const [data, setData] = useState([]);
  const [key, setKey] = useState('');
  const [url, setUrl] = useState(BaseUrl);
  useEffect(() => {
    // 放在 useEffect裡，第二參數可以 []
    const fetchData = async() => {
      try {
        const { data: resData } = await axios.get(url);
        if(resData.ResultStatus !== 200) return;
        setData(resData.ResultData);
      } catch (error) {
        console.log(error);
      }
      // console.log(resData);
    }
    fetchData();
  }, []); // 第二參數加入 url

  const [filterData, updateFilterData] = useState('');
  function searchKey() {
    if (key.length <= 0) return;
    const list = data.filter((item) => item.properties.StoreName.indexOf(key) !== -1);
    updateFilterData(list);
  }

  // const refData = useRef('test123');
  // console.log('refData', refData);
  return (
    <>
      <div>
        {data.map((item, index) => (
          <div key={index}>{item.properties.StoreName}</div>
        ))}
        
      </div>
      <div>API Result:  {JSON.stringify(data)}</div>
      <input type='text' value={key} onChange={(e) => setKey(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && searchKey()}></input>
      <button type='button' onClick={() => setUrl(`${BaseUrl}?query=${key}`)}>key api 搜尋</button>
      <button type='button' onClick={searchKey}>搜尋</button>
      <div>filter: {JSON.stringify(filterData)}</div>
      url: {url}
    </>
  )
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

function ColorPicker() {
  const [color, setColor] = useState('pick');
  const style = useMemo(() => { color }, [color]);
  return <Child style={style} />
}