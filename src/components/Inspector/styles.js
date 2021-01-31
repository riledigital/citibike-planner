import styled from "styled-components";

export const StyledInspector = styled.dialog`
  border: none;
  border-radius: 1.8rem;
  background: var(--c-blue);
  color: var(--c-white);
  display: grid;
  position: absolute;
  top: 50vh;
  z-index: 50;
  padding: var(--margin-base);

  width: 400px;

  transition: transform 250ms ease;
  transform: ${({ visible }) =>
    visible ? "translateX(0)" : "translateX(-90%)"};
`;
