import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MainContext from "../../context/MainContext";
import { setInventoryOpen, setLogged, setShowLeaderboardTrigger, setShowUpgrades } from "../../store/appStore";
import { useNavigate } from "react-router-dom";

function Profile() {
	const { logged, inventoryOpen } = useSelector((state) => state.appStore);

	const nav = useNavigate();

	const { dispatch } = useContext(MainContext);

	const logOut = () => {
		dispatch(setLogged(null));
		nav("/");
		localStorage.removeItem("user_id");
	};

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			{logged && (
				<Box
					sx={{
						position: "absolute",
						height: "5.5rem",
						width: "19rem",
						padding: "0.5rem",
						boxSizing: "border-box",
						boxShadow: "3px 3px 10px 1px #3b3939ad",
						borderRadius: "4px",
						top: "1%",
						right: "1%",
						display: "flex",
						justifyContent: "flex-start",
						backdropFilter: "blur(4px)",
					}}
				>
					<img
						style={{
							borderRadius: "10px",
							height: "auto",
						}}
						src={logged && logged.profileImage}
						alt='avatar'
					/>
					<Box
						sx={{
							width: "100%",
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-between",
							alignItems: "flex-start",
						}}
					>
						<div
							style={{
								display: "flex",
								alignItems: "flex-start",
								justifyContent: "space-evenly",
								width: "100%",
							}}
						>
							<Typography
								variant='h6'
								component='h6'
								sx={{
									paddingRight: "1rem",
									marginLeft: "1rem",
									fontSize: "1.2rem",
									fontWeight: "bold",
									letterSpacing: "1px",
									color: "#621708",
								}}
							>
								{logged.nick}
							</Typography>
							<p
								style={{
									fontSize: "1.2rem",
									fontWeight: "bold",
								}}
							>
								{logged && logged.gold.toFixed(1)}
								<b> 💰</b>
							</p>
						</div>
						<Box
							sx={{
								width: "100%",
								display: "flex",
								justifyContent: "flex-end",
								alignItems: "center",
							}}
						>
							<div>
								<Button
									color='gold'
									variant='contained'
									sx={{
										height: "70%",
										marginRight: "1rem",
									}}
									aria-controls={open ? "demo-positioned-menu" : undefined}
									aria-haspopup='true'
									aria-expanded={open ? "true" : undefined}
									onClick={handleClick}
								>
									MENU
								</Button>
								<Menu
									id='demo-positioned-menu'
									aria-labelledby='demo-positioned-button'
									anchorEl={anchorEl}
									open={open}
									onClose={handleClose}
									anchorOrigin={{
										vertical: "bottom",
										horizontal: "right",
									}}
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
								>
									<MenuItem
										onClick={() => {
											dispatch(setShowUpgrades(true));
											handleClose();
										}}
									>
										Upgrades
									</MenuItem>
									<MenuItem
										onClick={() => {
											dispatch(setShowLeaderboardTrigger(true));
											handleClose();
										}}
									>
										Leaderboard
									</MenuItem>
									<MenuItem
										onClick={() => {
											handleClose();
											dispatch(setInventoryOpen(!inventoryOpen));
										}}
									>
										Inventory
									</MenuItem>
								</Menu>
							</div>
							<Button
								variant='outlined'
								onClick={logOut}
								sx={{
									height: "60%",
									minWidth: "15%",
									width: "15%",
									padding: "0",
									border: "none",
									"&:hover": {
										border: "none",
										backgroundColor: "transparent",
									},
									"&:active": {
										border: "none",
										backgroundColor: "transparent",
									},
								}}
							>
								<ExitToAppIcon
									sx={{
										fontSize: "2.2rem",
										transition: "0.2s",
										cursor: "pointer",
										"&:hover": {
											color: "#F6AA1C",
											boxShadow: "none",
										},
										"&:active": {
											transform: "scale(0.9)",
											color: "#F6AA1C",
											boxShadow: "none",
										},
									}}
								/>
							</Button>
						</Box>
					</Box>
				</Box>
			)}
		</div>
	);
}

export default Profile;
