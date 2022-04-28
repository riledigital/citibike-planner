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
  stationFavorites: [],

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
      state.showInspector = payload ? true : false;
      state.selectedStationId = payload;
    },
    toggleStationFavorite: (state, action) => {
      const { payload } = action;
      const existingIdx = state?.stationFavorites?.findIndex(
        (d) => d === payload
      );
      if (existingIdx >= 0) {
        state.stationFavorites.splice(existingIdx, 1);
      } else {
        state.stationFavorites.push(payload);
      }
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchFrequencyAnalysis.fulfilled, (state, action) => {
      state.stationFrequencyData = action.payload;
    });
    builder.addCase(fetchStationGeo.fulfilled, (state, action) => {
      const entries = action?.payload?.features.map(({ properties }) => {
        const obj = [properties.station_id, properties];
        return obj;
      });
      const map = Object.fromEntries(entries);
      state.stationInfo = map;
      state.stationGeo = action.payload;
    });
    builder.addCase(fetchLiveStatus.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLiveStatus.fulfilled, (state, action) => {
      const { payload } = action;
      const transformed = payload.data.stations.map((d) => {
        return [d.station_id, d];
      });
      const output = Object.fromEntries(transformed);
      state.stationStatusData = output;
    });
  },
});

export const selectCurrentStation = (state) => {
  return state.AppSlice?.selectedStationId;
};

export const selectShowInspector = (state) => {
  return state.AppSlice?.showInspector;
};

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

export const selectStationGeoJson = (state) => {
  return state.stationGeo;
};

export const selectStationGeo = (state) => {
  const id = state.AppSlice?.selectedStationId;
  if (!id) {
    return null;
  }
  return state?.AppSlice?.stationGeo[id];
};

export const selectStationInfo = (state) => {
  const id = state.AppSlice?.selectedStationId;
  if (!id || !state.AppSlice.stationInfo) {
    return null;
  }
  return state.AppSlice?.stationInfo[id];
};

export const selectLiveStatus = (state) => {
  const id = state.AppSlice?.selectedStationId;
  return state.AppSlice?.stationStatusData[id];
};

export const selectStationFavorited = (state) => {
  const id = state.AppSlice?.selectedStationId;
  const exists = state?.AppSlice?.stationFavorites?.findIndex((d) => d === id);
  return exists >= 0 ? true : false;
};

export const selectStationFavorites = (state) => {
  const ids = state.AppSlice?.stationFavorites;
  const info = {};
  ids?.forEach((d) => {
    info[d] = state.AppSlice.stationInfo[d];
  });

  return info;
};

// Action creators are generated for each case reducer function
export const {
  setMuted,
  setMenu,
  setShowInspector,
  setSelectedStationId,
  toggleStationFavorite,
} = appSlice.actions;

export default appSlice.reducer;
