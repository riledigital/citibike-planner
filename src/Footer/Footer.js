import React from "react";

const Footer = () => {
  return (
    <div className="App-footer">
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
