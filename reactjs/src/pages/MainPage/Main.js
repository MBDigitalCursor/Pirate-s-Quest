import { Box, Stack } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GameWindow from "../../components/GameWindow/GameWindow";
import Leadersboard from "../../components/LeadersBoard/Leadersboard";
import Profile from "../../components/ProfileComp/Profile";
import RankComp from "../../components/RankComp/RankComp";
import UpgradesWindow from "../../components/UpgradesComp/UpgradesWindow";
import MainContext from "../../context/MainContext";
import "../MainPage/mainPage.css";

function Main() {
	const { mousePos, logged } = useSelector((state) => state.appStore);

	const { dispatch, socket } = useContext(MainContext);

	const [showDrop, setShowDrop] = useState(false);

	return (
		<div
			className='main-page text-focus-in'
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
					{(logged.upgrades.dropPerClickLevel / 10 + 1).toFixed(1)}
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
					{logged && (logged.upgrades.dropPerClickLevel / 10 + 1).toFixed(1)}
				</p>
			)}
			<Stack
				direction='row'
				spacing={6}
			>
				<UpgradesWindow></UpgradesWindow>
				<GameWindow
					setShowDrop={setShowDrop}
					showDrop={showDrop}
				></GameWindow>
				<Leadersboard></Leadersboard>
			</Stack>
			<RankComp></RankComp>
			<Profile></Profile>
		</div>
	);
}

export default Main;
