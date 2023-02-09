import { Stack } from "@mui/system";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import GameWindow from "../../components/GameWindow/GameWindow";
import Inventory from "../../components/Inventory/Inventory";
import Leadersboard from "../../components/LeadersBoard/Leadersboard";
import Navigation from "../../components/Navigation/Navigation";
import Profile from "../../components/ProfileComp/Profile";
import RankComp from "../../components/RankComp/RankComp";
import UpgradesWindow from "../../components/UpgradesComp/UpgradesWindow";
import "../MainPage/mainPage.css";

function Main() {
	const { showUpgrades } = useSelector((state) => state.appStore);

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
			<Navigation />
			<RankComp />
			<Profile />
			<Inventory></Inventory>
		</div>
	);
}

export default Main;
