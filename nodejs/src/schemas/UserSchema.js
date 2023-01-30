const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
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
			legendaryDropChanceLevel: 0,
		},
	},
});

module.exports = mongoose.model("gameUsers", UserSchema);
