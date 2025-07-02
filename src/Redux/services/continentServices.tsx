import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";
import { Continent } from "../../components/continent/continentDetails";

interface AddContinentType {
  continentName : string
  totalPopulation : number
  area : number
  populationDensity : number
  numberOfCountries : number
}

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
    deleteContinent : builder.mutation({
      query:(id)=>({
        url : `/populations/${id}`,
        method : "DELETE"
      }),
      invalidatesTags:["continentData"]
    }),
    addContinent: builder.mutation<void, AddContinentType >({
      query : (body)=>({
        url : "/populations",
        method :"POST",
        body : body,
      }),
      invalidatesTags:["continentData"]
    })
  }),
});

export const { useGetContinentQuery, useUpdateContinentMutation, useDeleteContinentMutation, useAddContinentMutation} = continentApi;
