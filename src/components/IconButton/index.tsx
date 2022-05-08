import * as React from 'react'
import styled from 'styled-components'

const CustomButton = styled.button`
  background: ${(props) => props.theme?.colors?.buttonColor};
  border: 0px dashed rgba(61, 66, 78, 0.5);
  color: ${(props) => props.theme?.colors?.buttonTextColor};
  height: 30px;
  display: flex;
  padding: 1rem;
  border-radius: 5px;
  align-items: center;
`
export default ({ children }: { children: JSX.Element | string }) => <CustomButton>{children}</CustomButton>
