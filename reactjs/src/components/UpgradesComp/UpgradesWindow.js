import { Box } from "@mui/system";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import MainContext from "../../context/MainContext";
import UpgradeCard from "./UpgradeCard";

function UpgradesWindow() {
	const { dispatch, socket } = useContext(MainContext);

	const { logged } = useSelector((state) => state.appStore);

	return (
		<div
			style={{
				padding: "5px 5px",
				boxSizing: "border-box",
				boxShadow: "3px 3px 10px 1px #3b3939ad",
				borderRadius: "4px",
				width: "20rem",
				backdropFilter: "blur(4px)",
			}}
		>
			<h2>Upgrades</h2>

			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
				}}
			>
				{logged &&
					logged.upgrades.map((singleUpg, i) => (
						<UpgradeCard
							idx={i}
							key={i}
							singleUpg={singleUpg}
						/>
					))}
			</Box>
		</div>
	);
}

export default UpgradesWindow;
