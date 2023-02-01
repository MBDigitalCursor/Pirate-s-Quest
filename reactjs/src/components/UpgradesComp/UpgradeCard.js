import { Button, Popper, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import MainContext from "../../context/MainContext";
import HelpIcon from "@mui/icons-material/Help";
import upgradeData from "../../helpers/upgrades.json";
import "./upgradeCard.css";

function UpgradeCard({ singleUpg, idx }) {
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
		<Box
			sx={{
				maxHeight: "35px",
				border: "1px solid slategrey",
				p: "0.3rem",
				m: "0.2rem",
			}}
		>
			<Stack
				direction="row"
				sx={{
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Stack
					direction="row"
					sx={{
						alignItems: "center",
					}}
				>
					<img
						className="upgrade-logo"
						src={upgradeData[idx].img}
						alt="upgrade logo"
					/>
					<Box className="upgrade-info">
						<h5>
							{upgradeData[idx].title} <span>${singleUpg.upgradeCost.toFixed(0)}</span>
						</h5>
					</Box>
				</Stack>
				<Box>
					<Button
						color="gold"
						variant="contained"
						onClick={() => upgrade(upgradeData[idx].upg)}
						sx={{
							fontSize: "0.8rem",
							fontWeight: "bold",
							padding: "0.2rem",
							marginRight: "0.3rem",
						}}
					>
						upgrade
					</Button>
				</Box>
				<Box>
					<Box
						onMouseEnter={handleClick}
						onMouseLeave={() => setAnchorEl(false)}
						sx={{
							width: "max-content",
							transition: "0.2s",
						}}
					>
						<HelpIcon
							sx={{
								fontSize: "1.2rem",
								transition: "0.3s",
								"&:hover": {
									border: "none",
									color: "#F6AA1C",
								},
							}}
						/>
					</Box>
					<Popper
						id={id}
						open={open}
						anchorEl={anchorEl}
					>
						<Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
							<p>{upgradeData[idx].desc}</p>
							<p>
								Current upgrade level: <b>{singleUpg.level}</b>{" "}
							</p>
							<p>
								Next available upgrade level: <b>{singleUpg.level + 1}</b>{" "}
							</p>
						</Box>
					</Popper>
				</Box>
			</Stack>
		</Box>
	);
}

export default UpgradeCard;
