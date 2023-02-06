import { Box } from "@mui/material";
import React, { useContext } from "react";
import "../GameWindow/gameWindow.css";
import { useSelector } from "react-redux";
import { setMousePos } from "../../store/appStore";
import MainContext from "../../context/MainContext";
import { handleDropThunk } from "../../utils/thunkCreators";

function GameWindow() {
	const { dispatch } = useContext(MainContext);

	const { logged } = useSelector((state) => state.appStore);

	const handleClick = (e) => {
		if (!e.target) dispatch(setMousePos({}));
		const handleMouseMove = (event) => {
			dispatch(setMousePos({ x: event.clientX, y: event.clientY }));
		};
		e.target.addEventListener("click", handleMouseMove);
	};

	const handleDrop = (e) => {
		dispatch(handleDropThunk({ id: logged.id }));
		handleClick(e);
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
			<p
				style={{
					position: "absolute",
					top: "2%",
					right: "5%",
					paddingTop: "0.3rem",
				}}
			>
				{logged && logged.gold.toFixed(1)}
				<b> 💰</b>
			</p>
			<img
				onClick={(e) => handleDrop(e)}
				className='clickable-object'
				src='https://cdn-icons-png.flaticon.com/512/2826/2826202.png'
				alt=''
			/>
		</Box>
	);
}

export default GameWindow;
