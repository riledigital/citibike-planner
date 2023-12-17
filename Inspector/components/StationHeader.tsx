"use client";
// import ManageStation from "components/ManageStation";
import React from "react";
import { useStationRanking } from "hooks/useStationRanking";
import { useStationState } from "common/MapState";
import { styled } from "styled-components";

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

const StyledHeader = styled.header`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  gap: 0.5em;
`;

const StyledName = styled.div`
  line-height: 1.1;
  font-size: 1.2rem;
  font-weight: var(--fw-bold);
  width: 100%;
`;

const StyledIdLabel = styled.span`
  display: block;
  float: right;
  font-size: 1rem;
`;

const StyledInfo = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 100%;

  font-size: 1rem;
`;

const StyledRanking = styled.div`
  display: block;
`;

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
    <StyledHeader>
      <StyledName>
        {name}
        <StyledIdLabel title="Station ID">#{short_name}</StyledIdLabel>
      </StyledName>

      <StyledInfo>
        <StyledRanking>
          Rank {ordinal(station_rank)} of {stations_count} in
          <div>
            {ntaname}, {boroname}
          </div>
        </StyledRanking>
        {/* <ManageStation /> */}
      </StyledInfo>
    </StyledHeader>
  );
}
