import { createSlice } from "@reduxjs/toolkit";

export const appStore = createSlice({
	name: "appStore",
	initialState: {
		logged: null,
		mousePos: {},
		loginError: "",
		url: "http://localhost:5000",
		newUser: false,
		showUpgrades: false,
		progress: 0,
		showDrop: false,
		ranks: [
			{
				title: "Cooper",
				exp: 350,
			},
			{
				title: "Striker",
				exp: 5000,
			},
			{
				title: "Gunner",
				exp: 12000,
			},
			{
				title: "Navigator",
				exp: 20000,
			},
			{
				title: "Captain",
				exp: 35000,
			},
			{
				title: "Jack Sparrow",
				exp: 50000,
			},
		],
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
		setShowDrop: (state, action) => {
			state.showDrop = action.payload;
		},
		setShowUpgrades: (state, action) => {
			state.showUpgrades = action.payload;
		},
	},
});

export const { setLogged, setMousePos, setLoginError, setNewUser, setProgress, setShowDrop, setShowUpgrades } = appStore.actions;

export default appStore.reducer;
