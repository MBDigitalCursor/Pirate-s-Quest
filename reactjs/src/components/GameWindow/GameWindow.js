import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../GameWindow/gameWindow.css";
import { useDispatch, useSelector } from "react-redux";
import { setMousePos } from "../../store/appStore";

function GameWindow({ setShowDrop, showDrop }) {
	const [shakeTo, setShakeTo] = useState("left");

	const { logged } = useSelector((state) => state.appStore);

	const dispatch = useDispatch();

	const addGold = () => {
		const uObj = {
			id: logged.id,
		};
	};

	const handleClick = (e) => {
		console.log("logged ===", logged);
		if (!e.target) dispatch(setMousePos({}));
		const handleMouseMove = (event) => {
			dispatch(setMousePos({ x: event.clientX, y: event.clientY }));
		};
		e.target.addEventListener("click", handleMouseMove);
	};

	const handleTimeout = () => {
		if (showDrop) {
			const timer = setTimeout(() => setShowDrop(false), 100);
			return () => clearTimeout(timer);
		}
	};

	const handleShake = () => {
		setShowDrop(true);
		if (shakeTo === "left") setShakeTo("right");
		if (shakeTo === "right") setShakeTo("left");
	};

	return (
		<Box
			sx={{
				width: "900px",
				height: "600px",
				boxShadow: "3px 3px 10px 1px #3b3939ad",
				borderRadius: "4px",
				padding: "20px",
				boxSizing: "border-box",
				position: "relative",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<p
				style={{
					position: "absolute",
					top: "2%",
					right: "5%",
				}}
			>
				<b>Gold:</b> {logged.gold}
			</p>

			<Button
				color="gold"
				variant="contained"
				sx={{
					marginRight: "0.3rem",
					position: "absolute",
					top: "2%",
					left: "5%",
				}}
			>
				Upgrades
			</Button>

			{shakeTo === "left" ? (
				<img
					onClick={(e) => {
						handleTimeout();
						handleShake();
						handleClick(e);
					}}
					className="clickable-object shake-left"
					src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F2%2FOpened-Treasure-Chest-PNG-Free-Image.png&f=1&nofb=1&ipt=9261d953fc8d082a06759b160cd4c1bd83521b27e42ae1382c0bc1829bcf4014&ipo=images"
					alt=""
				/>
			) : (
				<img
					onClick={(e) => {
						handleShake();
						handleClick(e);
					}}
					className="clickable-object shake-right"
					src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F2%2FOpened-Treasure-Chest-PNG-Free-Image.png&f=1&nofb=1&ipt=9261d953fc8d082a06759b160cd4c1bd83521b27e42ae1382c0bc1829bcf4014&ipo=images"
					alt=""
				/>
			)}
		</Box>
	);
}

export default GameWindow;
