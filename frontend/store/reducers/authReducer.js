import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUser } from "../api's/userApi";

export const createUserAsync = createAsyncThunk(
    "user/created",
    async (data) =>{
        const response = await createUser(data);
        return response.data
    }
)
export const authReducer = createSlice({
    name: "user",
    initialState: {
        loggedInUser: null,
        status: "idle"
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(createUserAsync.fulfilled, (state,action)=>{
            // state.loggedInUser = action.payload
            state.loggedInUser = action.payload
        })
    }
})

export default authReducer.reducer