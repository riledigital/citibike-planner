import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { fetchMsgPackBlob } from "../Data/MsgPack";

const STATION_INFO = "/data/stations-with-nta.geojson";
const DATA_SUMMARY = "/data/hourly_breakdown.msgpack";
const LIVE_STATUS = "https://gbfs.citibikenyc.com/gbfs/en/station_status.json";

export const fetchFrequencyAnalysis = createAsyncThunk(
  "app/fetchFrequencyAnalysis",
  async () => {
    // const response = await axios.get(DATA_SUMMARY);
    // // response.data.features.map(d=> d.properties.)
    // return response.data;
    const data = await fetchMsgPackBlob(DATA_SUMMARY);
    return data;
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
  isLoading: false,
  isMuted: true,
  lastUpdated: null,
  rankingData: null,
  selectedStation: null,
  selectedStationId: null,
  showInspector: false,
  showMenu: false,
  stationFavorites: [],
  stationFrequencyData: null,
  stationGeo: null,
  stationStatusData: {},
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
      const currentStation = state.stationGeo.features.find(
        ({ properties: { short_name: sn } }) => sn === short_name
      );
      state.selectedStation = currentStation;
      // state.selectedStationId = state.selectedStation.station_id;
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

export const selectCurrentStationData = (state) => {
  return state.AppSlice.selectedStation;
};

export const selectCurrentStation = (state) => {
  return state.AppSlice?.selectedStation?.properties?.station_id;
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
export const selectAllStationFrequencyData = (state) => {
  return state?.AppSlice?.stationFrequencyData;
};

export const selectStationGeoJson = (state) => {
  return state.stationGeo;
};

export const selectStationGeo = (state) => {
  return state.AppSlice.selectedStation;
};

export const selectStationInfo = (state) => {
  const id = state.AppSlice?.selectedStationId;
  if (!id || !state.AppSlice.stationInfo) {
    return null;
  }
  return state.AppSlice?.stationInfo[id];
};

export const selectAllStationInfo = (state) => {
  return state.AppSlice.stationInfo;
};

export const selectAllLiveStatus = (state) => {
  return state.AppSlice.stationStatusData;
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
  setSelectedShortName,
  setSelectedStationId,
  toggleStationFavorite,
} = appSlice.actions;

export default appSlice.reducer;
