import React, { useState } from "react";
import { Box, LinearProgress } from "@mui/material";

function RankComp() {
	const [progress, setProgress] = useState(0);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				position: "absolute",
				top: "3rem",
			}}
		>
			<p>RANK</p>
			<Box
				sx={{
					width: "20rem",
					border: "1px solid blue",
					borderRadius: "10px",
					textAlign: "center",
					height: "10px",
					color: "transparent",
					"&:hover": {
						cursor: "pointer",
						transition: "0.3s ease-in-out",
						color: "black",
					},
				}}
			>
				<LinearProgress
					sx={{
						height: "10px",
					}}
					variant='determinate'
					value={progress}
				/>
				20
			</Box>
		</div>
	);
}

export default RankComp;
