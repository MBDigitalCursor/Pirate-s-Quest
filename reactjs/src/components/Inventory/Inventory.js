import { Box, Button, ClickAwayListener, Paper, Slide, Stack } from "@mui/material";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInventoryOpen, setSortedInv } from "../../store/appStore";
import { AiOutlineClose } from "react-icons/ai";
import "../Inventory/inventory.css";
import Item from "./Item";

function Inventory() {
	const { inventoryOpen, logged, sortedInventory } = useSelector((state) => state.appStore);

	const dispatch = useDispatch();

	const closeInventory = () => {
		dispatch(setInventoryOpen(false));
		setTimeout(() => {
			dispatch(setSortedInv(null));
		}, 1000);
	};

	const handleSort = (sortBy) => {
		let inventory = [...logged.inventory];
		if (sortBy === "rarity") {
			inventory.sort((a, b) => {
				const rarityA = a.rarity.toLowerCase();
				const rarityB = b.rarity.toLowerCase();
				if (rarityA === "common") {
					return -1;
				}
				if (rarityB === "common") {
					return 1;
				}
				if (rarityA === "rare") {
					return -1;
				}
				if (rarityB === "rare") {
					return 1;
				}
				return 0;
			});

			return dispatch(setSortedInv(inventory));
		}
		if (sortBy === "category") {
		}
		return inventory;
	};

	return (
		<Box
			sx={{
				position: "absolute",
				right: "0",
				height: 580,
				width: 440,
				display: "flex",
				padding: 2,
				borderRadius: 1,
				bgcolor: (theme) => (theme.palette.mode === "light" ? "transparent" : "transparent"),
				overflow: "hidden",
			}}
		>
			<Box sx={{ width: 200 }}>
				<Slide
					direction='left'
					in={inventoryOpen}
				>
					<Paper
						className='backpack'
						sx={{
							width: 466,
							height: "max-content",
						}}
						elevation={4}
					>
						<AiOutlineClose
							className='close-inv-btn'
							onClick={closeInventory}
							style={{
								position: "absolute",
								left: "5%",
								top: "4%",
								fontSize: "1.5rem",
								opacity: "1",
							}}
						></AiOutlineClose>
						<Box
							sx={{
								padding: "0.3rem 0",
								opacity: "1",
							}}
						>
							<h3
								style={{
									fontSize: "2rem",
									fontWeight: "500",
									color: "#F6AA1C",
									opacity: "1",
								}}
							>
								Inventory
							</h3>
						</Box>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								padding: "0 0.3rem",
							}}
						>
							<p
								style={{
									fontSize: "1rem",
									letterSpacing: "0.7px",
									fontWeight: "500",
								}}
							>
								Sort by:{" "}
							</p>
							<Stack
								direction='row'
								spacing={1}
							>
								<Button onClick={() => handleSort("rarity")}>Rarity</Button>
								<Button>Category</Button>
								<Button>Rarity</Button>
							</Stack>
						</Box>
						<Box
							sx={{
								height: 517,
								padding: "5px",
								boxSizing: "border-box",
							}}
						>
							<Stack
								direction='row'
								justifyContent='flex-start'
								alignItems='flex-start'
								gap={1}
								flexWrap='wrap'
							>
								{sortedInventory === null
									? logged &&
									  logged.inventory.map((item, i) => (
											<Item
												key={i}
												index={i}
												item={item}
											></Item>
									  ))
									: sortedInventory.map((item, i) => (
											<Item
												key={i}
												index={i}
												item={item}
											></Item>
									  ))}
							</Stack>
						</Box>
					</Paper>
				</Slide>
			</Box>
		</Box>
	);
}

export default Inventory;
