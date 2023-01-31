import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../GameWindow/gameWindow.css";
import { useDispatch, useSelector } from "react-redux";
import { setMousePos } from "../../store/appStore";

function GameWindow() {
	const [shakeTo, setShakeTo] = useState("left");

	const { mousePos } = useSelector((state) => state.appStore);

	const dispatch = useDispatch();

	useEffect(() => {
		const handleMouseMove = (event) => {
			dispatch(setMousePos({ x: event.clientX, y: event.clientY }));
		};
		window.addEventListener("click", handleMouseMove);
		return () => {
			window.removeEventListener("click", handleMouseMove);
		};
	}, [mousePos]);

	useEffect(() => {
		console.log("mousePos ===", mousePos);
	}, [mousePos]);

	const handleShake = () => {
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
				<b>Gold:</b> 100
			</p>
			<button
				style={{
					position: "absolute",
					top: "2%",
					left: "5%",
				}}
			>
				Upgrades
			</button>

			{shakeTo === "left" ? (
				<img
					onClick={handleShake}
					className='clickable-object shake-left'
					src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F2%2FOpened-Treasure-Chest-PNG-Free-Image.png&f=1&nofb=1&ipt=9261d953fc8d082a06759b160cd4c1bd83521b27e42ae1382c0bc1829bcf4014&ipo=images'
					alt=''
				/>
			) : (
				<img
					onClick={handleShake}
					className='clickable-object shake-right'
					src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F2%2FOpened-Treasure-Chest-PNG-Free-Image.png&f=1&nofb=1&ipt=9261d953fc8d082a06759b160cd4c1bd83521b27e42ae1382c0bc1829bcf4014&ipo=images'
					alt=''
				/>
			)}
		</Box>
	);
}

export default GameWindow;
