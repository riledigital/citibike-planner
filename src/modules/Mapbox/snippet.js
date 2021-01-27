// TODO Move this to App Later
const fetchData = async () => {
  const results = await DataManager.startFetching();
  setAggData(results[0].value);
  setStationGeo(results[1].value);
  let allStationsStatus = {};
  const fetchedData = results[2].value;
  fetchedData["data"]["stations"].forEach((record) => {
    allStationsStatus[record.station_id] = { ...record };
  });
  setStationStatus(results[2].value);
  setStationStatus(allStationsStatus);
  setLastUpdated(new Date(fetchedData["last_updated"] * 1000));
};
