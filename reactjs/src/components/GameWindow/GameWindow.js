import { Box } from "@mui/material";
import React, { useContext, useEffect } from "react";
import "../GameWindow/gameWindow.css";
import { useSelector } from "react-redux";
import MainContext from "../../context/MainContext";
import { handleDropThunk } from "../../utils/thunkCreators";
import { Stack } from "@mui/system";
import { setNewGoldDroppedArr } from "../../store/appStore";

function GameWindow() {
	const { dispatch } = useContext(MainContext);

	const { logged, goldDroppedArr } = useSelector((state) => state.appStore);

	useEffect(() => {
		if (goldDroppedArr.length > 0) {
			const intervalId = setInterval(() => {
				const array = goldDroppedArr;
				const arrayv2 = array.slice(1);
				dispatch(setNewGoldDroppedArr(arrayv2));
			}, 200);
			return () => {
				clearInterval(intervalId);
			};
		}
	}, [goldDroppedArr]);

	const handleDrop = () => {
		dispatch(handleDropThunk({ id: logged.id }));
	};

	return (
		<Box
			sx={{
				boxShadow: "3px 3px 10px 1px #3b3939ad",
				borderRadius: "4px",
				padding: "6rem 8rem",
				boxSizing: "border-box",
				position: "relative",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				backdropFilter: "blur(4px)",
			}}
		>
			<Box
				sx={{
					position: "absolute",
					top: "2%",
					right: "5%",
				}}
			>
				<p
					style={{
						paddingTop: "0.3rem",
					}}
				>
					{logged && logged.gold.toFixed(1)}
					<b> 💰</b>
				</p>
				<Box
					// className="scale-out-top"
					style={{
						fontSize: "2rem",
						zIndex: 10,
						fontWeight: "bold",
						color: "#621708",
					}}
				>
					<Stack>
						{goldDroppedArr.map((gold, i) => (
							<span
								className={i === 0 ? "text-blur-scale" : "text-blur"}
								key={i}
							>
								{gold}
							</span>
						))}
					</Stack>
				</Box>
			</Box>
			<img
				onClick={(e) => {
					handleDrop(e);
				}}
				className="clickable-object"
				src="https://cdn-icons-png.flaticon.com/512/2826/2826202.png"
				alt=""
			/>
		</Box>
	);
}

export default GameWindow;
