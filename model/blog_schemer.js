const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
	{
		title: { type: String, required: true },
		read: { type: String, required: true },
		image: { type: String },
		content: { type: String, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
