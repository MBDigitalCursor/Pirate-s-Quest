const uid = require("uid-safe");
const bcrypt = require("bcrypt");
const UserSchema = require("../schemas/UserSchema");

const ranks = [
	{
		title: "Newbie",
		exp: 0,
	},
	{
		title: "Cooper",
		exp: 1000,
	},
	{
		title: "Striker",
		exp: 5000,
	},
	{
		title: "Gunner",
		exp: 12000,
	},
	{
		title: "Navigator",
		exp: 20000,
	},
	{
		title: "Captain",
		exp: 35000,
	},
	{
		title: "Jack Sparrow",
		exp: 50000,
	},
];

function updateRank(currentExp) {
	let title;

	switch (true) {
		case currentExp < ranks[0].exp:
			title = "Newbie";
			break;
		case currentExp >= ranks[0].exp && currentExp < ranks[1].exp:
			title = ranks[0].title;
			break;
		case currentExp >= ranks[1].exp && currentExp < ranks[2].exp:
			title = ranks[1].title;
			break;
		case currentExp >= ranks[2].exp && currentExp < ranks[3].exp:
			title = ranks[2].title;
			break;
		case currentExp >= ranks[3].exp && currentExp < ranks[4].exp:
			title = ranks[3].title;
			break;
		case currentExp >= ranks[4].exp && currentExp < ranks[5].exp:
			title = ranks[4].title;
			break;
		case currentExp >= ranks[5].exp:
			title = ranks[5].title;
			break;
		default:
			title = "Newbie";
			break;
	}

	return title;
}

const randomNumber = () => Math.random() * 100;

const upgradeObj = (user, upgTitle) => {
	const foundUpgrade = user.upgrades.find((upg) => upg.upgradeTitle === upgTitle);
	return foundUpgrade;
};

const calcCritPercent = (user) => {
	const critChanceUpgrade = upgradeObj(user, "critStrikeChanceLevel");
	const critMultiplierUpgrade = upgradeObj(user, "critStrikeMultiplierLevel");
	const goldDropUpgrade = upgradeObj(user, "dropPerClickLevel");

	const rnd = randomNumber();
	const critChance = critChanceUpgrade.step * critChanceUpgrade.level;
	const critMultiplier = 2 + critMultiplierUpgrade.step * critMultiplierUpgrade.level;
	if (critChance > rnd) {
		const goldPerClick = 1 + goldDropUpgrade.level * goldDropUpgrade.step;
		const goldAmount = goldPerClick * critMultiplier;
		return {
			active: true,
			goldAmount,
		};
	} else {
		return {
			active: false,
			goldAmount: 0,
		};
	}
};

module.exports = {
	register: async (req, res) => {
		const { nick, passOne, passTwo } = req.body;
		const id = await uid(5);
		if (nick.lenght <= 3) return res.send({ error: true, message: "Nickname should be at least 3 symbols" });
		if (passOne.lenght <= 3) return res.send({ error: true, message: "Password should be at least 3 symbols" });
		if (passOne.lenght > 10) return res.send({ error: true, message: "Password too long" });
		if (passOne !== passTwo) return res.send({ error: true, message: "Passwords does not match" });
		const userExists = await UserSchema.findOne({ nick });
		if (!userExists) {
			if (passOne === passTwo) {
				const hashedPass = await bcrypt.hash(passOne, 2);
				const newUser = new UserSchema({
					id,
					nick,
					pass: hashedPass,
				});
				await newUser.save();
				return res.send({ error: false, message: "User Created" });
			}
		} else {
			return res.send({ error: true, message: "User already exists" });
		}
	},
	login: async (req, res) => {
		const { nick, pass } = req.body;
		const user = await UserSchema.findOne({ nick });
		if (!user) return res.send({ error: true, message: "User does not exist, register first" });
		if (user) {
			const isPasswordCorrect = await bcrypt.compare(pass, user.pass);
			if (!isPasswordCorrect) return res.send({ error: true, message: "Bad Credentials" });
			if (isPasswordCorrect) return res.send({ error: false, message: "Logged in", data: user });
		}
	},
	allUsers: async (req, res) => {
		const allUsers = await UserSchema.find();
		return res.send({ error: false, message: "All users received", data: allUsers });
	},
	addGold: async (req, res) => {
		const { id } = req.body;
		const foundUser = await UserSchema.findOne({ id });
		const newRank = updateRank(foundUser.rank.exp);
		const goldDropUpgrade = upgradeObj(foundUser, "dropPerClickLevel");
		const critMultiplierUpgrade = upgradeObj(foundUser, "critStrikeMultiplierLevel");
		const crit = calcCritPercent(foundUser);

		if (foundUser) {
			if (crit.active) {
				await UserSchema.findOneAndUpdate(
					{ id },
					{
						$inc: {
							gold: crit.goldAmount,
							"rank.exp": 2 + critMultiplierUpgrade.step * critMultiplierUpgrade.level,
						},
						$set: {
							"rank.rank": newRank,
						},
					}
				);
				const updatedUser = await UserSchema.findOne({ id });
				return res.send({
					error: false,
					message: `Critical strike! You got ${crit.goldAmount.toFixed(1)} gold`,
					data: updatedUser,
				});
			} else {
				const goldDropped = 1 + goldDropUpgrade.level / 10;
				await UserSchema.findOneAndUpdate(
					{ id },
					{
						$inc: {
							gold: goldDropped,
							"rank.exp": 1,
						},
						$set: {
							"rank.rank": newRank,
						},
					}
				);
				const updatedUser = await UserSchema.findOne({ id });
				return res.send({
					error: false,
					message: `You got ${goldDropped.toFixed(1)} gold`,
					data: updatedUser,
				});
			}
		}
	},
	upgrade: async (req, res) => {
		const { userId, upgrade } = req.body;
		const user = await UserSchema.findOne({ id: userId });
		if (user) {
			const foundUpgIndex = user.upgrades.findIndex((upg) => upg.upgradeTitle === upgrade);
			const upgradeToUpdate = user.upgrades[foundUpgIndex];
			const oldCost = upgradeToUpdate.upgradeCost;
			if (user.gold < oldCost) {
				return res.send({ error: true, message: "Not enought gold for upgrade", data: null });
			}
			// TODO Prideti kainos apvalinima Math.
			if (upgradeToUpdate.level >= upgradeToUpdate.maxLevel) {
				return res.send({ error: true, message: "You reach max level for this upgrade", data: null });
			}
			upgradeToUpdate.level += 1;
			upgradeToUpdate.upgradeCost = upgradeToUpdate.upgradeCost * upgradeToUpdate.costMultiplier;
			await UserSchema.findOneAndUpdate(
				{ id: userId },
				{
					$set: {
						gold: user.gold - oldCost,
						upgrades: user.upgrades,
					},
				}
			);
			const updatedUser = await UserSchema.findOne({ id: userId });
			return res.send({ error: false, message: "Upgrade level up", data: updatedUser });
		}
	},
	userLogged: async (req, res) => {
		const { id } = req.body;
		const user = await UserSchema.findOne({ id });

		if (user) {
			return res.send({ error: false, message: "User logged in", data: user });
		} else {
			return res.send({ error: true, message: "User not logged", data: null });
		}
	},
};
