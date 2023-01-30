import { createSlice } from "@reduxjs/toolkit";

export const appStore = createSlice({
	name: "appStore",
	initialState: {
		logged: null,
	},
	reducers: {
		setLogged: (state, action) => {
			state.logged = action.payload;
		},
	},
});

export const { setLogged } = appStore.actions;

export default appStore.reducer;
