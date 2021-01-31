import styled from "styled-components";

export const StyledTooltip = styled.div`
  background: var(--c-blue-alpha);
  border-radius: var(--radius-s);

  font-size: 0.9rem;
  font-weight: 900;

  height: auto;
  width: auto;

  position: absolute;
  top: 0;
  left: 0;

  padding: 1rem;

  z-index: 1000;

  transition: opacity 250ms ease;
  opacity: ${({ showTooltip }) => (showTooltip ? 1.0 : 0)};
`;

`transform: translate(${({ coords }) => `${coords.x}px, ${coords.y}px`});`;

export const StyledBarLabel = styled.text`
  transition: opacity 500ms ease;
`;
