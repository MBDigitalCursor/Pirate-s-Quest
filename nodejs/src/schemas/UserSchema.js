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
		default: 20000,
	},
	upgrades: {
		type: Array,
		required: false,
		default: [
			{
				upgradeTitle: "dropPerClickLevel",
				level: 1,
				maxLevel: 99999,
				upgradeCost: 20,
				step: 0.1,
				costMultiplier: 1.2,
			},
			{
				upgradeTitle: "critStrikeChanceLevel",
				level: 0,
				maxLevel: 250,
				upgradeCost: 50,
				step: 0.2,
				costMultiplier: 1.2,
			},
			{
				upgradeTitle: "critStrikeMultiplierLevel",
				level: 0,
				maxLevel: 40,
				upgradeCost: 50,
				step: 0.2,
				costMultiplier: 1.4,
			},
			{
				upgradeTitle: "autoIncomeAmountLevel",
				level: 0,
				maxLevel: 99999,
				upgradeCost: 100,
				step: 1,
				costMultiplier: 1.2,
			},
			{
				upgradeTitle: "autoIncomeTimeLevel",
				level: 0,
				maxLevel: 6,
				upgradeCost: 100,
				step: 0.5,
				costMultiplier: 2,
			},
			{
				upgradeTitle: "doubleDropChanceLevel",
				level: 0,
				maxLevel: 99999,
				upgradeCost: 50,
				step: 0.2,
				costMultiplier: 1.4,
			},
			{
				upgradeTitle: "tripleDropChanceLevel",
				level: 0,
				maxLevel: 99999,
				upgradeCost: 50,
				step: 0.1,
				costMultiplier: 1.4,
			},
			{
				upgradeTitle: "commonDropChanceLevel",
				level: 0,
				maxLevel: 25,
				upgradeCost: 200,
				step: 0.2,
				costMultiplier: 1.2,
			},
			{
				upgradeTitle: "rareDropChanceLevel",
				level: 0,
				maxLevel: 25,
				upgradeCost: 400,
				step: 0.2,
				costMultiplier: 1.2,
			},
			{
				upgradeTitle: "epicDropChanceLevel",
				level: 0,
				maxLevel: 25,
				upgradeCost: 800,
				step: 0.2,
				costMultiplier: 1.2,
			},
		],
	},
	rank: {
		type: Object,
		required: false,
		default: {
			rank: "Newbie",
			exp: 990,
		},
	},
	profileImage: {
		type: String,
		required: false,
		default: "https://images-ext-2.discordapp.net/external/4Whw1T9tnEZqQHWAe_r4mjZ21gIjiPpz0azU4f5bPVA/%3Fw%3D2000/https/img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?width=676&height=676",
	},
});

module.exports = mongoose.model("gameUsers", UserSchema);
