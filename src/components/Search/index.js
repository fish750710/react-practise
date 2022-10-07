import React from 'react'
import './index.scss';

const index = ({ search, setInput }) => {
  return (
    <div className='search'>
      <input type="text" onChange={(e) => setInput(e.target.value)}></input>
      <button onClick={search}>Search</button>
    </div>
  )
}

export default index