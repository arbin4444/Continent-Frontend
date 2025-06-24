import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Continent} from "../../components/continent/continentDetails"

interface SelectedContinent {
    data: Continent | null;
}

const initialState: SelectedContinent ={
    data : null
}

export const selectedContinentSlice = createSlice ({
    name : "selectedContinent",
    initialState,
    reducers: {
        setSelectedContinent :(state, action: PayloadAction<Continent>)=>{
            state.data = action.payload;
        },
        clearSelectedContinent : (state)=>{
            state.data = null;
        }
    }
})

export const {setSelectedContinent, clearSelectedContinent} = selectedContinentSlice.actions;
export default selectedContinentSlice.reducer;