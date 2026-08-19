import { createSlice } from "@reduxjs/toolkit";


const feedSlice = createSlice({
    name:"feed",
    initialState: null,
    reducers:{
        addfeed: (state,action) =>{
            return action.payload;
        },
        addMoreFeed: (state, action) => {
            return [...state, ...action.payload];
        },
        removeUserFromfeed : (state,action) => {
            return state.filter(user => user._id !== action.payload);
            
        }
    }
})

export const {addfeed , addMoreFeed,removeUserFromfeed} = feedSlice.actions;

export default feedSlice.reducer;