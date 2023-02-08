import { createSlice, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

export const appStore = createSlice(
	{
		name: "appStore",
		initialState: {
			logged: null,
			loginError: "",
			url: "http://localhost:5000",
			newUser: false,
			showUpgrades: false,
			progress: 0,
			showDrop: false,
			showLeaderboardTrigger: false,
			allUsers: [],
			sortedUsersArray: [],
			ranks: [
				{
					title: "Newbie",
					exp: 0,
				},
				{
					title: "Cooper",
					exp: 1000,
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
			goldDroppedArr: [],
		},
		reducers: {
			setLogged: (state, action) => {
				state.logged = action.payload;
			},
			setLoginError: (state, action) => {
				state.loginError = action.payload;
			},
			setNewUser: (state, action) => {
				state.newUser = action.payload;
			},
			setProgress: (state, action) => {
				const currentUserRank = state.logged.rank;
				const currentRankIndex = state.ranks.findIndex((rank) => rank.title === currentUserRank.rank);
				const nextRank = state.ranks[currentRankIndex + 1];
				const progressPercent = (currentUserRank.exp * 100) / nextRank.exp;
				state.progress = progressPercent;
			},
			setShowDrop: (state, action) => {
				state.showDrop = action.payload;
			},
			setShowUpgrades: (state, action) => {
				state.showUpgrades = action.payload;
			},
			setShowPoperTrigger: (state, action) => {
				state.showPoperTrigger = action.payload;
			},
			setShowLeaderboardTrigger: (state, action) => {
				state.showLeaderboardTrigger = action.payload;
			},
			setAllUsers: (state, action) => {
				state.allUsers = action.payload;
			},
			setSortedUsersArray: (state, action) => {
				state.sortedUsersArray = action.payload;
			},
			setGoldDroppedArr: (state, action) => {
				state.goldDroppedArr = [...state.goldDroppedArr, action.payload];
			},
			setNewGoldDroppedArr: (state, action) => {
				state.goldDroppedArr = action.payload;
			},
		},
	},
	applyMiddleware(thunk)
);

export const { setLogged, setLoginError, setNewUser, setProgress, setShowDrop, setShowUpgrades, setShowLeaderboardTrigger, setAllUsers, setSortedUsersArray, setGoldDroppedArr, setNewGoldDroppedArr } = appStore.actions;

export default appStore.reducer;
