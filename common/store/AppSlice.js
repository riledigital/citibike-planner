import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const STATION_INFO = "/data/stations-with-nta.geojson";
const DATA_SUMMARY = "/data/aggs-by-hour.json";
const LIVE_STATUS = "https://gbfs.citibikenyc.com/gbfs/en/station_status.json";

export const fetchFrequencyAnalysis = createAsyncThunk(
  "app/fetchFrequencyAnalysis",
  async () => {
    const response = await axios.get(DATA_SUMMARY);
    // response.data.features.map(d=> d.properties.)
    return response.data;
  }
);

export const fetchStationGeo = createAsyncThunk(
  "app/fetchStationGeo",
  async () => {
    const response = await axios.get(STATION_INFO);
    return response.data;
  }
);

export const fetchLiveStatus = createAsyncThunk(
  "app/fetchLiveStatus",
  async () => {
    const response = await axios.get(LIVE_STATUS);
    return response.data;
  }
);

const initialState = {
  stationFrequencyData: null,
  stationGeo: null,
  rankingData: null,
  stationStatusData: {},
  lastUpdated: null,
  favoriteStations: [],

  selectedStationId: null,

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
    setSelectedStationId: (state, action) => {
      const { payload } = action;
      state.selectedStationId = payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchFrequencyAnalysis.fulfilled, (state, action) => {
      state.stationFrequencyData = action.payload;
    });
    builder.addCase(fetchStationGeo.fulfilled, (state, action) => {
      state.stationGeo = action.payload;
    });
    builder.addCase(fetchLiveStatus.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLiveStatus.fulfilled, (state, action) => {
      state.stationStatusData = action.payload;
    });
  },
});

export const selectStationFrequencyData = (state) => {
  const id = state?.AppSlice?.selectedStationId;
  if (!id) {
    return null;
  }
  return (
    state?.AppSlice?.stationFrequencyData &&
    state?.AppSlice?.stationFrequencyData[id]
  );
};
export const selectStationGeo = (state) => {
  const id = state.AppSlice?.selectedStationId;
  return state.AppSlice?.stationGeo[id];
};
export const selectLiveStatus = (state) => {
  const id = state.AppSlice?.selectedStationId;
  return state.AppSlice?.stationStatusData[id];
};

// Action creators are generated for each case reducer function
export const {
  setMuted,
  setMenu,
  setShowInspector,
  setSelectedStationId,
} = appSlice.actions;

export default appSlice.reducer;
