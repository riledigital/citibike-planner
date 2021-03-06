import styled from "styled-components";

export const StyledMenu = styled.div`
  /* Fill the screen */

  display: flex;
  position: absolute;

  top: var(--h-header);
  right: 0;
  bottom: 0;
  left: 0;

  display: 100%;
  width: 100%;

  padding: var(--margin-base);

  background: var(--c-background);
  z-index: 100;
`;
