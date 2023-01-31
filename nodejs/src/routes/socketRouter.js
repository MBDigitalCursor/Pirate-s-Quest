const UserSchema = require("../schemas/UserSchema");

const ranks = [
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

// const checkRank = (exp) => {
// 	const ans = ranks.map((rank) => rank.exp < exp);
// 	console.log("exp ===", exp);
// 	console.log("ans ===", ans);
// };

module.exports = (io) => {
	io.on("connect", (socket) => {
		socket.on("addGold", async (id) => {
			const foundUser = await UserSchema.findOne({ id });
			// checkRank(foundUser.rank.exp);
			if (foundUser) {
				await UserSchema.findOneAndUpdate(
					{ id },
					{
						$inc: {
							gold: 1 + foundUser.upgrades.dropPerClickLevel / 10,
							"rank.exp": 1,
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
	});
};
