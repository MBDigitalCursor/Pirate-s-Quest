import React from "react";
import "./inventory.css";
import itemsData from "../../helpers/items.json";

function Item({ item, index }) {
	const currentItem = itemsData.find((obj) => obj.title === item.title);

	return (
		<div
			className={`${item.rarity === "common" ? "item-common" : item.rarity === "rare" ? "item-rare" : item.rarity === "epic" ? "item-epic" : "item"}`}
			style={{
				width: "67px",
				height: "67px",
				borderRadius: "5px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
			onClick={() => {
				if (currentItem.title === "Chest") {
					// Do something TODO
					// console.log(index);
				}
			}}
		>
			<img
				style={{
					width: "60px",
				}}
				src={currentItem.img}
				alt=''
			/>
		</div>
	);
}

export default Item;
