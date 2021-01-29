import React from "react";

const Footer = () => {
  return (
    <div className="App-footer">
      <a href="https://member.citibikenyc.com/map/" target="_blank">
        Go to the Official CitiBike Map
      </a>
      <details>
        <summary>How is popularity calculated?</summary>
        <p>
          We rank rides by the average number of trips started at each stations,
          grouped by Neighborhood Tabulation Areas (NTAs), which were created to
          predict population counts in New York City at a level finer than
          Census Tracts. Neighborhoods are loosely defined, but NTA's provide a
          sufficient rough estimate.
        </p>
      </details>
      <details>
        <summary>How did you make this?</summary>
        <p>
          Data aggregation was performed using Python and the geopandas library.
          This front-end was built with create-react-app and deployed onto
          surge.sh. Visualizations were made with a combination of D3 and React,
          and the map is powered by Mapbox GL JS.{" "}
          <a href="https://github.com/rl2999/citibike-planner">
            The source is available on GitHub.
          </a>
        </p>
      </details>
      <p>
        Data is aggregated from{" "}
        <a href="https://www.citibikenyc.com/system-data">
          CitiBike System Data
        </a>
        .
      </p>
      2020 App created by <a href="https://riledigital.com">Ri Le</a>.{" "}
      <a href="https://twitter.com/riledigital">@riledigital</a>
    </div>
  );
};

export default Footer;
