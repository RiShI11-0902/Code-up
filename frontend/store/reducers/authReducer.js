import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkUser, createUser, loginUser, logout } from "../api's/userApi";

export const createUserAsync = createAsyncThunk(
  "user/created",
  async (data) => {
    const response = await createUser(data);
    if (response.data) {
      return response.data;
    }
    return response;
  }
);

export const loginUserAsync = createAsyncThunk("user/login", async (data) => {
  const response = await loginUser(data);
  console.log(response);
  if (response.data) {
    return response.data;
  }
  return response;
});

export const logoutUserAsync = createAsyncThunk("user/logout", async (data) => {
  const response = await logout(data);
  // return response.data
  console.log(response);
});

export const checkUserAsync = createAsyncThunk("user/checkuser", async (id) => {
  const response = await checkUser(id);
  return response;
});

export const authReducer = createSlice({
  name: "user",
  initialState: {
    loggedInUser: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  _extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.fulfilled, (state, action) => {
        // state.loggedInUser = action.payload
        // state.loggedInUser = action.payload;
        console.log(action.payload);
        if (action.payload.id) {
          state.loggedInUser = action.payload;
        } else {
          state.error = action.payload;
        }
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        if (action.payload.id) {
          state.loggedInUser = action.payload;
          localStorage.setItem("user", action.payload.id );
        } else {
          state.error = action.payload;
        }
        console.log();
      })
      .addCase(logoutUserAsync.fulfilled, (state, action) => {
        state.loggedInUser = null;
        localStorage.removeItem('user')
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
      });
  },
  get extraReducers() {
    return this._extraReducers;
  },
  set extraReducers(value) {
    this._extraReducers = value;
  },
});

export default authReducer.reducer;
