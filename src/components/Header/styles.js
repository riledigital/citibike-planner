import styled from "styled-components";
import { ButtonBase } from "./../../styles/GlobalStyles";

export const StyledBranding = styled.div`
  padding: 0 0 0 1rem;
  margin: auto 0;
`;

export const StyledButton = styled.div`
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
  padding: 5px;
  color: black;
`;

export const StyledHeader = styled.header`
  align-items: stretch;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: white;
  padding: 0.25rem;
  width: 100%;

  font-size: 0.95rem;
  position: sticky;
  top: 0;

  height: var(--h-header);
  background: var(--c-blue);

  z-index: 100;
`;

export const StyledToggleMenu = styled.button`
  ${ButtonBase}
`;

export const StyledNav = styled.nav``;
