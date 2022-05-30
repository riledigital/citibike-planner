import styled from "styled-components";
import { DEVICES } from "styles/GlobalStyles";

export const StyledTooltip = styled.div`
  background: rgba(255, 255, 255, 0.9);
  color: var(--c-blue);
  border-radius: var(--radius-s);

  font-size: 0.9rem;
  font-weight: 900;
  line-height: 1.25;

  height: auto;

  position: fixed;
  min-width: 300px;
  padding: 0.5rem;
  z-index: 1000;

  pointer-events: none;

  transition: opacity 250ms ease;
  opacity: ${({ showTooltip }) => (showTooltip ? 1.0 : 0)};

  @media ${DEVICES.tablet} {
    max-width: 50%;
  }
`;

`transform: translate(${({ coords }) => `${coords.x}px, ${coords.y}px`});`;

export const StyledBarLabel = styled.text``;
