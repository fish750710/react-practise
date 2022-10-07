import React, { useState, useEffect } from 'react'
import Search from 'components/Search';
import Picture from 'components/Picture';
import './index.scss';

const index = () => {
  const [data, setData] = useState(null);
  const [input, setInput] = useState('');
  const auth = '563492ad6f917000010000014a7c8dbe0a924a789f687ada0a5bbe5e';
  const initURL = 'https://api.pexels.com/v1/curated?per_page=10';
  const searchURL = `https://api.pexels.com/v1/search?query=${input}&per_page=10`;
  const search = async(url) => {
    const dataFetch = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: auth,
      }
    })
    let parsedData = await dataFetch.json();
    setData(parsedData.photos);
  }
  useEffect(() => {
    if (input === '') {
      search(initURL);
    } else {
      search(searchURL);
    }
  }, []);


  return (
    <div className='photo'>
      <Search search={() => search(searchURL)} setInput={setInput}/>
      <div className='pictures'>
        {data && data.map(d => <Picture data={d} key={d.id}/>)}
      </div>
    </div>
    
  )
}

export default index
