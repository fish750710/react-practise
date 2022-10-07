import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useParams } from 'react-router-dom';
import { increment, decrement, toggleLodding } from '../../store/user';
import { getInvoices } from 'data';
import './index.scss';
import axios from 'axios';

function Home() {
  const invoices = getInvoices();
  const [list, setList] = useState(invoices);

  // const url = useParams();
  // console.log('url', url);

  const dispatch = useDispatch();
  // const user = useSelector(state => state);
  const { value, isLoadding, name }= useSelector(state => state);
  const handleIncrement = () => {
    dispatch(increment(5))
  }
  const handleDecrement = () => {
    dispatch(decrement(5))
  }
  function delItem(event, name) {
    // console.log('del', name, event)
    setList(list.filter((item) => item.name !== name));
  }
  
  console.log('useEffect.....0')
  // 刷新 1 2 1
  // 監聽參數變更 2 1
  // 跳頁 2
  useEffect(() => {
    // 1
    console.log('useEffect.....')
    return () => {
      // 2
      // componentWillUnmount，跳頁前會執行。
      console.log('useEffect.....unmonut')
    };
  }, [list]); // [] 第一次 render 執行， 第二參數不寫每次都執行
  
  // console.log('value', value, isLoadding, name)
  return (
    <main style={{ display: "flex"}}>
      <nav style={{color: "blue", padding: "1rem", border: '1px solid'}}>
        {list.map((invoice, index) => (
          <div key={index}>
            <p>{invoice.name}</p>
            <button onClick={(e) => delItem(e, invoice.name)}>del<br/>(第一種傳參)</button>
            <button onClick={ delItem.bind(this, invoice.name)}>del2<br/>(第二種傳參)</button>
          </div>
        ))}
      </nav>
      <div className='setion'>
        <div>redux value: {value}</div>
        <button onClick={() => handleIncrement()} > + </button>
        <button onClick={() => handleDecrement()} > - </button>
        <button onClick={() => dispatch(toggleLodding(!isLoadding))} >change Loadding redux:{isLoadding ? 'true' : 'false'}</button>
      </div>
    </main>
  );
}
export default Home;