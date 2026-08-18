import { createSlice } from "@reduxjs/toolkit";


const feedSlice = createSlice({
    name:"feed",
    initialState: null,
    reducers:{
        addfeed: (state,action) =>{
            return action.payload;
        },
        removeUserFromfeed : (state,action) => {
            return state.filter(user => user._id !== action.payload);
            
        }
    }
})

export const {addfeed , removeUserFromfeed} = feedSlice.actions;

export default feedSlice.reducer;