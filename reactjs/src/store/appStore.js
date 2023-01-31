import { createSlice } from "@reduxjs/toolkit";

export const appStore = createSlice({
	name: "appStore",
	initialState: {
		logged: null,
		loginError: "",
	},
	reducers: {
		setLogged: (state, action) => {
			state.logged = action.payload;
		},
		setLoginError: (state, action) => {
			state.loginError = action.payload;
		},
	},
});

export const { setLogged, setLoginError } = appStore.actions;

export default appStore.reducer;
