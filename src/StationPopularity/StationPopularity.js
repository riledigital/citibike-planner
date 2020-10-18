import React from "react";

const StationPopularity = ({ rank, stations_in_nta, nta_name }) => {
  return rank ? (
    <section>
      <h3>Popularity Ranking</h3>
      <div>
        {rank} of {stations_in_nta} in {nta_name}
      </div>
    </section>
  ) : (
    <></>
  );
};
export default StationPopularity;
