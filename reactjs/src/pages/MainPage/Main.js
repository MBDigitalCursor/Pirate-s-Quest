import { Stack } from "@mui/system";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import GameWindow from "../../components/GameWindow/GameWindow";
import Leadersboard from "../../components/LeadersBoard/Leadersboard";
import Profile from "../../components/ProfileComp/Profile";
import RankComp from "../../components/RankComp/RankComp";
import UpgradesWindow from "../../components/UpgradesComp/UpgradesWindow";
import "../MainPage/mainPage.css";

function Main() {
	const { mousePos, showDrop, showUpgrades, goldDropped } = useSelector((state) => state.appStore);

	useEffect(() => {
		console.log(goldDropped);
	}, []);

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
