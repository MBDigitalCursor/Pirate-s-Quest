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
		type: Array,
		required: false,
		default: [
			{
				upgradeTitle: "dropPerClickLevel",
				level: 1,
				upgradeCost: 20,
			},
			{
				upgradeTitle: "critStrikeMultiplierLevel",
				level: 0,
				upgradeCost: 50,
			},
			{
				upgradeTitle: "critStrikeChanceLevel",
				level: 0,
				upgradeCost: 20,
			},
			{
				upgradeTitle: "autoIncomeAmountLevel",
				level: 0,
				upgradeCost: 100,
			},
			{
				upgradeTitle: "autoIncomeTimeLevel",
				level: 0,
				upgradeCost: 100,
			},
			{
				upgradeTitle: "doubleDropChanceLevel",
				level: 0,
				upgradeCost: 50,
			},
			{
				upgradeTitle: "tripleDropChanceLevel",
				level: 0,
				upgradeCost: 100,
			},
			{
				upgradeTitle: "commonDropChanceLevel",
				level: 0,
				upgradeCost: 100,
			},
			{
				upgradeTitle: "rareDropChanceLevel",
				level: 0,
				upgradeCost: 150,
			},
			{
				upgradeTitle: "epicDropChanceLevel",
				level: 0,
				upgradeCost: 200,
			},
		],
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
