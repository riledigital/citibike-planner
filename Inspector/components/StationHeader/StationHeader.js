// TODO: Remove live status stuff from it
import clsx from "clsx";
import ManageStation from "components/ManageStation";
import React from "react";
import styles from "./StationHeader.module.css";
import { useStationData } from "/hooks/useStationData";

/**
 * Intl ordinal standard
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/PluralRules#using_options
 */
const en_ordinal_rules = new Intl.PluralRules("en", { type: "ordinal" });
const suffixes = new Map([
  ["one", "st"],
  ["two", "nd"],
  ["few", "rd"],
  ["other", "th"],
]);
function ordinal(number) {
  const rule = en_ordinal_rules.select(number);
  const suffix = suffixes.get(rule);
  return number + suffix;
}

const StationHeader = (props) => {
  // Logic for handling null NTA codes
  const {
    name,
    station_id,
    short_name,
    ntaname,
    boroname,
    stationNeighborhood,
    station_rank,
    stations_count,
  } = useStationData();

  return name ? (
    <header className={clsx(styles.header)} style={props.style}>
      <div className={clsx(styles.name)}>
        {name}
        <div className={styles["id-label"]} title="Station ID">
          #{short_name}
        </div>
      </div>

      <div className={styles["station-info"]}>
        <div className={styles["station-ranking"]}>
          Rank {ordinal(station_rank)} of {stations_count} in
          <div>
            {stationNeighborhood}, {boroname}
          </div>
        </div>
        <ManageStation />
      </div>
    </header>
  ) : (
    <div>
      <p>Please click on a station on the map to view the activity details.</p>
    </div>
  );
};

export default StationHeader;
