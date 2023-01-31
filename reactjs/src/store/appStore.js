import { createSlice } from "@reduxjs/toolkit";

export const appStore = createSlice({
	name: "appStore",
	initialState: {
		logged: null,
		mousePos: {},
		loginError: "",
	},
	reducers: {
		setLogged: (state, action) => {
			state.logged = action.payload;
		},

		setMousePos: (state, action) => {
			state.mousePos = action.payload;
		},
		setLoginError: (state, action) => {
			state.loginError = action.payload;
		},
	},
});

export const { setLogged, setMousePos, setLoginError } = appStore.actions;

export default appStore.reducer;
