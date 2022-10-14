import React from 'react'
import TapPay from 'components/Payment/TapPay';
import NewebPay from 'components/Payment/NewebPay';

const index = () => {
  return (
    <div>
      <button>TapPay</button>
      <button>NewebPay</button>
      {/* <TapPay /> */}
      <NewebPay />
    </div>
  )
}

export default index