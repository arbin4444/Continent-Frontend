import { configureStore } from "@reduxjs/toolkit";
import {continentApi} from "./services/continentServices"

export const Store = configureStore({
    reducer : {
        [continentApi.reducerPath] : continentApi.reducer,   
    },
    middleware : (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(continentApi.middleware),
})