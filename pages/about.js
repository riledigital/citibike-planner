import LayoutContent from "components/LayoutContent";
import Title from "components/Title";

const AboutPage = () => {
  return (
    <LayoutContent>
      <Title>About</Title>
      <StyledTitle>Citi Bike Planner</StyledTitle>
      <StyledAttribution>By Ri Le</StyledAttribution>
      <p>When is the best time to take a Citi Bike in your area?</p>
      <p>
        Use this app to find out which Citi Bike stations are free during a
        specific time of day, or explore stations around the city and find out
        when your favorite stations are the busiest.
      </p>
      <StyledHeading>Instructions</StyledHeading>
      <StyledInstructions>
        Click on a station on the map. A histogram will appear on the sidebar
        that shows the ride distribution across all 24 hours of the day. This is
        a personal project unaffiliated with Motivate or Citi Bike.
      </StyledInstructions>

      <StyledHeading>How is popularity calculated?</StyledHeading>
      <p>
        We rank rides by the average number of trips started at each stations,
        grouped by Neighborhood Tabulation Areas (NTAs), which were created to
        predict population counts in New York City at a level finer than Census
        Tracts. Neighborhoods are loosely defined, but NTAs provide a sufficient
        rough estimate.
      </p>
      <p>
        Data is aggregated from{" "}
        <a href="https://www.citibikenyc.com/system-data">
          CitiBike System Data
        </a>
        .
      </p>

      <StyledHeading>How did you make this?</StyledHeading>
      <p>
        Data aggregation was performed using Python and the geopandas library.
        This front-end is built with React and Redux. Visualizations were made
        with a combination of D3 and React, and the map is powered by Mapbox.
        <br />
        <a href="https://github.com/riledigital/citibike-planner">
          The source is available on GitHub.
        </a>
      </p>
      <p>
        2022 App created by <a href="https://riledigital.com/">@riledigital</a>
      </p>
      <a
        href="https://member.citibikenyc.com/map/"
        target="_blank"
        rel="noreferrer"
      >
        Go to the Official CitiBike Map
      </a>
    </LayoutContent>
  );
};

export default AboutPage;

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
  font-size: 2rem;
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
