import { createSlice } from "@reduxjs/toolkit";

export const appStore = createSlice({
	name: "appStore",
	initialState: {
		logged: null,
		mousePos: {},
		loginError: "",
		url: "http://localhost:5000",
		newUser: false,
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
	},
});

export const { setLogged, setMousePos, setLoginError, setNewUser } = appStore.actions;

export default appStore.reducer;
