import React from "react";
import PropTypes from "prop-types";

import { StyledRankTitle, StyledRankText } from "./styles.js";

const Ranking = ({ station }) => {
  if (!station) {
    return null;
  }
  const { rank, stations_in_nta, nta_name } = station;
  return (
    <>
      <StyledRankTitle>Popularity Ranking</StyledRankTitle>
      <StyledRankText>
        {rank} of {stations_in_nta} in {nta_name}
      </StyledRankText>
    </>
  );
};

Ranking.propTypes = {
  station: PropTypes.object,
};

export default Ranking;
