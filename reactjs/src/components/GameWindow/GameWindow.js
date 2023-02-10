import { Box } from "@mui/material";
import React, { useContext } from "react";
import "../GameWindow/gameWindow.css";
import { useSelector } from "react-redux";
import MainContext from "../../context/MainContext";
import { handleChestDropThunk, handleGoldDropThunk } from "../../utils/thunkCreators";

function GameWindow() {
	const { dispatch } = useContext(MainContext);

	const { logged } = useSelector((state) => state.appStore);

	const handleDrop = () => {
		dispatch(handleGoldDropThunk({ id: logged.id }));
		dispatch(handleChestDropThunk({ id: logged.id }));
	};

	return (
		<Box
			sx={{
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
					top: "1%",
					right: "2%",
				}}
			>
				<Box
					style={{
						fontSize: "2rem",
						zIndex: 10,
						fontWeight: "bold",
						color: "#621708",
					}}
				></Box>
			</Box>
			<img
				onClick={handleDrop}
				className='clickable-object'
				src='https://cdn-icons-png.flaticon.com/512/2826/2826202.png'
				alt=''
			/>
		</Box>
	);
}

export default GameWindow;
