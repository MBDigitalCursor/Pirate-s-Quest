import { Modal, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import MainContext from "../../context/MainContext";
import { setShowLeaderboardTrigger } from "../../store/appStore";

function Leaderboard() {
	const { dispatch } = useContext(MainContext);

	const { showLeaderboardTrigger, allUsers, sortedUsersArray } = useSelector((state) => state.appStore);

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
			open={showLeaderboardTrigger}
			onClose={() => dispatch(setShowLeaderboardTrigger(false))}
		>
			<Box sx={style}>
				<h2>Leaderboard</h2>

				<Box>
					<Stack
						direction="column"
						sx={{
							mt: "0.2rem",
						}}
					>
						{allUsers &&
							sortedUsersArray.map((user, i) => (
								<Stack
									key={i}
									direction="row"
									sx={{
										maxHeight: "35px",
										border: "1px solid slategrey",
										justifyContent: "space-between",
										padding: "0.5rem",
										m: "0.2rem",
									}}
								>
									<p>
										<b>{user.nick}</b>
									</p>
									<p>
										Experience points: <b>{user.exp}</b>
									</p>
								</Stack>
							))}
					</Stack>
				</Box>
			</Box>
		</Modal>
	);
}

export default Leaderboard;
