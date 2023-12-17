import { DATA_URLS } from "/config";

export async function fetchAllData() {
  async function fetchParseData(url) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (err) {
      throw Error(err);
    }
  }

  // console.log("Starting to fetch data!");
  const promises = Array.from(DATA_URLS).map(([label, json]) =>
    fetchParseData(json)
  );

  return await Promise.allSettled(promises);
}

export async function getStationRanking(stationGeo, station_id) {
  try {
    let output = stationGeo.features.find(
      (d) => d.properties.station_id === station_id
    );
    return { ...output.properties };
  } catch (e) {
    console.warn("stationGeo not showing");
    console.warn(e);
  }
}

export async function getStationStatus(stationStatus, id) {
  try {
    return stationStatus[id];
  } catch (e) {
    console.error("Oops, stationStatus not loaded");
    console.error(e);
  }
}
