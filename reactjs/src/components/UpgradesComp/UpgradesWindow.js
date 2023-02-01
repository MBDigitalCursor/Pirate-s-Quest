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
				height: "610px",
				padding: "5px 5px",
				boxSizing: "border-box",
				boxShadow: "3px 3px 10px 1px #3b3939ad",
				borderRadius: "4px",
				width: "18rem",
				backdropFilter: "blur(4px)",
			}}
		>
			<h1>Upgrades</h1>

			<Box
				sx={{
					height: "50px",
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
