import styled from "styled-components";
import { ZSPACE } from "/styles/GlobalStyles";

export const StyledMap = styled.div`
  /* Fit entire map to screen */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${ZSPACE.map};
`;
