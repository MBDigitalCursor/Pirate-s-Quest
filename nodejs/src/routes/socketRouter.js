const UserSchema = require("../schemas/UserSchema");

module.exports = (io) => {
	io.on("connect", (socket) => {
		socket.on("addGold", async (id) => {
			const foundUser = await UserSchema.findOne({ id });
			if (foundUser) {
				await UserSchema.findOneAndUpdate(
					{ id },
					{
						$inc: {
							gold: 1 + foundUser.upgrades.dropPerClickLevel / 10,
						},
					}
				);
				const updatedUser = await UserSchema.findOne({ id });
				console.log("updatedUser ===", updatedUser);
				socket.emit("updatedUser", updatedUser);
			}
		});
	});
};
