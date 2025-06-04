import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Get initial state from localStorage if available
const initialState = {
  signupData: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignupData: (state, action) => {
      state.signupData = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      // Persist token to localStorage
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      console.log("Setting user in Redux:", action.payload);
      state.user = action.payload;
      // Persist user to localStorage
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.signupData = null;
      // Clear localStorage on logout
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { setSignupData, setToken, setLoading, setUser, logout } = authSlice.actions;

export default authSlice.reducer;
