const UserSchema = require("../schemas/UserSchema");
const uid = require("uid-safe");

const upgradeObj = (user, upgTitle) => {
	const foundUpgrade = user.upgrades.find((upg) => upg.upgradeTitle === upgTitle);
	return foundUpgrade;
};
const calcDoubleDropPercent = (user) => {
	const upgrade = upgradeObj(user, "doubleDropChanceLevel");

	const doubleDropRND = Math.random() * 100;
	const doubleDropChance = upgrade.step * upgrade.level;
	if (doubleDropChance > doubleDropRND) {
		return true;
	} else {
		return false;
	}
};
const calcTripleDropPercent = (user) => {
	const upgrade = upgradeObj(user, "tripleDropChanceLevel");

	const tripleDropRND = Math.random() * 100;
	const tripleDropChance = upgrade.step * upgrade.level;
	if (tripleDropChance > tripleDropRND) {
		return true;
	} else {
		return false;
	}
};

const calcCommonDropPercent = (user) => {
	const upgrade = upgradeObj(user, "commonDropChanceLevel");
	const commonDropRND = Math.random() * 100;
	const commonDropRate = upgrade.step * upgrade.level;
	const tripleDrop = calcTripleDropPercent(user);
	const doubleDrop = calcDoubleDropPercent(user);
	const loot = {
		rarity: "common",
		title: "Chest",
	};

	if (40 > commonDropRND) {
		if (tripleDrop)
			return {
				active: true,
				drop: [loot, loot, loot],
			};
		if (doubleDrop)
			return {
				active: true,
				drop: [loot, loot],
			};
		if (!tripleDrop && !doubleDrop)
			return {
				active: true,
				drop: [loot],
			};
	} else {
		return {
			active: false,
		};
	}
};

const calcRareDropPercent = (user) => {
	const upgrade = upgradeObj(user, "rareDropChanceLevel");

	const tripleDrop = calcTripleDropPercent(user);
	const doubleDrop = calcDoubleDropPercent(user);
	const rareDropRND = Math.random() * 100;
	const rareDropRate = upgrade.step * upgrade.level;
	const loot = {
		rarity: "rare",
		title: "Chest",
	};
	if (rareDropRate > rareDropRND) {
		if (tripleDrop)
			return {
				active: true,
				drop: [loot, loot, loot],
			};
		if (doubleDrop)
			return {
				active: true,
				drop: [loot, loot],
			};
		if (!tripleDrop && !doubleDrop)
			return {
				active: true,
				drop: [loot],
			};
	} else {
		return {
			active: false,
		};
	}
};

const calcEpicDropPercent = (user) => {
	const upgrade = upgradeObj(user, "epicDropChanceLevel");

	const tripleDrop = calcTripleDropPercent(user);
	const doubleDrop = calcDoubleDropPercent(user);
	const epicDropRND = Math.random() * 100;
	const epicDropRate = upgrade.step * upgrade.level;
	const loot = {
		rarity: "epic",
		title: "Chest",
	};
	if (epicDropRate > epicDropRND) {
		if (tripleDrop)
			return {
				active: true,
				drop: [loot, loot, loot],
			};
		if (doubleDrop)
			return {
				active: true,
				drop: [loot, loot],
			};
		if (!tripleDrop && !doubleDrop)
			return {
				active: true,
				drop: [loot],
			};
	} else {
		return {
			active: false,
		};
	}
};

const calcGoldAndExpFromChest = (minG, maxG, minE, maxE) => {
	const randomGoldAmount = Math.floor(Math.random() * (maxG - minG + 1) + minG);
	const randomExpAmount = Math.floor(Math.random() * (maxE - minE + 1) + minE);
	return {
		goldFromChest: randomGoldAmount,
		expFromChest: randomExpAmount,
	};
};

module.exports = {
	dropChances: async (req, res) => {
		// TODO Pridet ID prie kiekvieno itemo
		const { id } = req.body;
		const foundUser = await UserSchema.findOne({ id });
		const commonDrop = calcCommonDropPercent(foundUser);
		const rareDrop = calcRareDropPercent(foundUser);
		const epicDrop = calcEpicDropPercent(foundUser);

		if (epicDrop.active) {
			await UserSchema.findOneAndUpdate(
				{ id },
				{
					$push: {
						inventory: {
							$each: epicDrop.drop,
						},
					},
				}
			);
			return res.send({ loot: epicDrop.drop });
		}
		if (rareDrop.active) {
			await UserSchema.findOneAndUpdate(
				{ id },
				{
					$push: {
						inventory: {
							$each: rareDrop.drop,
						},
					},
				}
			);
			return res.send({ loot: rareDrop.drop });
		}
		if (commonDrop.active) {
			await UserSchema.findOneAndUpdate(
				{ id },
				{
					$push: {
						inventory: {
							$each: commonDrop.drop,
						},
					},
				}
			);
			return res.send({ loot: commonDrop.drop });
		}

		return res.send({ loot: null });
	},
	chestOpen: async (req, res) => {
		const { id, chest } = req.body;
		console.log("chest ===", chest);
		const user = await UserSchema.findOne({ id });
		if (chest.rarity === "common") {
			const { goldFromChest, expFromChest } = calcGoldAndExpFromChest(10, 50, 5, 20);
			const chestIndex = user.inventory.findIndex((item) => item.title === chest.title && item.rarity === chest.rarity);
			// TODO Pabaigt logika
			console.log("chestIndex ===", chestIndex);
			await UserSchema.findOneAndUpdate(
				{ id },
				{
					$inc: {
						gold: goldFromChest,
						"rank.exp": expFromChest,
					},
					// $pull: {
					// 	inventory: { rarity: chest.rarity, title: chest.title },
					// },
				}
			);
			const updatedUser = await UserSchema.findOne({ id });
			return res.send({ error: false, message: `${goldFromChest} gold and ${expFromChest} exp received`, data: updatedUser });
		}
		if (chest.rarity === "rare") {
			const { goldFromChest, expFromChest } = calcGoldAndExpFromChest(50, 150, 15, 40);
			const chestIndex = user.inventory.findIndex((item) => item.title === chest.title && item.rarity === chest.rarity);
			console.log("chestIndex ===", chestIndex);
			console.log("Old Inv ===", user.inventory);
			const newInv = user.inventory.splice(chestIndex, 1);
			console.log("new Inv ===", newInv);
			await UserSchema.findOneAndUpdate(
				{ id },
				{
					$inc: {
						gold: goldFromChest,
						"rank.exp": expFromChest,
					},
					// $pull: {
					// 	inventory: { rarity: chest.rarity, title: chest.title },
					// },
				}
			);
			const updatedUser = await UserSchema.findOne({ id });
			return res.send({ error: false, message: `Rare chest opened, ${goldFromChest} gold and ${expFromChest} exp received` });
		}
		if (chest.rarity === "epic") {
			const { goldFromChest, expFromChest } = calcGoldAndExpFromChest(150, 300, 30, 70);
			return res.send({ error: false, message: `Epic chest opened, ${goldFromChest} gold and ${expFromChest} exp received` });
		}
	},
};
