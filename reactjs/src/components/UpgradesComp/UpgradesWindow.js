import { Button, Popover, Popper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import MainContext from "../../context/MainContext";

function UpgradesWindow() {
	const { dispatch, socket } = useContext(MainContext);

	const { logged } = useSelector((state) => state.appStore);

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const upgrade = (upgrade) => {
		const data = {
			userId: logged.id,
			upgrade,
		};
		socket.emit("upgrade", data);
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popper" : undefined;

	return (
		<div
			style={{
				height: "600px",
				padding: "10px 5px",
				boxSizing: "border-box",
				boxShadow: "3px 3px 10px 1px #3b3939ad",
				borderRadius: "4px",
				width: "18rem",
				backdropFilter: "blur(4px)",
			}}
		>
			<div>
				<Button
					aria-describedby={id}
					type="button"
					onMouseEnter={handleClick}
					onMouseLeave={() => setAnchorEl(false)}
				>
					Toggle Popper
				</Button>
				<Popper
					id={id}
					open={open}
					anchorEl={anchorEl}
				>
					<Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>The content of the Popper.</Box>
				</Popper>
			</div>

			<h1 onClick={() => upgrade("dropPerClickLevel")}>Upgrades</h1>
		</div>
	);
}

export default UpgradesWindow;
