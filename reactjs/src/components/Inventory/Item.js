import React, { useState } from "react";
import "./inventory.css";
import itemsData from "../../helpers/items.json";
import { useDispatch, useSelector } from "react-redux";
import { openChestThunk } from "../../utils/thunkCreators";
import { Box } from "@mui/system";
import { Menu, MenuItem } from "@mui/material";

function Item({ item, index }) {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const { logged } = useSelector((state) => state.appStore);

	const currentItem = itemsData.find((obj) => obj.title === item.title);

	const MenuStyles = {
		"& .MuiPaper-root": {
			borderRadius: "5px",
			marginTop: 0,

			gap: "5px",
			backgroundColor: "#621708",
			color: "#F6AA1C",
			boxShadow: "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
			"& .MuiMenu-list": {
				padding: "4px 0",
				display: "flex",
				flexDirection: "row",
			},
			"& .MuiMenuItem-root": {
				fontSize: "0.6rem",
				fontWeight: "bold",
				letterSpacing: "0.6px",
				width: "max-content",
				"& .MuiSvgIcon-root": {
					fontSize: "2rem",
					color: "gray",
					marginRight: 1,
				},
				"&:active": {
					backgroundColor: "transparent",
				},
			},
		},
	};

	const dispatch = useDispatch();

	const handleItemMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box
			className={`${item.rarity === "common" ? "item-common" : item.rarity === "rare" ? "item-rare" : item.rarity === "epic" ? "item-epic" : "item"}`}
			style={{
				width: "67px",
				height: "67px",
				borderRadius: "5px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<img
				id='demo-positioned-button'
				aria-controls={open ? "demo-positioned-menu" : undefined}
				aria-haspopup='true'
				aria-expanded={open ? "true" : undefined}
				style={{
					width: "60px",
				}}
				src={currentItem.img}
				alt=''
				onClick={(e) => {
					if (item.title === "Chest") {
						handleItemMenu(e);
					}
				}}
			/>
			<Menu
				id='demo-positioned-menu'
				aria-labelledby='demo-positioned-button'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
				sx={MenuStyles}
			>
				<MenuItem
					onClick={() => {
						handleClose();
						dispatch(openChestThunk(logged.id, item));
					}}
				>
					Open
				</MenuItem>
				<MenuItem
					onClick={() => {
						handleClose();
						console.log(item);
					}}
				>
					Discard
				</MenuItem>
			</Menu>
		</Box>
	);
}

export default Item;
