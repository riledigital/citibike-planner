import React, { useEffect, useState } from "react";
import { StyledPopularity, StyledRankText, StyledRankTitle } from "./styles";

const StationPopularity = ({ rank, stations_in_nta, nta_name }) => {
  const [name, setName] = useState(null);
  useEffect(() => {
    const nta_name_format = nta_name ? `in ${nta_name}` : "";
    setName(nta_name_format);
  });
  const ordinal = rank == 1 ? "st" : "th";

  return rank ? (
    <StyledPopularity>
      {/* <StyledRankTitle>Popularity Ranking</StyledRankTitle> */}
      <StyledRankText>
        {rank}
        {ordinal} most popular of {stations_in_nta} {name}
      </StyledRankText>
    </StyledPopularity>
  ) : (
    <></>
  );
};
export default StationPopularity;
