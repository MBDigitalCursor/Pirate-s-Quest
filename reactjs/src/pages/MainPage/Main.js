import { Box, Stack } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GameWindow from "../../components/GameWindow/GameWindow";
import Leadersboard from "../../components/LeadersBoard/Leadersboard";
import Profile from "../../components/ProfileComp/Profile";
import RankComp from "../../components/RankComp/RankComp";
import UpgradesWindow from "../../components/UpgradesComp/UpgradesWindow";
import MainContext from "../../context/MainContext";
import { toast } from "react-toastify";
import "../MainPage/mainPage.css";
import { setAllUsers, setSortedUsersArray } from "../../store/appStore";

function Main() {
	const { mousePos, logged, showDrop, showUpgrades, allUsers } = useSelector((state) => state.appStore);

	const { dispatch, socket } = useContext(MainContext);

	useEffect(() => {
		socket.on("goldError", (mess) => {
			toast("💰 " + mess);
		});
		socket.on("maxLevel", (mess) => {
			toast("⚠️ " + mess);
		});
		socket.emit("getAllUsers");
		socket.on("getAllUsers", (users) => {
			dispatch(setAllUsers(users));
		});
	}, []);

	useEffect(() => {
		if (allUsers.length !== 0) {
			const sortedUser = () => {
				return allUsers
					.map((user) => {
						return {
							nick: user.nick,
							exp: user.rank.exp,
						};
					})
					.sort((a, b) => b.exp - a.exp);
			};
			const users = sortedUser();
			dispatch(setSortedUsersArray(users));
		}
	}, [allUsers]);

	return (
		<div
			className="main-page text-focus-in"
			style={{
				position: "relative",
				display: "flex",
				justifyContent: "center",
				paddingTop: "10rem",
			}}
		>
			{showDrop ? (
				<p
					className={`${showDrop ? "scale-out-top" : ""}`}
					style={{
						position: "absolute",
						top: `${mousePos.y - 80}px`,
						left: mousePos.x,
						fontSize: "2rem",
						zIndex: 10,
						fontWeight: "bold",
						color: "#621708",
					}}
				>
					{(logged.upgrades[0].level / 10 + 1).toFixed(1)}
				</p>
			) : (
				<p
					className={`${showDrop ? "" : "scale-out-bottom"}`}
					style={{
						position: "absolute",
						top: `${mousePos.y - 80}px`,
						left: mousePos.x,
						fontSize: "2rem",
						zIndex: 10,
						fontWeight: "bold",
						color: "#621708",
					}}
				>
					{logged && (logged.upgrades[0].level / 10 + 1).toFixed(1)}
				</p>
			)}
			<Stack
				direction="row"
				spacing={6}
			>
				{showUpgrades && <UpgradesWindow />}
				<GameWindow />
				<Leadersboard />
			</Stack>
			<RankComp />
			<Profile />
		</div>
	);
}

export default Main;
