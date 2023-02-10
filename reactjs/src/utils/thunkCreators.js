import axios from "axios";
import { toast } from "react-toastify";
import { setAllUsers, setLogged, setLogs, setProgress, updateInventory } from "../store/appStore";
import { format } from "date-fns";

const url = "http://localhost:5000";

export const handleGoldDropThunk = (id) => (dispatch) => {
	const timeNow = new Date().getTime();
	const formatedDate = format(timeNow, "yyyy/MM/d HH:mm:ss");
	axios
		.post(`${url}/calcGold`, id)
		.then((res) => {
			const data = res.data.data;
			const goldDrop = data.goldReceived.toFixed(1);
			dispatch(setLogged(data.user));
			dispatch(setProgress());
			dispatch(setLogs(`${formatedDate} => You got ${goldDrop} gold`));
		})
		.catch((err) => console.log(err));
};

export const handleChestDropThunk = (id) => (dispatch) => {
	const timeNow = new Date().getTime();
	const formatedDate = format(timeNow, "yyyy/MM/d HH:mm:ss");
	axios
		.post(`${url}/calcDrop`, id)
		.then((res) => {
			const loot = res.data.loot;
			if (loot !== null) {
				dispatch(updateInventory(loot));
				dispatch(setLogs(`${formatedDate} => You got ${loot[0].rarity} ${loot[0].title} x${loot.length} , gratz`));
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

export const openChestThunk = (id, chest) => (dispatch) => {
	const timeNow = new Date().getTime();
	const formatedDate = format(timeNow, "yyyy/MM/d HH:mm:ss");
	const data = {
		id,
		chest,
	};
	// TODO
	axios.post(`${url}/chestOpen`, data).then((res) => {
		const message = res.data.message;
		// const user = res.data.data;
		dispatch(setLogs(`${formatedDate} => ${message}`));
	});
};
