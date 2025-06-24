import { configureStore } from "@reduxjs/toolkit";
import {continentApi} from "./services/continentServices"
import selectedContinentReducer from "./slices/continentSlice"

export const Store = configureStore({
    reducer : {
        selectedContinent : selectedContinentReducer,
        [continentApi.reducerPath] : continentApi.reducer,   
    },
    middleware : (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(continentApi.middleware),
})

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;