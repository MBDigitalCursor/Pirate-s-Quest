import React, { useContext, useEffect, useState } from "react";
import { Box, LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";
import MainContext from "../../context/MainContext.js";
import { setProgress } from "../../store/appStore.js";

function RankComp() {
	const { socket, dispatch } = useContext(MainContext);

	const { logged, progress, ranks } = useSelector((state) => state.appStore);

	useEffect(() => {
		if (logged) {
			const currentUserRank = logged.rank;
			const currentRankIndex = ranks.findIndex((rank) => rank.title === currentUserRank.rank);
			const nextRank = ranks[currentRankIndex + 1];
			const progressPercent = (currentUserRank.exp * 100) / nextRank.exp;
			dispatch(setProgress(progressPercent));
		}
	}, [socket, logged, dispatch, ranks]);

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
						Rank: {logged.rank.rank}
					</p>
					<Box
						sx={{
							width: "20rem",
							borderRadius: "10px",
							textAlign: "center",
							height: "12px",
							color: "transparent",
							"&:hover": {
								transition: "0.3s",
								color: "black",
							},
						}}
					>
						<LinearProgress
							color='warning'
							variant='determinate'
							value={progress}
							valueBuffer={progress}
							sx={{
								height: "12px",
								borderRadius: "10px",
								opacity: 0.6,
								"&:hover": {
									transition: "0.3s ease-in-out",
									opacity: 1,
								},
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
