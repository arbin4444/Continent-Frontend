import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";
import {Continent} from "../../components/continent/continentDetails"
export const continentApi = createApi({
    reducerPath : "continentApi",
    baseQuery : fetchBaseQuery ({
        baseUrl : "http://localhost:5000/api",
    }),
    endpoints : (builder) =>({
        getContinent : builder.query<Continent[],void>({
            query : ()=> "/populations"
        }), 
    }),
})

export const {useGetContinentQuery} = continentApi;