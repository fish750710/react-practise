import React from 'react';
// import './index.scss';
import { NavLink, Link, useParams, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import styles from 'styles/_export.scss';

const NabBoxStyled = styled.div`
  width: 100%;
  height: 60px;
  background-color: ${styles.parmary_color};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: ${styles.font_light};
`;
const NavStyled = styled.nav`
  .active{
    color: ${styles.font_title};
    border-bottom: 1px solid ${styles.font_title};
    // color: ${props => props.active ? '${styles.font_title}' : '${styles.font_light}'};
  }
  a{
    padding: 10px 20px;
    &:hover {
      cursor: pointer;
    }
  }
`;
function Navbar() {
  // const navigate = useNavigate();
  // const location = useLocation(); //網址中資訊
  // const params = useParams(); // 動態參數
  // const [getParams, setParam] = useSearchParams(); // 網址參數
  // const name = getParams.getAll('name');
  // console.log("params", params)
  // console.log('location', location)
  // console.log('name', name)

  const isActive = (navData) => (navData.isActive ? 'active' : '');

  return (
    <NabBoxStyled>
      <NavStyled>
        <NavLink to="/" className={isActive}>首頁</NavLink>
      </NavStyled>
      <NavStyled>
        <NavLink to="/about" className={isActive}>About</NavLink>
      </NavStyled>
      <NavStyled>
        <NavLink to="/counter" className={isActive}>Counter</NavLink>
      </NavStyled>
      <NavStyled>
        <NavLink to="/billing" className={isActive}>Billing</NavLink>
      </NavStyled>
      <NavStyled>
        <NavLink to="/login" className={isActive}>登錄</NavLink>
      </NavStyled>
    </NabBoxStyled>
  );
}
export default Navbar;


// const Element = ({ red, className }) => {
//   console.log( red, className);

//   const navigate = useNavigate();
//   return (
//     <div className={className}>
//       <div className='nav'>登錄</div>
//       <div className='nav'>登錄</div>
//       <div inputColor="rebeccapurple" className='nav'>登錄</div>
//       <div red="rebeccapurple" className='nav' onClick={() => {navigate('/login')}}>登錄</div>
//     </div>
//   )
// }
// const StyledElement = styled(Element)`
//   ${props => console.log('props' ,props)}
//   width: 100%;
//   height: 80px;
//   background-color: gray;
//   display: flex;
//   justify-content: flex-end;
//   align-items: center;
//   color: #fff;
//   .nav {
//     font-size: 20px;
//     padding: 10px 20px;
//     color: palevioletred;
//     // color: ${props => (props.red ? 'red' : '#fff')};
//     // color: ${props => props.inputColor || "palevioletred"};
//     &:hover{
//       cursor: pointer;
//     }
//   }
// `

// export default StyledElement

