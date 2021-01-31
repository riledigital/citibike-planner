import React, { useEffect, useState } from "react";
import {
  StyledDescription,
  StyledHeading,
  StyledPopularity,
} from "./styles.js";

const StationPopularity = ({ rank, stations_in_nta, nta_name }) => {
  const [name, setName] = useState(null);
  useEffect(() => {
    const nta_name_format = nta_name ? `in ${nta_name}` : "";
    setName(nta_name_format);
  });
  return rank ? (
    <StyledPopularity>
      <StyledHeading>Popularity Ranking</StyledHeading>
      <StyledDescription>
        {rank} of {stations_in_nta} {name}
      </StyledDescription>
    </StyledPopularity>
  ) : (
    <></>
  );
};
export default StationPopularity;
