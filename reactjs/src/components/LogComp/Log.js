import { Box } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "../LogComp/log.css";
import { setShowDrop, setShowLogs } from "../../store/appStore";

function Log() {
	const dispatch = useDispatch();

	const { showLogs, logs } = useSelector((state) => state.appStore);

	const handleLogs = () => {
		dispatch(setShowLogs(!showLogs));
	};

	return (
		<Box className={`logs ${showLogs ? "opened-logs" : "closed-logs"}`}>
			{!showLogs ? (
				<Box onClick={handleLogs}>
					<KeyboardArrowUpIcon className='logs-btn' />
				</Box>
			) : (
				<Box onClick={handleLogs}>
					<KeyboardArrowDownIcon className='logs-btn' />
				</Box>
			)}
			{!showLogs ? (
				""
			) : (
				<Box className='logs-messages'>
					{logs &&
						logs.map((log, i) => (
							<p
								key={i}
								style={{
									color: log.includes("common") ? "#02b90280" : log.includes("rare") ? "#0000ff8c" : log.includes("epic") ? "#b304b380" : log.includes("Critical") ? "red" : "white",
									fontWeight: log.includes("common") ? "bold" : log.includes("rare") ? "bold" : log.includes("epic") ? "bold" : "normal",
								}}
							>
								{log}
							</p>
						))}
				</Box>
			)}
		</Box>
	);
}

export default Log;
