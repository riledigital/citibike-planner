import styled from "styled-components";
import { DEVICES, ZSPACE, ButtonBase } from "./../../styles/GlobalStyles";

import { ReactComponent as Bike } from "./undraw_bike_ride_7xit.svg";

export const StyledSvgBike = styled(Bike)`
  max-width: 80%;
  padding: 1rem;
`;

export const StyledModal = styled.div`
  align-items: center;

  background-color: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);

  display: flex; /* Hidden by default */
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  overflow: scroll;
  justify-content: center;
  margin: auto;

  z-index: ${ZSPACE.modal}; /* Sit on top */

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

export const StyledModalContent = styled.div`
  background: var(--c-white);
  display: block;
  border-radius: 8px;
  top: 2vh;
  position: absolute;
  padding: calc(var(--margin-base) * 2);
  z-index: 50; /* Sit on top */

  @media ${DEVICES.tablet} {
    width: 400px;
  }
`;

export const StyledButtonSound = styled.button`
  ${ButtonBase}
`;

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

export const StyledCloseButton = styled.button`
  float: right;
`;
