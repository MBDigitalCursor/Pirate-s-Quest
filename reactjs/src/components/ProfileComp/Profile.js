import { Box, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MainContext from "../../context/MainContext";
import { setLogged } from "../../store/appStore";
import { useNavigate } from "react-router-dom";

function Profile() {
	const { logged } = useSelector((state) => state.appStore);

	const nav = useNavigate();

	const { dispatch, socket } = useContext(MainContext);

	const logOut = () => {
		dispatch(setLogged(null));
		nav("/");
		localStorage.removeItem("user_id");
	};

	return (
		<div>
			{logged && (
				<Box
					sx={{
						position: "absolute",
						width: "20rem",
						height: "5rem",
						padding: "0.5rem",
						boxSizing: "border-box",
						boxShadow: "3px 3px 10px 1px #3b3939ad",
						borderRadius: "4px",
						top: "4rem",
						right: "5.4rem",
						display: "flex",
						justifyContent: "flex-start",
						gap: "1rem",
						backdropFilter: "blur(4px)",
					}}
				>
					<img
						style={{
							borderRadius: "50%",
						}}
						src={logged.profileImage ? logged.profileImage : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"}
						alt='default avatar'
					/>
					<Box
						sx={{
							width: "100%",
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-between",
						}}
					>
						<Typography
							variant='h6'
							component='h6'
							sx={{
								paddingLeft: "0.5rem",
							}}
						>
							{logged.nick}
						</Typography>
						<Box
							sx={{
								width: "100%",
								display: "flex",
								justifyContent: "flex-end",
								alignItems: "center",
							}}
						>
							<Button
								color='gold'
								variant='contained'
								sx={{
									height: "80%",
									marginRight: "0.3rem",
								}}
							>
								Inventory
							</Button>
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
