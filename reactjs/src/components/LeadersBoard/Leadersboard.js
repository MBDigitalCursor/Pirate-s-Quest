import { Box } from "@mui/material";
import React, { useContext, useEffect } from "react";
import MainContext from "../../context/MainContext";

function Leadersboard() {
	const { socket } = useContext(MainContext);

	return (
		<Box
			sx={{
				padding: "0.5rem",
				boxSizing: "border-box",
				boxShadow: "3px 3px 10px 1px #3b3939ad",
				borderRadius: "4px",
				backdropFilter: "blur(4px)",
			}}
		>
			Leadersboard
		</Box>
	);
}

export default Leadersboard;
