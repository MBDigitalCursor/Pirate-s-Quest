import React, { useContext, useEffect, useState } from "react";
import { Box, LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";
import MainContext from "../../context/MainContext.js";
import { setProgress } from "../../store/appStore.js";

function RankComp() {
	const { socket, dispatch } = useContext(MainContext);

	// console.log("3243 * 100 / 5000", (3243 * 100) / 5000);

	const { logged, progress, ranks } = useSelector((state) => state.appStore);

	useEffect(() => {
		const checkProgress = () => {
			console.log("logged ===", logged);
			const currentRankTitle = logged.rank.rank;
			const currentRankExp = logged.rank.exp;
			let lastRank = "";
			ranks.map((rank) => {
				const el = rank.exp > currentRankExp;
				console.log("rank.exp ===", rank);
				return (lastRank = rank.exp);
			});
			console.log("lastRank ===", lastRank);
		};

		checkProgress();
	}, [socket, logged]);

	return (
		<div
			style={{
				position: "absolute",
				top: "3rem",
			}}
		>
			{logged && (
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<p
						style={{
							paddingBottom: "0.6rem",
							fontSize: "1.5rem",
							fontWeight: "500",
							letterSpacing: "1px",
							textShadow: "0 6px 18px rgba(30, 90, 10, 1.85)",
						}}
					>
						{logged.rank.rank}
					</p>
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
							variant='determinate'
							value={progress}
							sx={{
								height: "10px",
							}}
						/>
						{logged.rank.exp}
					</Box>
				</div>
			)}
		</div>
	);
}

export default RankComp;
