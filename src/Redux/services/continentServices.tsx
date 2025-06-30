import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";
import { Continent } from "../../components/continent/continentDetails";

export const continentApi = createApi({
  reducerPath: "continentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
  }),
  tagTypes : ["continentData"],
  endpoints: (builder) => ({
    getContinent: builder.query<Continent[], void>({
      query: () => "/populations",
      providesTags : ["continentData"]
    }),
    updateContinent: builder.mutation({
      query: ({ id, ...continent }) => ({
        url: `/populations/${id}`,
        method: "PUT",
        body: continent,
      }),
      invalidatesTags: ["continentData"]
    }),
  }),
});

export const { useGetContinentQuery, useUpdateContinentMutation } = continentApi;
