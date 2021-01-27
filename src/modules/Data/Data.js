import { DATA_URLS } from "./../../config";

class Data {
  constructor() {}

  startFetching() {
    console.log("Starting to fetch data!");
    return Promise.allSettled(
      DATA_URLS.entries().map((source) => this.fetchParseData(source[1]))
    );
  }

  async fetchParseData(url) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (err) {
      throw Error(err);
    }
  }

  getStationRanking(stationGeo, station_id) {
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

  getStationStatus(stationStatus, id) {
    try {
      return stationStatus[id];
    } catch (e) {
      console.error("Oops, stationStatus not loaded");
      console.error(e);
    }
  }
}

export default Data;
