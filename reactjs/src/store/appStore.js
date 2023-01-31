import { createSlice } from "@reduxjs/toolkit";

export const appStore = createSlice({
	name: "appStore",
	initialState: {
		logged: null,
		mousePos: {},
		loginError: "",
		url: "http://localhost:5000",
		newUser: false,
		progress: 0,
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
		setNewUser: (state, action) => {
			state.newUser = action.payload;
		},
		setProgress: (state, action) => {
			state.progress = action.payload;
		},
	},
});

export const { setLogged, setMousePos, setLoginError, setNewUser, setProgress } = appStore.actions;

export default appStore.reducer;
