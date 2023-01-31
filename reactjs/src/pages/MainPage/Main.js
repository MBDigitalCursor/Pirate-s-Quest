import React from "react";
import { useSelector } from "react-redux";
import GameWindow from "../../components/GameWindow/GameWindow";
import Leadersboard from "../../components/LeadersBoard/Leadersboard";
import Profile from "../../components/ProfileComp/Profile";
import RankComp from "../../components/RankComp/RankComp";
import UpgradesWindow from "../../components/UpgradesComp/UpgradesWindow";

function Main() {
	const { mousePos } = useSelector((state) => state.appStore);

	return (
		<div
			style={{
				position: "relative",
				display: "flex",
				justifyContent: "center",
				paddingTop: "5rem",
			}}
		>
			<p
				style={{
					position: "absolute",
					top: `${mousePos.y - 50}px`,
					left: mousePos.x,
					fontSize: "2rem",
					zIndex: 10,
					fontWeight: "bold",
					color: "#621708",
				}}
			>
				1
			</p>
			<UpgradesWindow></UpgradesWindow>
			<RankComp></RankComp>
			<Profile></Profile>
			<GameWindow></GameWindow>
			<Leadersboard></Leadersboard>
		</div>
	);
}

export default Main;
