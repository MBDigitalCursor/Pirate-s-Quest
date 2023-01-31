import { createSlice } from "@reduxjs/toolkit";

export const appStore = createSlice({
	name: "appStore",
	initialState: {
		logged: null,
		mousePos: {},
	},
	reducers: {
		setLogged: (state, action) => {
			state.logged = action.payload;
		},
		setMousePos: (state, action) => {
			state.mousePos = action.payload;
		},
	},
});

export const { setLogged, setMousePos } = appStore.actions;

export default appStore.reducer;
