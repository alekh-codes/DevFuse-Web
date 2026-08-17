import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name:"requests",
    initialState:null,
    reducers:{
        addRequests: (state,action) => action.payload,
    },
})

const {addRequests} = requestSlice.actions;

export default requestSlice.reducer;