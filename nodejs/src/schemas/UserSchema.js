const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
	id: {
		type: String,
		required: false,
	},
	nick: {
		type: String,
		required: true,
	},
	pass: {
		type: String,
		required: true,
	},
	gold: {
		type: Number,
		required: false,
		default: 100,
	},
	upgrades: {
		type: Object,
		required: false,
		default: {
			dropPerClickLevel: 1,
			critStrikeMultiplierLevel: 1,
			critStrikeChanceLevel: 1,
			delayPerClickLevel: 1,
			autoIncomeQuantityLevel: 0,
			autoIncomeTimeLevel: 1,
			doubleDropChanceLevel: 0,
			commonDropChanceLevel: 0,
			rareDropChanceLevel: 0,
			epicDropChanceLevel: 0,
		},
	},
	rank: {
		type: Object,
		required: false,
		default: {
			rank: "Newbie",
			exp: 0,
		},
	},
	profileImage: {
		type: String,
		required: false,
		default: "https://images-ext-2.discordapp.net/external/4Whw1T9tnEZqQHWAe_r4mjZ21gIjiPpz0azU4f5bPVA/%3Fw%3D2000/https/img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?width=676&height=676",
	},
});

module.exports = mongoose.model("gameUsers", UserSchema);
