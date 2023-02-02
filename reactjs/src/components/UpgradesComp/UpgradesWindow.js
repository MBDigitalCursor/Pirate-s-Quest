import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import MainContext from "../../context/MainContext";
import { setShowUpgrades } from "../../store/appStore";
import UpgradeCard from "./UpgradeCard";

function UpgradesWindow() {
	const { dispatch, socket } = useContext(MainContext);

	const { logged, showUpgrades } = useSelector((state) => state.appStore);

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		bgcolor: "rgba(255, 255, 255, 0.70)",
		padding: "3rem",
		boxSizing: "border-box",
		boxShadow: "3px 3px 10px 1px #3b3939ad",
		borderRadius: "4px",
		backdropFilter: "blur(4px)",
		width: "25rem",
	};

	return (
		<Modal
			open={showUpgrades}
			onClose={() => dispatch(setShowUpgrades(false))}
		>
			<Box sx={style}>
				<h2>Upgrades</h2>

				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
					}}
				>
					{logged &&
						logged.upgrades.map((singleUpg, i) => (
							<UpgradeCard
								idx={i}
								key={i}
								singleUpg={singleUpg}
							/>
						))}
				</Box>
			</Box>
		</Modal>
	);
}

export default UpgradesWindow;
