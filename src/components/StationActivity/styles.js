import styled from "styled-components";

export const StyledTooltip = styled.div`
  font-size: 0.8rem;

  height: 2rem;
  width: 4rem;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(${({ coords }) => `${coords.x}px, ${coords.y}px`});
  z-index: 1000;
`;
