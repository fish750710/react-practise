import { useState } from 'react';
import styled from 'styled-components';

const InputStyled = styled.input`
  width: 200px;
  height: 38px;
  padding: 3px 10px;
  border-radius: 4px;
  border: 1px solid #bfcbd9;
  color: #1f2d3d;
  margin-top: 5px;
`;

export function useInput(opts) {
  const [value, setValue] = useState('');
  const input = <InputStyled value={value} onChange={e => setValue(e.target.value)} {...opts} />
  return [value, input];
}