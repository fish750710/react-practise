import { useReducer, useEffect, useState } from 'react';

// 第一種
const initialState = {
  count: 0,
  step: 1,
}

function reducer(state, action) {
  // console.log(action)
  const { count, step } = state;
  switch (action.type) {
    case 'tick':
      return { count: count + step, step };
    case 'step':
      return { count, step: action.step };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [dispatch]);

  return(
    <>
      <h1>{count}</h1>
      <input value={step} onChange={e => {
        dispatch({
          type: 'step',
          step: Number(e.target.value || 0),
        })
      }} />
    </>
  )
}

// 第二種
function Counter2({ step }) {
  const [count, dispatch] = useReducer(reducer, 0);
  function reducer(state, action) {
    switch (action.type) {
      case 'tick':
        return state + step;
      default:
        throw new Error();
    }
  }

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);
    return (() => clearInterval(id));
  }, [dispatch])

  return(
    <>
      <p>{count}</p>
    </>
  )
}

function App() {
  const [step, setStep] = useState(1);
  return (
    <>
      <Counter2 step={step} />
      <input value={step} onChange={e => setStep(Number(e.target.value))}/>
    </>
  )
}

function Counter3() {
  return (
    <>
      <Counter />
      <App />
    </>
  )
}

export default Counter3;