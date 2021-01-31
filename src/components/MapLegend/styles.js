import styled from "styled-components";

export const StyledMapLegend = styled.div`
  background: rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  font-size: 0.9rem;
  max-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0 0 1rem;
`;

export const StyledHeading = styled.h3`
  /* composes: fontHeading from "./../styles/typography.module.css"; */
  font-size: 0.7rem;
  padding: 0;
  margin: 0;
`;

export const StyledFigure = styled.figure`
  margin: 0;
  padding: 0;
  margin-left: auto;
  margin-right: auto;
`;

export const StyledP = styled.p`
  padding: 0;
  margin: 0;
  margin-bottom: 0.5rem;
`;
