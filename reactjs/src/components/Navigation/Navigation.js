import { Box, Button } from "@mui/material";
import React from "react";

function Navigation() {
	return (
		<Box
			sx={{
				position: "absolute",
				top: "1%",
				left: "2%",
				width: "max-content",
				display: "flex",
				gap: "0.5rem",
			}}
		>
			<Button variant='outlined'>Shop</Button>
			<Button variant='outlined'>Crafting</Button>
		</Box>
	);
}

export default Navigation;
