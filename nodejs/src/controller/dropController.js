const UserSchema = require("../schemas/UserSchema");
const uid = require("uid-safe");

const generateId = async (item) => {
	const uniqueId = await uid(10);
	return {
		itemId: uniqueId,
		...item,
	};
};

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

const calcCommonDropPercent = async (user) => {
	const upgrade = upgradeObj(user, "commonDropChanceLevel");
	const commonDropRND = Math.random() * 100;
	const commonDropRate = upgrade.step * upgrade.level;
	const tripleDrop = calcTripleDropPercent(user);
	const doubleDrop = calcDoubleDropPercent(user);
	const loot = {
		rarity: "common",
		title: "Chest",
	};

	if (commonDropRate > commonDropRND) {
		if (tripleDrop) {
			const drop = [await generateId(loot), await generateId(loot), await generateId(loot)];
			return {
				active: true,
				drop,
			};
		}

		if (doubleDrop) {
			const drop = [await generateId(loot), await generateId(loot)];
			return {
				active: true,
				drop,
			};
		}

		if (!tripleDrop && !doubleDrop) {
			const drop = [await generateId(loot)];
			return {
				active: true,
				drop,
			};
		}
	} else {
		return {
			active: false,
		};
	}
};

const calcRareDropPercent = async (user) => {
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
		if (tripleDrop) {
			const drop = [await generateId(loot), await generateId(loot), await generateId(loot)];
			return {
				active: true,
				drop,
			};
		}

		if (doubleDrop) {
			const drop = [await generateId(loot), await generateId(loot)];
			return {
				active: true,
				drop,
			};
		}

		if (!tripleDrop && !doubleDrop) {
			const drop = [await generateId(loot)];
			return {
				active: true,
				drop,
			};
		}
	} else {
		return {
			active: false,
		};
	}
};

const calcEpicDropPercent = async (user) => {
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
		if (tripleDrop) {
			const drop = [await generateId(loot), await generateId(loot), await generateId(loot)];
			return {
				active: true,
				drop,
			};
		}

		if (doubleDrop) {
			const drop = [await generateId(loot), await generateId(loot)];
			return {
				active: true,
				drop,
			};
		}

		if (!tripleDrop && !doubleDrop) {
			const drop = [await generateId(loot)];
			return {
				active: true,
				drop,
			};
		}
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

const openChests = (rarity, howMuchChests) => {
	let goldAndExpArr = [];
	if (rarity === "common") {
		for (let i = 0; i <= howMuchChests; i++) {
			goldAndExpArr.push(calcGoldAndExpFromChest(10, 50, 5, 20));
		}
	}
	if (rarity === "rare") {
		for (let i = 0; i <= howMuchChests; i++) {
			goldAndExpArr.push(calcGoldAndExpFromChest(50, 150, 15, 40));
		}
	}
	if (rarity === "epic") {
		for (let i = 0; i <= howMuchChests; i++) {
			goldAndExpArr.push(calcGoldAndExpFromChest(150, 300, 30, 70));
		}
	}
	return goldAndExpArr;
};

module.exports = {
	dropChances: async (req, res) => {
		const { id } = req.body;
		const foundUser = await UserSchema.findOne({ id });
		const commonDrop = await calcCommonDropPercent(foundUser);
		const rareDrop = await calcRareDropPercent(foundUser);
		const epicDrop = await calcEpicDropPercent(foundUser);
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
		const user = await UserSchema.findOne({ id });
		if (chest.rarity === "common") {
			const { goldFromChest, expFromChest } = calcGoldAndExpFromChest(10, 50, 5, 20);
			const updatedInv = user.inventory.filter((item) => item.itemId !== chest.itemId);

			await UserSchema.findOneAndUpdate(
				{ id },
				{
					$inc: {
						gold: goldFromChest,
						"rank.exp": expFromChest,
					},
					$set: {
						inventory: updatedInv,
					},
				}
			);
			const updatedUser = await UserSchema.findOne({ id });
			return res.send({ error: false, message: `${goldFromChest} gold and ${expFromChest} exp received from common Chest`, data: updatedUser });
		}
		if (chest.rarity === "rare") {
			const { goldFromChest, expFromChest } = calcGoldAndExpFromChest(50, 150, 15, 40);
			const updatedInv = user.inventory.filter((item) => item.itemId !== chest.itemId);
			await UserSchema.findOneAndUpdate(
				{ id },
				{
					$inc: {
						gold: goldFromChest,
						"rank.exp": expFromChest,
					},
					$set: {
						inventory: updatedInv,
					},
				}
			);
			const updatedUser = await UserSchema.findOne({ id });
			return res.send({ error: false, message: `${goldFromChest} gold and ${expFromChest} exp received from rare Chest`, data: updatedUser });
		}
		if (chest.rarity === "epic") {
			const { goldFromChest, expFromChest } = calcGoldAndExpFromChest(150, 300, 30, 70);
			const updatedInv = user.inventory.filter((item) => item.itemId !== chest.itemId);
			await UserSchema.findOneAndUpdate(
				{ id },
				{
					$inc: {
						gold: goldFromChest,
						"rank.exp": expFromChest,
					},
					$set: {
						inventory: updatedInv,
					},
				}
			);
			const updatedUser = await UserSchema.findOne({ id });
			return res.send({ error: false, message: `${goldFromChest} gold and ${expFromChest} exp received from epic Chest`, data: updatedUser });
		}
	},
	openAllChestsWithSameRarity: async (req, res) => {
		const { id, chestRarity } = req.body;
		const user = await UserSchema.findOne({ id });
		const chests = user.inventory.filter((item) => item.title === "Chest" && item.rarity === chestRarity);
		const newInv = user.inventory.filter((item) => item.title === "Chest" && item.rarity !== chestRarity);
		const goldAndExpArr = openChests(chestRarity, chests.length);
		const goldSumFromOpenedChests = goldAndExpArr.reduce((acc, current) => {
			return acc + current.goldFromChest;
		}, 0);
		const expSumFromOpenedChests = goldAndExpArr.reduce((acc, current) => {
			return acc + current.expFromChest;
		}, 0);

		await UserSchema.findOneAndUpdate(
			{ id },
			{
				$set: {
					inventory: newInv,
				},
				$inc: {
					gold: goldSumFromOpenedChests,
					"rank.exp": expSumFromOpenedChests,
				},
			}
		);
		const updatedUser = await UserSchema.findOne({ id });
		return res.send({ error: false, message: `${goldSumFromOpenedChests} gold and ${expSumFromOpenedChests} exp received from ${chests.length} ${chestRarity} Chests`, data: updatedUser });
	},
};
