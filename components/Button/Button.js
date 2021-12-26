import styled from "styled-components";
import React from "react";

const Button = (props) => {
  return <StyledBase {...props} />;
};

export default Button;

const StyledBase = styled.button`
  background: var(--c-blue);
  border: thin solid white;
  border-radius: 2ch;
  color: var(--c-white);
  padding: 0.8ch 1ch;
  font-weight: bold;
  font-size: 0.9rem;
`;
