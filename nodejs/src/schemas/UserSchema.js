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
		default: 0,
	},
});

module.exports = mongoose.model("gameUsers", UserSchema);
