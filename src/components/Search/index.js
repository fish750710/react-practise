import React from 'react'
import './index.scss';

const index = ({ search, setInput }) => {
  const keyDownHandler = (e) => {
    if (e.keyCode === 13) {
      search();
    }
  }
  return (
    <div className='search'>
      <input type="text" onChange={(e) => setInput(e.target.value)} onKeyDown={keyDownHandler}></input>
      <button onClick={search}>Search</button>
    </div>
  )
}

export default index