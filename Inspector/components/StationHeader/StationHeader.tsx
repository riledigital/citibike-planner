"use client";
import clsx from "clsx";
// import ManageStation from "components/ManageStation";
import React from "react";
import styles from "./StationHeader.module.css";
import { useStationRanking } from "hooks/useStationRanking";
import { useStationState } from "common/MapState";

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

export function StationHeader(props) {
  // Logic for handling null NTA codes
  const { currentStationId } = useStationState();

  const { data, isLoading } = useStationRanking(1);

  if (isLoading && data) {
    return <div>loading</div>;
  }

  if (!currentStationId) {
    return (
      <div>
        <p>
          Please click on a station on the map to view the activity details.
        </p>
      </div>
    );
  }

  const {
    name,
    short_name,
    boroname,
    ntaname,
    station_rank,
    stations_count,
  } = data.stationAnalysis.get(currentStationId);

  return (
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
            {ntaname}, {boroname}
          </div>
        </div>
        {/* <ManageStation /> */}
      </div>
    </header>
  );
}
