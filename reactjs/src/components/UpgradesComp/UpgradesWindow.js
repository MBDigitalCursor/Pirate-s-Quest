import { Button, Popover, Popper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import MainContext from "../../context/MainContext";

function UpgradesWindow() {
	const { dispatch, socket } = useContext(MainContext);

	const { logged } = useSelector((state) => state.appStore);

	const upgrade = (upgrade) => {
		const data = {
			userId: logged.id,
			upgrade: 
		};
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popper" : undefined;

	return (
		<div
			style={{
				height: "600px",
				padding: "10px 5px",
				boxSizing: "border-box",
				boxShadow: "3px 3px 10px 1px #3b3939ad",
				borderRadius: "4px",
				width: "18rem",
				backdropFilter: "blur(4px)",
			}}
		>
			<h1>Upgrades</h1>
		</div>
	);
}

export default UpgradesWindow;
