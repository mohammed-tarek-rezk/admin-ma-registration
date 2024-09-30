import { createSlice } from "@reduxjs/toolkit";




let moderatorSlice = createSlice({
    name: "moderatorSlice",
    initialState: {},
    reducers: {
        setUser: (state, action) => {

            return action.payload
        },
        clearUser: () => {
            return {}
        }
    }
})


export const { setUser, clearUser } = moderatorSlice.actions;

export default moderatorSlice.reducer;