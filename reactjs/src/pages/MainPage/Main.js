import { Stack } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import GameWindow from "../../components/GameWindow/GameWindow";
import Leadersboard from "../../components/LeadersBoard/Leadersboard";
import Profile from "../../components/ProfileComp/Profile";
import RankComp from "../../components/RankComp/RankComp";
import UpgradesWindow from "../../components/UpgradesComp/UpgradesWindow";
import "../MainPage/mainPage.css";

function Main() {
	const { mousePos, showDrop, showUpgrades, goldDropped } = useSelector((state) => state.appStore);

	console.log(goldDropped);

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
				{goldDropped}
			</p>

			<Stack
				direction='row'
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
