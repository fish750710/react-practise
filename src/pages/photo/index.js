import React, { useState, useEffect } from 'react'
import Search from 'components/Search';
import Picture from 'components/Picture';
import './index.scss';

const index = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState('');
  const [page, setPage] = useState(1);
  const [currentSearch, setCurrentSearch] = useState('');
  const baseURL = 'https://api.pexels.com/v1';
  // const auth = '563492ad6f917000010000014a7c8dbe0a924a789f687ada0a5bbe5e';
  const auth = '563492ad6f91700001000001ac22187f3df749b5ac359637c75cb9b5';
  const initURL = `${baseURL}/curated?per_page=10&page=1`;
  const searchURL = `${baseURL}/search?query=${currentSearch}&per_page=10&page=1`;
  const search = async(url) => {
    if (url !== initURL && !currentSearch)  return;
    const dataFetch = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: auth,
      }
    })
    let parsedData = await dataFetch.json();
    setData(parsedData.photos);
    setPage(2);
  }

  const morepicture = async() => {
    let newURL;
    if (currentSearch === '') {
      newURL = `${baseURL}/curated?per_page=10&page=${page}`;
    } else {
      newURL = `${baseURL}/search?query=${currentSearch}&per_page=10&page=${page}`;
    }
    setPage(page+1);
    const dataFetch = await fetch(newURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: auth,
      }
    })
    let parsedData = await dataFetch.json();
    setData(data.concat(parsedData.photos));
  }

  useEffect(() => {
    if (currentSearch === '') {
      search(initURL);
    } else {
      search(searchURL);
    }
  }, [currentSearch]);


  return (
    <div className='photo'>
      <Search search={() => {
        // JS Closure
        setCurrentSearch(input); 
      }} setInput={setInput}/>
      <div className='pictures'>
        {data && data.map(d => <Picture data={d} key={d.id}/>)}
      </div>
      <div className='morePicture'>
        <button onClick={morepicture}>Load More</button>
      </div>
    </div>
    
  )
}

export default index
