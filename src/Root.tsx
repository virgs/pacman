import styled from 'styled-components';
import { InputComponent } from './input/InputComponent';

const StyledRoot = styled.div`
  margin: 0 auto;
  text-align: center;
  touch-action: pan-y;
  overflow: hidden;
  height: 100svh;
  width: 100svw;
  user-select: none;
`

export default function Root(): JSX.Element {
  return (
    <StyledRoot>
      <InputComponent>
        <></>
        <></>
      </InputComponent>
    </StyledRoot>
  )
}
