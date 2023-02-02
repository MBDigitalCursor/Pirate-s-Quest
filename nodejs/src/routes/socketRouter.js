const UserSchema = require("../schemas/UserSchema");

var db = require("mongodb").MongoClient;
var url = "localhost:5000";

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

module.exports = (io) => {
	io.on("connect", (socket) => {
		socket.on("addGold", async (id) => {
			const foundUser = await UserSchema.findOne({ id });
			const newRank = updateRank(foundUser.rank.exp);

			if (foundUser) {
				await UserSchema.findOneAndUpdate(
					{ id },
					{
						$inc: {
							gold: 1 + foundUser.upgrades[0].level / 10,
							"rank.exp": 1,
						},
						$set: {
							"rank.rank": newRank,
						},
					}
				);
				const updatedUser = await UserSchema.findOne({ id });
				socket.emit("updatedUser", updatedUser);
			}
			// TODO iskelti i atskiras funkcijas
			const allUsers = await UserSchema.find();
			socket.emit("getAllUsers", allUsers);
		});
		socket.on("updateRank", async (id) => {
			const foundUser = await UserSchema.findOne({ id });
			const newRank = updateRank(foundUser.rank.exp);
			if (foundUser) {
				await UserSchema.findOneAndUpdate(
					{ id },
					{
						$set: {
							"rank.rank": newRank,
						},
					}
				);
				const updatedUser = await UserSchema.findOne({ id });
				socket.emit("updatedUser", updatedUser);
			}
		});
		socket.on("checkUser", async (id) => {
			const user = await UserSchema.findOne({ id });
			if (user) {
				socket.emit("checkedUser", user);
			} else {
				socket.emit("checkedUser", null);
			}
		});

		socket.on("upgrade", async (data) => {
			const { userId, upgrade } = data;

			const user = await UserSchema.findOne({ id: userId });

			if (user) {
				const foundUpgIndex = user.upgrades.findIndex((upg) => upg.upgradeTitle === upgrade);
				const upgradeToUpdate = user.upgrades[foundUpgIndex];
				const oldCost = upgradeToUpdate.upgradeCost;
				if (user.gold < oldCost) {
					socket.emit("goldError", "Not enought gold for upgrade");
					return;
				}
				// TODO Prideti kainos apvalinima Math.
				if (upgradeToUpdate.level >= upgradeToUpdate.maxLevel) {
					socket.emit("maxLevel", "You reach max level for this upgrade");
					return;
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
				socket.emit("updatedUser", updatedUser);
			}
		});
	});
};
