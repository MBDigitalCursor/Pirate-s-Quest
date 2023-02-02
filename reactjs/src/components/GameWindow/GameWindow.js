import { Box, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import "../GameWindow/gameWindow.css";
import { useSelector } from "react-redux";
import { setLogged, setMousePos, setProgress, setShowDrop, setShowUpgrades } from "../../store/appStore";
import MainContext from "../../context/MainContext";
import { toast } from "react-toastify";

function GameWindow() {
	const { dispatch, socket } = useContext(MainContext);

	const [shakeTo, setShakeTo] = useState("left");

	const { logged, showDrop, showUpgrades } = useSelector((state) => state.appStore);

	const addGold = () => {
		socket.emit("addGold", logged.id);
	};

	const handleClick = (e) => {
		if (!e.target) dispatch(setMousePos({}));
		const handleMouseMove = (event) => {
			dispatch(setMousePos({ x: event.clientX, y: event.clientY }));
		};
		e.target.addEventListener("click", handleMouseMove);
	};

	const handleTimeout = () => {
		if (showDrop) {
			const timer = setTimeout(() => dispatch(setShowDrop(false)), 100);
			return () => clearTimeout(timer);
		}
	};

	const handleShake = () => {
		dispatch(setShowDrop(true));
		if (shakeTo === "left") setShakeTo("right");
		if (shakeTo === "right") setShakeTo("left");
	};

	useEffect(() => {
		socket.on("updatedUser", (user) => {
			dispatch(setLogged(user));
			dispatch(setProgress(user.rank.exp));
		});
	}, [socket]);

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
				<b>Gold:</b> {logged && logged.gold.toFixed(1)}
			</p>
			{shakeTo === "left" ? (
				<img
					onClick={(e) => {
						handleTimeout();
						handleShake();
						handleClick(e);
						addGold();
					}}
					className='clickable-object'
					src='https://cdn-icons-png.flaticon.com/512/2826/2826202.png'
					alt=''
				/>
			) : (
				<img
					onClick={(e) => {
						handleTimeout();
						handleShake();
						handleClick(e);
						addGold();
					}}
					className='clickable-object'
					src='https://cdn-icons-png.flaticon.com/512/2826/2826202.png'
					alt=''
				/>
			)}
		</Box>
	);
}

export default GameWindow;
