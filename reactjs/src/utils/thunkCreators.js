import axios from "axios";
import { toast } from "react-toastify";
import { setAllUsers, setGoldDropped, setGoldDroppedArr, setLogged, setProgress, updateInventory } from "../store/appStore";

const url = "http://localhost:5000";

export const handleGoldDropThunk = (id) => (dispatch) => {
	axios
		.post(`${url}/calcGold`, id)
		.then((res) => {
			const data = res.data.data;
			dispatch(setLogged(data.user));
			dispatch(setProgress());
			dispatch(setGoldDroppedArr(data.goldReceived.toFixed(1)));
		})
		.catch((err) => console.log(err));
};

export const handleChestDropThunk = (id) => (dispatch) => {
	axios
		.post(`${url}/calcDrop`, id)
		.then((res) => {
			const loot = res.data.loot;
			if (loot !== null) {
				dispatch(updateInventory(loot));
			}
		})
		.catch((err) => console.log(err));
};

export const userLoggedThunk = (id) => (dispatch) => {
	axios.post(`${url}/userLogged`, { id }).then((res) => {
		const data = res.data.data;
		dispatch(setLogged(data));
	});
};

export const getUsersThunk = () => (dispatch) => {
	axios.get(`${url}/allUsers`).then((res) => {
		const data = res.data.data;
		const sortedUser = () => {
			return data
				.map((user) => {
					return {
						nick: user.nick,
						exp: user.rank.exp,
					};
				})
				.sort((a, b) => b.exp - a.exp);
		};
		const users = sortedUser();
		dispatch(setAllUsers(users));
	});
};

export const handleUpgradeThunk = (data) => (dispatch) => {
	axios.post(`${url}/upgrade`, data).then((res) => {
		const dataFromBE = res.data;
		if (dataFromBE.error) {
			return toast(dataFromBE.message);
		}
		dispatch(setLogged(dataFromBE.data));
	});
};
