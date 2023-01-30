const TestSchema = require("../schemas/TestSchema");
const uid = require("uid-safe");
const bcrypt = require("bcrypt");
const UserSchema = require("../schemas/UserSchema");

module.exports = {
	register: async (req, res) => {
		const { nick, passOne, passTwo } = req.body;
		const id = await uid(5);
		if (nick.lenght <= 3) return res.send({ error: true, message: "Nickname should be at least 3 symbols" });
		if (passOne.lenght <= 3) return res.send({ error: true, message: "Password should be at least 3 symbols" });
		if (passOne.lenght > 10) return res.send({ error: true, message: "Password too long" });
		if (passOne !== passTwo) return res.send({ error: true, message: "Passwords does not match" });
		const userExists = await UserSchema.find({ nick });
		if (userExists) return res.send({ error: true, message: `User with nick ${nick} exists` });
		if (!userExists) {
			if (passOne === passTwo) {
				const hashedPass = await bcrypt.hash(passOne, 2);
				const newUser = new UserSchema({
					nick,
					pass: hashedPass,
				});
				await newUser.save();
				res.send({ error: false, message: "User Created" });
			}
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
};
