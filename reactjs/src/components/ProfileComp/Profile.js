import { Box } from "@mui/material";
import React from "react";

function Profile() {
	return (
		<Box
			sx={{
				position: "absolute",
				width: "20rem",
				height: "4rem",
				padding: "0.5rem",
				boxSizing: "border-box",
				boxShadow: "3px 3px 10px 1px #3b3939ad",
				borderRadius: "4px",
				top: "10px",
				right: "5%",
			}}
		>
			Profile
		</Box>
	);
}

export default Profile;
