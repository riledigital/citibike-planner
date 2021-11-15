import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const STATION_INFO = "/data/station_info.geojson";
const DATA_SUMMARY = "/data/aggs_by_hour.json";
const LIVE_STATUS = "https://gbfs.citibikenyc.com/gbfs/en/station_status.json";

const initialState = {
  aggData: null,
  stationGeo: null,
  rankingData: null,
  stationStatusData: {},
  lastUpdated: null,
  favoriteStations: [],

  currentStationId: null,

  isMuted: true,
  showMenu: false,
  showInspector: false,
  isLoading: false,
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
    setShowInspector: (state, action) => {
      const { payload } = action;
      state.showInspector = payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchStationGeo.fulfilled, (state, action) => {
      // Add user to the state array
      state.stationGeo = action.payload;
    });
    builder.addCase(fetchLiveStatus.fulfilled, (state, action) => {
      // Add user to the state array
      state.stationStatusData = action.payload;
    });
  },
});

export const fetchStationGeo = createAsyncThunk(
  "users/fetchStationGeo",
  async () => {
    const response = await axios.get("/data/station_info.geojson");
    return response.data;
  }
);

export const fetchLiveStatus = createAsyncThunk(
  "users/fetchLiveStatus",
  async () => {
    const response = await axios.get(LIVE_STATUS);
    return response.data;
  }
);

// Action creators are generated for each case reducer function
export const { setMuted, setMenu } = appSlice.actions;

export default appSlice.reducer;
