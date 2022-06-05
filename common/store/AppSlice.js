import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// import { fetchMsgPackBlob } from "common/Data/MsgPack";

const STATION_INFO = "/data/station_geo_ranked.geojson";
// const DATA_SUMMARY = "/data/hourly_breakdown.msgpack";

const initialState = {
  isLoading: false,
  isMuted: true,
  lastUpdated: "",
  rankingData: {},
  selectedStation: {},
  selectedStationId: "",
  selectedStationShortName: "",
  showInspector: false,
  showMenu: false,
  stationFavorites: [],
  stationFrequencyData: {},
  stationGeo: {},
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setMuted: (state, action) => {
      const { payload } = action;
      state.isMuted = payload;
    },
    setMenu: (state, action) => {
      const { payload } = action;
      state.showMenu = payload;
    },
    setShowInspector: (state, action) => {
      const { payload } = action;
      state.showInspector = payload;
    },
    setSelectedShortName: (state, action) => {
      const { payload: short_name } = action;
      state.showInspector = short_name ? true : false;
      state.selectedStationShortName = short_name;
      // state.selectedStationId = state.selectedStation.station_id;
    },
    setSelectedStationId: (state, action) => {
      const { payload } = action;
      state.showInspector = payload ? true : false;
      state.selectedStationId = payload;
    },
    toggleStationFavorite: (state, action) => {
      const { payload: short_name } = action;
      const existingIdx = state?.stationFavorites?.findIndex(
        (d) => d === short_name
      );
      if (existingIdx !== -1) {
        state.stationFavorites.splice(existingIdx, 1);
      } else {
        state.stationFavorites.push(short_name);
      }
    },
  },
});

export const selectShortName = (state) => {
  return state.AppSlice?.selectedStationShortName;
};

export const selectCurrentStationId = (state) => {
  return state.AppSlice?.selectedStationId;
};

export const selectShowInspector = (state) => {
  return state.AppSlice?.showInspector;
};

export const selectStationFavorited = (state) => {
  const short_name = state.AppSlice.selectedStationShortName;
  const exists = state?.AppSlice?.stationFavorites?.findIndex(
    (d) => d === short_name
  );
  return exists >= 0 ? true : false;
};

export const selectStationFavorites = (state) => {
  const ids = state.AppSlice?.stationFavorites;
  // const info = {};
  // ids?.forEach((d) => {
  //   info[d] = state.AppSlice.stationGeo.features[d];
  // });

  return ids;
};

// Action creators are generated for each case reducer function
export const {
  setMuted,
  setMenu,
  setShowInspector,
  setSelectedShortName,
  setSelectedStationId,
  toggleStationFavorite,
} = appSlice.actions;

export default appSlice.reducer;
