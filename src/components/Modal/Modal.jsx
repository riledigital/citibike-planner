import React, { useState } from "react";
import { useTransition, animated } from "react-spring";

import {
  StyledButtonSound,
  StyledModal,
  StyledModalContent,
  StyledHeading,
  StyledInstructions,
  StyledTitle,
  StyledAttribution,
  StyledCloseButton,
  StyledSummary,
  StyledDetails,
  StyledButtonWrappers,
} from "./styles.js";

const Modal = ({ toggle, soundOn, toggleSound }) => {
  const [show, setShow] = useState(true);

  const transitions = useTransition(show, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  // const { toggle } = props;
  const stopPropogation = (e) => {
    e.stopPropagation();
  };

  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <animated.div key={key} style={props}>
          <StyledModal onClick={() => setShow()}>
            <StyledModalContent onClick={stopPropogation}>
              <StyledCloseButton
                type="button"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => setShow()}
              >
                &times;
              </StyledCloseButton>
              <StyledTitle>Citi Bike Planner</StyledTitle>
              <StyledAttribution>By Ri Le</StyledAttribution>
              <p>When is the best time to take a Citi Bike in your area?</p>
              <p>
                Use this app to find out which Citi Bike stations are free
                during a specific time of day, or explore stations around the
                city and find out when your favorite stations are the busiest.
              </p>
              <StyledHeading>Instructions</StyledHeading>
              <StyledInstructions>
                Click on a station on the map. A histogram will appear on the
                sidebar that shows the ride distribution across all 24 hours of
                the day. This is a personal project unaffiliated with Motivate
                or Citi Bike.
              </StyledInstructions>
              <StyledDetails>
                <StyledSummary>How is popularity calculated?</StyledSummary>
                <p>
                  We rank rides by the average number of trips started at each
                  stations, grouped by Neighborhood Tabulation Areas (NTAs),
                  which were created to predict population counts in New York
                  City at a level finer than Census Tracts. Neighborhoods are
                  loosely defined, but NTA's provide a sufficient rough
                  estimate.
                </p>
                <p>
                  Data is aggregated from{" "}
                  <a href="https://www.citibikenyc.com/system-data">
                    CitiBike System Data
                  </a>
                  .
                </p>
              </StyledDetails>
              <StyledDetails>
                <StyledSummary>How did you make this?</StyledSummary>
                <p>
                  Data aggregation was performed using Python and the geopandas
                  library. This front-end was built with create-react-app and
                  deployed to Netlify. Visualizations were made with a
                  combination of D3 and React, and the map is powered by Mapbox
                  GL JS.{" "}
                  <a href="https://github.com/rl2999/citibike-planner">
                    The source is available on GitHub.
                  </a>
                </p>
              </StyledDetails>

              <p>
                2021 App created by <a href="https://riledigital.com">Ri Le</a>.{" "}
                <a href="https://github.com/riledigital">@riledigital</a>
              </p>

              <a href="https://member.citibikenyc.com/map/" target="_blank">
                Go to the Official CitiBike Map
              </a>

              <StyledButtonWrappers>
                <StyledButtonSound onClick={toggleSound}>
                  Sound {soundOn ? "Off" : "On"}
                </StyledButtonSound>
                <StyledButtonSound onClick={() => setShow()}>
                  Explore
                </StyledButtonSound>
              </StyledButtonWrappers>
            </StyledModalContent>
          </StyledModal>
        </animated.div>
      )
  );
};

export default Modal;
