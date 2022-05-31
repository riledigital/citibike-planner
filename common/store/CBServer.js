// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const cbserverApi = createApi({
  reducerPath: "cbserverApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API }),
  endpoints: (builder) => ({
    getLiveData: builder.query({
      query: () => ({
        url: `https://gbfs.citibikenyc.com/gbfs/en/station_status.json`,
      }),
      transformResponse: (response, meta, arg) => {
        const transformed = response.data.stations.map((d) => {
          return [d.station_id, d];
        });
        const output = Object.fromEntries(transformed);

        return output;
      },
    }),
    getHourlySummary: builder.query({
      query: (short_name) => ({
        url: `hourly`,
        params: { short_name },
      }),
      transformResponse: (response, meta, arg) => response.data,
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetLiveDataQuery, useGetHourlySummaryQuery } = cbserverApi;
