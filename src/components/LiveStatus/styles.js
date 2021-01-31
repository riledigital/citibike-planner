import styled from "styled-components";
import { ButtonBase } from "./../../styles/GlobalStyles";

export const StyledHeading = styled.h3`
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  padding: 0;
  margin: 0;
  margin-top: 1rem;
  margin-bottom: 0rem;
  letter-spacing: 0.05rem;
  text-align: center;
`;

export const StyledStation = styled.div`
  border: 1px solid gray;
  border-radius: 8px;
  text-align: center;
  padding: 0.5rem;
`;

export const StyledInfoHeader = styled.header`
  animation: 12s infinite flash;
  padding-bottom: 0;
`;

export const StyledStatusTitle = styled.h3`
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1.1px;
  margin: 0 0 0 0;
  padding: 0 0 0.25rem 0;
`;

export const StyledStationName = styled.h3`
  margin-bottom: 0;
  font-size: 1rem;
  margin-top: 0;
  font-weight: 300;
  content: "#";
  margin: 0;
`;

export const StyledStationStatus = styled.div`
  text-align: center;
  flex-grow: 0;
  display: block;
  padding: 0rem 0.5rem 0rem 0.5rem;
  height: auto;
  overflow: hidden;
`;

export const StyledStationStatusLabel = styled.div`
  font-size: 0.75rem;
  line-height: 1.2;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  margin-top: 0;

  height: auto;
`;

export const StyledLastUpdated = styled.div`
  font-weight: normal;
  font-size: 0.8rem;
  text-align: center;
  margin-bottom: 0.5rem;
`;

export const StyledStationCounts = styled.div`
  font-family: "Jost";
  font-size: 1.5rem;
  text-align: center;
`;

export const StyledLoadingIllustration = styled.div`
  border: 1px solid gray;
  background-color: var(--c-text);
  color: var(--c-background);
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  height: 10rem;
`;

export const StyledStatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: auto;
  padding: 0;
  margin: 0;
  width: 100%;
`;

export const StyledNumber = styled.div`
  font-variant-numeric: oldstyle-nums;
  display: block;
  font-size: 1.5rem;
`;

export const StyledButtonUnlock = styled.a`
  ${ButtonBase}
  margin-top: 1rem;
`;
