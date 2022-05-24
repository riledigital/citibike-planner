import styled from "styled-components";
import { DEVICES, ZSPACE, ButtonBase } from "/styles/GlobalStyles";

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
  box-shadow: 1px 1px 12px 2px rgba(0, 0, 0, 0.5);
  background: var(--c-white);
  display: block;
  border-radius: 8px;
  top: 2vh;
  position: absolute;
  padding: calc(var(--margin-base) * 2);
  z-index: 50; /* Sit on top */

  @media ${DEVICES.tablet} {
    width: 45ch;
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
  ${ButtonBase}
  float: right;
`;

export const StyledSummary = styled.summary`
  font-size: 0.9rem;
  font-weight: 900;
  :last-of-type {
    margin-bottom: 1rem;
  }
`;

export const StyledDetails = styled.details`
  font-size: 0.9rem;
`;

export const StyledButtonWrappers = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
`;
