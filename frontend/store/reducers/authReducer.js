import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkuser, createUser, loginUser } from "../api's/userApi";

export const createUserAsync = createAsyncThunk(
    "user/created",
    async (data) =>{
        const response = await createUser(data);
        return response.data
    }
)

export const loginUserAsync = createAsyncThunk(
    "user/login",
    async (data) =>{
        const response = await loginUser(data)
        return response.data
    }
)

export const checkUserAsync = createAsyncThunk(
    "user/checkuser",
    async (userdata) =>{
        const res = await checkuser(userdata)
        return res.data
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
        builder.addCase(loginUserAsync.fulfilled, (state,action)=>{
            state.loggedInUser = action.payload
        })
        builder.addCase(checkUserAsync.fulfilled, (state,action)=>{
            state.loggedInUser = action.payload
        })
    }
})

export default authReducer.reducer