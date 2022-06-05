// https://observablehq.com/@d3/margin-convention
import Button from "components/Button";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import BarPlot from "./BarPlot";
import RadialVis from "./RadialVis";
import styles from "./StationActivity.module.css";
import { FaChartBar, FaClock } from "react-icons/fa";
import { useFrequency } from "hooks/useFrequency";

const RADIAL_PLOT = Symbol("RADIAL_PLOT");
const BAR_PLOT = Symbol("BAR_PLOT");

const StationActivity = ({
  width = 400,
  height = 400,
  fill = "var(--c-white)",
  textFill = "var(--c-white)",
}) => {
  const [type, setType] = useState(BAR_PLOT);

  const currentHour = useRef();
  const { data } = useFrequency();

  currentHour.current = new Date().getHours();

  if (!data) {
    return (
      <>
        <div>No data available for this station.</div>
      </>
    );
  }

  return (
    <StyledStationActivity>
      <p>Average number of rides per hour:</p>
      {renderVisType(type)}

      <div className={styles["toggleButtonsContainer"]}>
        <Button className={styles["button"]} onClick={(e) => setType(BAR_PLOT)}>
          <FaChartBar />
          <span className="sa-only">Bar</span>
        </Button>
        <Button
          className={styles["button"]}
          onClick={(e) => setType(RADIAL_PLOT)}
        >
          <FaClock />
          <span className="sa-only">Radial</span>
        </Button>
      </div>
    </StyledStationActivity>
  );
};

const renderVisType = (type) => {
  switch (type) {
    case RADIAL_PLOT: {
      return <RadialVis />;
    }
    case BAR_PLOT: {
      return <BarPlot />;
    }
    default: {
      return <BarPlot />;
    }
  }
};

export default StationActivity;

const formatTime = (time) => {
  if (time > 12) {
    return `${Number.parseFloat(time).toFixed(0) - 12}`;
  } else {
    return `${Number.parseFloat(time).toFixed(0)}`;
  }
};

const StyledStationActivity = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  max-height: 20rem;
  width: 100%;
  overflow: auto;
`;
