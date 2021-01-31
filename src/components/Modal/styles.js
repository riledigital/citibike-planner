import styled from "styled-components";
import { DEVICES } from "./../../styles/GlobalStyles";

import { ReactComponent as Bike } from "./undraw_bike_ride_7xit.svg";

export const StyledSvgBike = styled(Bike)`
  max-width: 80%;
  padding: 1rem;
`;

export const StyledModal = styled.div`
  align-items: center;
  background-color: var(--c-white);
  display: flex; /* Hidden by default */
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  width: 95%;
  height: 90%;
  overflow: scroll;
  justify-content: center;
  margin: auto;

  z-index: 100; /* Sit on top */

  @media ${DEVICES.tablet} {
    .illustration {
      max-height: 10rem;
    }

    .modalContent {
      max-width: 40ch;
      padding: 2rem;
    }
  } ;
`;

export const StyledCloseButton = styled.button`
  float: right;
`;

export const StyledModalContent = styled.div`
  display: block;
  z-index: 100; /* Sit on top */
  border-radius: 8px;
  top: 0;
  position: absolute;
  padding: calc(var(--margin-base) * 2);
`;

export const StyledButtonSound = styled.button``;

export const StyledInstructions = styled.p`
  /* composes: fontBody from "./../styles/typography.module.css"; */
`;

export const StyledHeading = styled.h3``;

export const StyledTitle = styled.h1`
  font-size: 1rem;
`;

export const StyledAttribution = styled.p`
  font-weight: bold;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;
