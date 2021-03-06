/* eslint-disable no-undef */
export const ASSETS = (() => {
  const ASSETS = new Map();
  ASSETS.set("test", null);
  return ASSETS;
})();

export const DATA_URLS = (() => {
  const DATA_URLS = new Map();
  DATA_URLS.set("DATA_ANALYSIS", `/data/aggs_by_hour.json`);
  DATA_URLS.set("STATION_INFO", `/data/station_info.geojson`);
  DATA_URLS.set(
    "CITIBIKE_LIVE_STATUS",
    `https://gbfs.citibikenyc.com/gbfs/en/station_status.json`
  );
  return DATA_URLS;
})();
