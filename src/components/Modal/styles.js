import styled from "styled-components";
import { DEVICES } from "./../../styles/GlobalStyles";

export const StyledModal = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex; /* Hidden by default */
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: scroll;
  justify-content: center;
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
