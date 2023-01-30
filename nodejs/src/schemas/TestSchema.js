const mongoose = require("mongoose");

const { Schema } = mongoose;

const TestSchema = new Schema({
	obj: {
		type: Object,
		required: true,
	},
});

module.exports = mongoose.model("test", TestSchema);
