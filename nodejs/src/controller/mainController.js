const TestSchema = require("../schemas/TestSchema");

module.exports = {
	test: async (req, res) => {
		const { mess } = req.body;
		const obj = new TestSchema({
			mess,
		});
		await obj.save();
		res.send({ error: false, message: "", data: "" });
	},
};
