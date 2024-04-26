import {createSlice} from "@reduxjs/toolkit";
import {globalApi} from "../global.service";

export const globalSlice = createSlice({
    name: 'user',
    initialState: {
        user: false,
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            globalApi.endpoints.getProfile.matchFulfilled,
            (state, {payload}) => {
                state.user = payload
            },
        )

    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
    }
})

export const {setUser} = globalSlice.actions

export const selectGlobal = (state) => state.global;

export default globalSlice.reducer
