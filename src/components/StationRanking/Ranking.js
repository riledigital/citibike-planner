import React from "react";
import PropTypes from "prop-types";

import { StyledRankTitle, StyledRankText } from "./styles.js";

const Ranking = ({ station }) => {
  if (!station) {
    return null;
  }
  const { rank, stations_in_nta, nta_name } = station;
  const ordinal = rank == 1 ? "st" : "th";
  return (
    <>
      <StyledRankText>
        {rank}
        {ordinal} of {stations_in_nta} in {nta_name}
      </StyledRankText>
    </>
  );
};

Ranking.propTypes = {
  station: PropTypes.object,
};

export default Ranking;
