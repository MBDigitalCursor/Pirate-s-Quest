const UserSchema = require("../schemas/UserSchema");

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
	if (commonDropRate > commonDropRND) {
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

module.exports = {
	dropChances: async (req, res) => {
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
};
