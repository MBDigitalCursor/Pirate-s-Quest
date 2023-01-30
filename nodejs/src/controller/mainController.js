const TestSchema = require("../schemas/TestSchema");

module.exports = {
	test: async (req, res) => {
		const obj = req.body;
		const newObj = new TestSchema({
			obj,
		});
		await newObj.save();
		res.send({ error: false, message: "", data: "" });
	},
};
