import React, { useState } from "react";
import { useTransition, animated } from "react-spring";

import {
  StyledButtonSound,
  StyledModal,
  StyledModalContent,
  StyledHeading,
  StyledInstructions,
  StyledSvgBike,
  StyledTitle,
  StyledAttribution,
  StyledCloseButton,
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

              <figure>
                <StyledSvgBike
                  title="Cycling illustration (Katerina Limpitsouni)"
                  viewBox="0 0 800.25287 695.42298"
                />
              </figure>

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

              <div>
                <StyledButtonSound onClick={toggleSound}>
                  Sound {soundOn ? "Off" : "On"}
                </StyledButtonSound>
                <StyledButtonSound onClick={() => setShow()}>
                  Explore
                </StyledButtonSound>
              </div>
            </StyledModalContent>
          </StyledModal>
        </animated.div>
      )
  );
};

export default Modal;
